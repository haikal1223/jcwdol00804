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
route.get(
  "/get-stock-data-branch",
  readToken,
  reportController.getStockDataBranch
);

module.exports = route;
