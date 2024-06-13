const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
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
    const userProjects = req.user.projects;
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
    const userProjects = req.user.projects;
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
    const userProjects = req.user.projects;
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