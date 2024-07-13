const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models/index');

let refreshTokens = [];

const authController = {
  refreshingTokens: async (req, res, next) => {
    // Get refresh token from client cookie
    const refreshToken = req.cookies.refreshToken;
    console.log("Client refreshToken: ", refreshToken);
    console.log("Current refresh tokens: ", refreshTokens);
    
    // Send error if refresh token is not valid (not exist in server storage)
    if (!refreshToken) {
      req.isAuthenticated = false;
      return next();
    }

    try {
      if (!refreshTokens.includes(refreshToken)) {
        req.isAuthenticated = false;
        return next();
      }

      // Refresh access token
      const { newAccessToken, newRefreshToken } = await authController.requestRefreshToken(req);

      // Update refresh token in client cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true, // Use true in production with HTTPS
      });

      // Put access token in request header
      req.isAuthenticated = true;
      req.headers.token = "Bearer " + newAccessToken;
      next();
    } catch (err) {
      console.error(err);
      req.isAuthenticated = false;
      next();
    }
  },

  requestRefreshToken: async (req) => {
    return new Promise(async (resolve, reject) => {  // Thêm async ở đây
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return reject({ status: 401, message: "You're not authenticated" });
      }
      
      if (!refreshTokens.includes(refreshToken)) {
        console.log("Current refresh token: ", refreshToken);
        console.log("Current refresh tokens: ", refreshTokens);
        return reject({ status: 403, message: "Refresh token is not valid" });
      }
      
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {  // Thêm async ở đây
        if (err) {
          console.log(err);
          return reject({ status: 403, message: "Token verification failed" });
        }
        
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        
        const newAccessToken = await authController.generateAccessToken(user);  // Thêm await ở đây
        const newRefreshToken = authController.generateRefreshToken(user);
        
        refreshTokens.push(newRefreshToken);
        
        resolve({ newAccessToken, newRefreshToken });
      });
    });
  },

  generateAccessToken: async (user) => {
    // Get user role of each project
    const userRoles = await db.user_in_project.findAll({
      where: {
        user_id: user.user_id,
      },
      raw: true
    });

    const projects = userRoles.map(role => ({
      project_id: role.project_id,
      role_id: role.role_id
    }));

    return jwt.sign(
      {
        user_id: user.user_id,
        username: user.email,
        projects: projects,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        user_id: user.user_id,
        username: user.email,
        name: user.name,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" }
    );
  },

  registerUser: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      // Get user info from request body
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      // Kiểm tra định dạng input
      // Name không quá 100 ký tự
      // Email phải có định dạng email
      // Password phải có ít nhất 6 ký tự
      if (name.length > 100) {
        await t.rollback();
        return res.status(400).json({ message: "Name is too long" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          await t.rollback();
          return res.status(400).json({ message: "Invalid email" });
      }

      if (password.length < 6) {
        await t.rollback();
        return res.status(400).json({ message: "Password is too short" });
      }
      
      // Check if the email already exists
      const [existingUser] = await db.sequelize.query(
        'SELECT * FROM users WHERE email = ?',
        { replacements: [email], type: db.sequelize.QueryTypes.SELECT }
      );
      
      if (existingUser) {
        await t.rollback();
        return res.status(404).json({ message: "Email already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save user to DB
      const user = await db.users.create({
        name: name,
        email: email,
        password: hashedPassword
      }, { transaction: t });

      await t.commit();
      res.status(200).json(user);
    } catch (err) {
      await t.rollback();
      console.error("Error registering user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      console.log("Current refresh tokens: ", refreshTokens);

      // Find user in DB with sequelize
      const [user] = await db.sequelize.query(
        'SELECT * FROM users WHERE email = ?',
        { replacements: [req.body.email], type: db.sequelize.QueryTypes.SELECT }
      );      

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "Incorrect username or password" });
      }

      // Check if password is correct
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json({ message: "Incorrect username or password" });
      }

      // Generate access token
      const accessToken = await authController.generateAccessToken(user);
      // Generate refresh token
      const refreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      // STORE REFRESH TOKEN IN COOKIE
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, // Use true in production with HTTPS
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = user;
      return res.status(200).json({ ...others, accessToken, refreshToken });
    } catch (err) {
      console.error("Error logging in user:", err); // Log the error for debugging
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getUserInfo: async (req, res) => {
      // Lấy refreshToken từ cookie của client
      const refreshToken = req.cookies.refreshToken;
  
      if (!refreshToken) {
          return res.status(401).json({ message: "You're not authenticated" });
      }
  
      try {
          const decoded = jwt.decode(refreshToken);
          if (!decoded) {
              return res.status(401).json({ message: "Invalid refresh token" });
          }
          const name = decoded.name;
          const user_id = decoded.user_id;
          const email = decoded.email;
          return res.status(200).json({ name: name, user_id: user_id , email: email });
      } catch (error) {
          console.error("Error decoding refresh token:", error);
          return res.status(500).json({ message: "Internal server error" });
      }
  },
  
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    const refreshToken = req.cookies.refreshToken;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;