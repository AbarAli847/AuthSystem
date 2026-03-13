const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const taskRoutes= require('./routes/task.routes')
const errorHandler = require('./middleware/error.middleware')

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('API Running ');
});

module.exports = app;