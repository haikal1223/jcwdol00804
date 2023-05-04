const { db, dbQuery } = require("../config/db");

module.exports = {
  getStockMovementReport: (req, res) => {
    const { search, start_date, end_date, limit, page } = req.query;
    let offset = (page - 1) * limit;
    let query = `SELECT p.id, p.name, p.stock as latest_stock, sum(s.quantity_change) as total_quantity_change, (p.stock - sum(s.quantity_change)) as initial_stock FROM product p 
    LEFT JOIN stock_history s ON p.id = s.product_id
    WHERE p.branch_id = ${req.decript.branch_id} AND p.name LIKE '%${search}%' AND s.created_at >= '${start_date} 00:00:00' AND s.created_at <= '${end_date} 23:59:59'
    GROUP BY p.name ORDER BY p.name ASC`;
    let pagination = `LIMIT ${limit} OFFSET ${offset}`;
    db.query(query + " " + pagination, (err, results) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: err,
        });
      }
      if (!results.length) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      db.query(query, (err2, results2) => {
        if (err2) {
          return res.status(500).send({
            success: false,
            message: err2,
          });
        }
        return res.status(200).send({
          result: results,
          allResultLength: results2.length,
        });
      });
    });
  },
  getStockMovementDetail: (req, res) => {
    const { product_id, start_date, end_date, sort_date_asc } = req.query;
    db.query(
      `SELECT * from stock_history WHERE product_id=${product_id} AND created_at >= '${start_date} 00:00:00' AND created_at <= '${end_date} 23:59:59' ORDER BY created_at ${
        sort_date_asc === "true" ? "ASC" : "DESC"
      }`,
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        if (!results.length) {
          return res.status(404).send({
            success: false,
            message: "Product not found",
          });
        }
        return res.status(200).send(results);
      }
    );
  },
};
