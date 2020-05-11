const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const controller = require("../controllers/user.contoller");

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

  // router.get("/api/test/all", controller.allAccess);

  // router.get("/all/:categoryId", controller.findAllTutors);

  // router.get("/user", [authJwt.verifyToken], controller.getUsers);

  // router.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isTutor],
  //   controller.moderatorBoard
  // );

  // router.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.getUsers
  // );
// };

module.exports = router;