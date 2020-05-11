const jwt = require('jsonwebtoken'); 
const User = require('../models/user.model');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, "some_secret", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };

  isAdmin = async(req, res, next) => {
    try{
      const token = req.body.token
      user = await User.findOne({accessToken: token})
          if(user !== 'admin'){
              return res.status(401).json({
                  error: "only admin has access to this route"
              })
          }
          next();
        }catch(err){
          next(err)
        }
        }
 isTutor = async (req, res, next) => {
  try{
    const token = req.body.token
  user = await User.findOne({accessToken: token})
    if(user != 'tutor'){
      return res.status(401).send({
        date: false, 
        message: "only tutors can access this route"
      })
    }
    next();
}catch(err){
  next(err)
}
}
isUser = async (req, res, next) => {
try{
  const token = req.body.token
user = await User.findOne({accessToken: token})
  if(!user){
    return res.status(401).send({
      date: false, 
      message: "Only users of the app can acess this route"
    })

  }
  next();
}catch(err){
next(err)
}
}

// const auth = async(req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '')
//     const data = jwt.verify(token, 'some_secret')
//     try {
//         const user = await User.findOne({ _id: data._id, 'tokens.token': token })
//         if (!user) {
//             throw new Error()
//         }
//         req.user = user
//         req.token = token
//         next()
//     } catch (error) {
//         res.status(401).send({ error: 'Not authorized to access this resource' })
//     }}
const authJwt = {
    verifyToken,
    isAdmin,
    isTutor,
    isUser
};
  module.exports = authJwt;
