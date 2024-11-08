const { Router } = require("express");
const userRouter = Router();
const { User, Show } = require("../models/index");
const { check, validationResult } = require("express-validator");

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

userRouter.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const watchedShows = await user.getShows();
  res.json(watchedShows);
});

userRouter.put("/:id/shows/:showId", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  const show = await Show.findByPk(req.params.showId);
  await user.addShow(show);
  res.json("Added Show!");
});

module.exports = userRouter;
