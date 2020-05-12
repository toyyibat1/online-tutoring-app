const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const dbConfig = require("./config/db.config");
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const subjectRoutes = require('./routes/subject.routes');
const categoryRoutes = require('./routes/admin.routes');
const lessonRoutes = require('./routes/lesson.routes');
const tutorRoutes = require('./routes/tutor.routes');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', subjectRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', lessonRoutes);
app.use('/api/v1', tutorRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to tutoring application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

mongoose
  .connect("mongodb+srv://tutoringapp:1Toyyibat@cluster0-fd7rl.mongodb.net/test?retryWrites=true&w=majority",
    {useNewUrlParser: true,
    useUnifiedTopology: true}
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

module.exports = app;