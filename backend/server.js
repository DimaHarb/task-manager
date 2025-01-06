const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const logRoutes = require('./routes/logRoutes');
const tagRoutes = require('./routes/tagRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/tags', tagRoutes);


sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});
