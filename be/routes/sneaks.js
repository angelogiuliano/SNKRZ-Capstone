const express = require("express");
const SneaksAPI = require("sneaks-api");
const router = express.Router();

const sneaks = new SneaksAPI();

router.get("/mostPopular", (req, res) => {
  sneaks.getMostPopular(10, (err, products) => {
    if (err) {
      return res.status(500).send({
        statusCode: 500,
        message: "File upload error",
      });
    }
    res.status(200).json(products);
  });
});

module.exports = router;