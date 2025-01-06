const Log = require('../models/Log');

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({ order: [['date', 'DESC']] });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    res.status(500).json({ error: error.message });
  }
};
