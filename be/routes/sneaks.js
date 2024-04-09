const express = require("express");
const SneaksAPI = require("sneaks-api");
const router = express.Router();

const sneaks = new SneaksAPI();

router.get("/mostPopular/:limit", (req, res) => {
  const {limit} = req.params

  sneaks.getMostPopular(parseInt(limit), (err, products) => {
    if (err) {
      return res.status(500).send({
        statusCode: 500,
        message: "Internal server error",
      });
    }
    res.status(200).json(products);
  });
});

router.get('/getDetails/:styleID', (req, res) => {
  const {styleID} = req.params

  sneaks.getProductPrices(styleID, function(err, product){
    if (err) {
      return res.status(500).send({
        statusCode: 500,
        message: "Internal server error",
      });
    }
    res.status(200).json(product);
})
})

module.exports = router;