const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Adjust the path as needed
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require("cors");
const timeout = 5000;

const app = express();
const PORT = process.env.PORT ||3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//test route
app.get('/', (req, res, next) => {
  res.send('Fladinand Alfando');
});

// Routes
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
sequelize.sync({ force: false }) // Set force to true if you want to drop and recreate tables on every restart
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });