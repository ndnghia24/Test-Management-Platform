const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.cookies.refreshToken;
  // IF NO TOKEN, RETURN 401
  if (!token) {
    return res.status(401).json("You're not authenticated");
  }
  // REFRESING TOKEN
  if (token) {
    const refreshToken = token;
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndManager = (req, res, next) => {
  verifyToken(req, res, () => {
    const project_id = req.params.id;
    const token = req.headers.token;

    // decode the token and get projects from it
    const accessToken = token.split(" ")[1];
    const userJSON = jwt.decode(accessToken);
    const userProjects = userJSON.projects;
    const project = userProjects.find((project) => project.project_id === parseInt(project_id));

    if (project && project.role === 1) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndDeveloper = (req, res, next) => {
  verifyToken(req, res, () => {
    const project_id = req.params.id;
    const token = req.headers.token;

    // decode the token and get projects from it
    const accessToken = token.split(" ")[1];
    const userJSON = jwt.decode(accessToken);
    const userProjects = userJSON.projects;
    const project = userProjects.find((project) => project.project_id === parseInt(project_id));

    if (project && project.role === 2) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndTester = (req, res, next) => {
  verifyToken(req, res, () => {
    const project_id = req.params.id;
    const token = req.headers.token;

    // decode the token and get projects from it
    const accessToken = token.split(" ")[1];
    const userJSON = jwt.decode(accessToken);
    const userProjects = userJSON.projects;
    const project = userProjects.find((project) => project.project_id === parseInt(project_id));

    if (project && project.role === 3) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndManager,
  verifyTokenAndDeveloper,
  verifyTokenAndTester,
};