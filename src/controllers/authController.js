const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../models/index');

let refreshTokens = [];

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Get user info from request body
      const name = req.body.name;
      const email = req.body.email;
      const password = hashed;
   
      //Save user to DB
      const user = await db.users.create({
        name: name,
        email: email,
        password: password,
      }, { transaction: t });

      await t.commit();
      res.status(200).json(user);
    } catch (err) {
      await t.rollback();
      console.error("Error registering user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
        console.log("Current refresh tokens: ", refreshTokens);
        // Find user in DB with sequelize
        const user = await db.users.findOne({
            where: {
                email: req.body.email,
            },
        });

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
            secure: false, // Use true in production with HTTPS
            path: "/",
            sameSite: "strict",
        });

        const { password, ...others } = user.dataValues;
        return res.status(200).json({ ...others, accessToken, refreshToken });
    } catch (err) {
        console.error("Error logging in user:", err); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.status(200).json("Logged out successfully!");
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
      role: role.role_id
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

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      // print current refresh token for debugging
      console.log("Current refresh token: ", refreshToken);
      // print out the refreshTokens array for debugging
      console.log("Current refresh tokens: ", refreshTokens);
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },
};

module.exports = authController;
