const express = require("express");

const router = express.Router();

const Task = require("../models/task.model");

router.post("/", async (req, res) => {
  try {
    const obj = { ...req.body, user_id: req.user._id };
    // console.log(obj);
    const task = await Task.create(obj);
    return res.status(201).send({ message: "task created successfully", task });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id });
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send({ message: "task successfully updated", task });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    return res.status(202).send({ message: "task deleted successfully", task });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
