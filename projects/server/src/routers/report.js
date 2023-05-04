const route = require("express").Router();
const { readToken } = require("../config/token");
const { reportController } = require("../controllers");

route.get(
  "/get-stock-movement-report",
  readToken,
  reportController.getStockMovementReport
);
route.get(
  "/get-stock-movement-detail",
  readToken,
  reportController.getStockMovementDetail
);

module.exports = route;
