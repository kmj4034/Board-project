const db = require("../model/index");
const Tutorial = db.tutorial;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Title is empty!",
    });
    return;
  }

  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : famlse,
  };

  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Create tutorial failed",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = { where: {} };

  if (keyword) {
    condition = {
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    };
  }
  Tutorial.findAll(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Retrieve all tutorials failure. ",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Retrieve tutorial failure. (id: " + id + ")",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const condition = id ? { where: { id: id } } : null;

  Tutorial.update(req.body, condition)
    .then((resultCount) => {
      if (resultCount == 1) {
        res.send({
          message: "Tutorial updated.",
        });
      } else {
        res.send({
          message: "Cannot update tutorial. (id: " + id + ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Update tutorial failure. (id: " + id + ")",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  const condition = id ? { where: { id: id } } : null;

  Tutorial.destroy(condition)
    .then((resultCount) => {
      if (resultCount == 1) {
        res.send({
          message: "Tutorial deleted.",
        });
      } else {
        res.send({
          message: "Cannot delete tutorial. (id: " + id + ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Delete tutorial failure. (id: " + id + ")",
      });
    });
};
