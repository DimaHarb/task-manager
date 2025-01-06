const Task = require("../models/Task");
const Tag = require("../models/Tag"); 
const Log = require("../models/Log");
const { Op } = require("sequelize"); 


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: Tag,
          as: "tagDetails",
          attributes: ["name", "color"], 
        },
      ],
      order: [["column", "ASC"], ["order", "ASC"]],
    });

  
    const tasksWithTagColors = tasks.map((task) => ({
      ...task.toJSON(),
      tagColor: task.tagDetails?.color, 
    }));

    res.status(200).json(tasksWithTagColors);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, column, tag } = req.body;

    
    const selectedTag = await Tag.findOne({ where: { name: tag } });
    if (!selectedTag) {
      return res.status(400).json({ error: "Tag not found" });
    }

    
    const maxOrderTask = await Task.findOne({
      where: { column },
      order: [["order", "DESC"]],
    });

    const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;

    const task = await Task.create({
      title,
      description,
      column,
      tag,
      order: newOrder,
    });

    console.log("Task created and returned to frontend:", task);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ error: error.message });
  }
};



exports.updateTask = async (req, res) => {
  const transaction = await Task.sequelize.transaction(); 
  try {
    const { column, order } = req.body;
    const taskId = req.params.id;

    const task = await Task.findByPk(taskId, { transaction });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const previousColumn = task.column;
    const previousOrder = task.order;

    let logMessage = "";

    if (column !== undefined && column !== previousColumn) {
      
      await Task.update(
        { order: Task.sequelize.literal('"order" - 1') },
        {
          where: { column: previousColumn, order: { [Op.gt]: previousOrder } },
          transaction,
        }
      );

      
      await Task.update(
        { order: Task.sequelize.literal('"order" + 1') },
        {
          where: { column, order: { [Op.gte]: order } },
          transaction,
        }
      );

      
      task.column = column;
      task.order = order;

      logMessage = `Task "${task.title}" was moved to column "${column}"`;
    } else if (order !== undefined && order !== previousOrder) {
      if (order > previousOrder) {
        await Task.update(
          { order: Task.sequelize.literal('"order" - 1') },
          {
            where: { column: task.column, order: { [Op.between]: [previousOrder + 1, order] } },
            transaction,
          }
        );

        logMessage = `Task "${task.title}" was moved down within the column "${task.column}"`;
      } else {
        await Task.update(
          { order: Task.sequelize.literal('"order" + 1') },
          {
            where: { column: task.column, order: { [Op.between]: [order, previousOrder - 1] } },
            transaction,
          }
        );

        logMessage = `Task "${task.title}" was moved up within the column "${task.column}"`;
      }

      task.order = order;
    }

    await task.save({ transaction });

    if (logMessage) {
      await Log.create({ message: logMessage, date: new Date() }, { transaction });
    }

    await transaction.commit();
    res.json(task);
  } catch (error) {
    await transaction.rollback(); 
    console.error("Error updating task:", error.message);
    res.status(500).json({ error: error.message });
  }
};
