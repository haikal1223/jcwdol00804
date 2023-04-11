const { db, dbQuery } = require("../config/db");

module.exports = {
  createNewOrder: (req, res) => {
    const { items, address_id, courier, shipping_cost } = req.body;
    db.query(
      `INSERT INTO xmart.order SET ?`,
      { user_id: req.decript.id, address_id, courier, shipping_cost },
      (err, result) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "Failed inserting order",
          });
        }
        db.query(
          `INSERT INTO order_item (product_id, order_id, quantity) VALUES ?`,
          [items.map((val) => [val.product_id, result.insertId, val.quantity])],
          (err, result2) => {
            if (err) {
              return res.status(500).send({
                success: false,
                message: "Failed inserting order item",
              });
            }
            return res.status(200).send({
              success: true,
              message: "Add order item success",
            });
          }
        );
      }
    );
  },
  getOrderList: (req, res) => {
    const { inv, status, start_date, end_date, order, sort_by, page } =
      req.query;
    let limit = 4;
    let offset = (page - 1) * limit;
    const query = `SELECT b.id, c.product_img, a.quantity, b.status, b.invoice_no, b.created_at, c.name, SUM(a.quantity * c. price) AS total_purchased, COUNT(a.id) AS total_items FROM order_item a JOIN xmart.order b ON a.order_id = b.id JOIN product c ON c.id = a.product_id WHERE b.user_id = ${
      req.decript.id
    } AND b.invoice_no LIKE '%${inv}%' AND b.status LIKE '%${status}%' AND b.created_at >= '${start_date} 00:00:00' AND b.created_at <= '${end_date} 23:59:59' GROUP BY b.id HAVING total_items <> 0 ORDER BY b.${sort_by} ${
      order === "true"
        ? sort_by === "created_at"
          ? "DESC"
          : "ASC"
        : sort_by === "created_at"
        ? "ASC"
        : "DESC"
    } LIMIT ${limit} OFFSET ${offset}`;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: err,
        });
      }
      if (!result.length) {
        return res.status(404).send({
          success: false,
          message: "Order list not found",
        });
      }
      return res.status(200).send({ result, limit });
    });
  },
  getOrderDetail: (req, res) => {
    db.query(
      `SELECT a.id, a.status, a.courier, a.shipping_cost, a.invoice_no, a.created_at, b.address, b.city, b.province, b.zipcode FROM xmart.order a JOIN address b ON a.address_id = b.id WHERE a.id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        if (!result.length) {
          return res.status(404).send({
            success: false,
            message: "Order detail not found",
          });
        }
        return res.status(200).send(result);
      }
    );
  },
  getProductInfo: (req, res) => {
    db.query(
      `SELECT a.quantity, b.name, b.price, b.product_img, c.id AS branch_id , c.name as branch_name  FROM order_item a JOIN product b ON a.product_id = b.id JOIN branch c ON b.branch_id = c.id  WHERE a.order_id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        if (!result.length) {
          return res.status(404).send({
            success: false,
            message: "Product info not found",
          });
        }
        return res.status(200).send(result);
      }
    );
  },
};
