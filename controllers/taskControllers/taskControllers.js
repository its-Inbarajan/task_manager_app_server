const TASK_MODEL = require("../../models/taskModels/taskModels");

const createTask = async (req, res) => {
  try {
    const result = await TASK_MODEL.create(req.body);

    if (!result) {
      return res.status(404).json({
        message: "Something went wrong, please try again later!",
        statusCode: 404,
        success: false,
      });
    }

    res.status(201).json({
      message: "Task created successfully!",
      statusCode: 201,
      success: true,
      responses: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
  }
};

const getTask = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  let query = {};
  try {
    const pageNumber = parseInt(String(page), 10);
    const pagelimit = parseInt(String(limit), 10);
    const skip = (pageNumber - 1) * pagelimit;

    if (search) {
      query.$or = [
        { task_title: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const result = await TASK_MODEL.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const count = await TASK_MODEL.countDocuments(query);

    res.status(200).json({
      message: "Fetching task successfully",
      statusCode: 200,
      success: true,
      responses: result,
      pagination: {
        totalcount: count,
        page: pageNumber,
        limit: pagelimit,
        totalPages: Math.ceil(count / pagelimit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
  }
};

const getByIdTask = async (req, res) => {
  try {
    const { id } = req.params;

    const findByid = await TASK_MODEL.findById(id);

    if (!findByid) {
      return res.status(404).json({
        message: "Data is not found!",
        statusCode: 404,
        success: false,
      });
    }

    res.status(200).json({
      message: "Fetching by id is success!",
      statusCode: 200,
      success: 200,
      responses: findByid,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
  }
};

const deleteByIdTask = async (req, res) => {
  try {
    const { id } = req.params;

    const findByidDel = await TASK_MODEL.findByIdAndDelete(id);

    if (!findByidDel) {
      return res.status(404).json({
        message: "Data is not found!",
        statusCode: 404,
        success: false,
      });
    }

    res.status(200).json({
      message: "Task deleted successfully!",
      statusCode: 200,
      success: 200,
      responses: findByidDel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
  }
};

const updateByIdTask = async (req, res) => {
  try {
    const { id } = req.params;

    const find = await TASK_MODEL.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!find) {
      return res.status(404).json({
        message: "Data is not updated!",
        statusCode: 404,
        success: false,
      });
    }

    res.status(200).json({
      message: "Task deleted successfully!",
      statusCode: 200,
      success: 200,
      responses: find,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createTask,
  getTask,
  getByIdTask,
  deleteByIdTask,
  updateByIdTask,
};
