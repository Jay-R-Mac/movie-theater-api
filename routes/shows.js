const { Router } = require("express");
const showRouter = Router();
const { Show, User } = require("../models/index");
const { check, validationResult } = require("express-validator");
const { where, Op } = require("sequelize");

showRouter.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

showRouter.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;

  const shows = await Show.findAll({
    where: {
         genre: genre,
        }, 
    },
  );
  res.json(shows);
});

showRouter.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.json(show);
});

showRouter.get("/:id/users", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  const watchedByUsers = await show.getUsers();
  res.json(watchedByUsers);
});

showRouter.put("/:id/available/", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show.available === false) {
    await show.update({ available: true });
  } else if (show.available === true) {
    await show.update({ available: false });
  }
  res.json("Availability Changed!");
});

showRouter.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  await show.destroy();
  res.json("Show Deleted");
});

module.exports = showRouter;
