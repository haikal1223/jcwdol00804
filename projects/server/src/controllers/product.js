const { db, dbQuery } = require("../config/db");

module.exports = {
  // Get Detail Product
  getDetail: async (req, res) => {
    try {
      const { id } = req.params;
      db.query(
        `SELECT p.id, p.name, p.description, p.price, p.stock, p.weight, b.name AS branch_id, c.name AS category_id
                FROM product p
                JOIN branch b ON p.branch_id = b.id
                JOIN category c ON p.category_id = c.id
                WHERE p.id= ?`,
        [id],
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: error,
            });
          }
          return res.status(200).send({
            success: true,
            data: results[0],
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // Get Products
  getProducts: async (req, res) => {
    try {
      const { category, limit, name, by, order, page, branch_name } = req.query;
      const offset = (page - 1) * limit;
      const query = `SELECT p.id, p.name, p.description, p.price, p.stock, p.weight, p.is_delete,
            b.name AS branch_id, c.name AS category_id
            FROM product p
            JOIN branch b ON p.branch_id = b.id
            JOIN category c ON p.category_id = c.id
            WHERE p.is_delete=0 
            AND b.name='${branch_name}'
            AND c.name LIKE '%${category}%'
            AND p.name LIKE '%${name}%'
            ORDER BY ${by === "name" ? "p.name" : "p.price"}
            ${order === "asc" ? "ASC" : "DESC"} 
            LIMIT ${limit} OFFSET ${offset};`;
      db.query(query, (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: error,
          });
        }
        if (!results.length) {
          return res.status(404).send({
            success: false,
            message: "Product not found",
          });
        }
        return res.status(200).send({
          success: true,
          data: results,
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // Get Categories
  fetchCategories: async (req, res) => {
    try {
      const { branch_name } = req.query;
      db.query(
        `SELECT c.name AS category_id
            FROM product p
            JOIN branch b ON p.branch_id= b.id
            JOIN category c ON p.category_id = c.id
            WHERE p.is_delete=0 AND b.name='${branch_name}'
            GROUP BY c.name;`,
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: error,
            });
          }
          return res.status(200).send({
            success: true,
            data: results,
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // Get Featured Products
  getFeaturedProducts: async (req, res) => {
    try {
      const { branch_name } = req.query;
      db.query(
        `SELECT p.id, p.name, p.price, p.weight, b.name AS branch_id from product p JOIN branch b ON p.branch_id = b.id
            WHERE is_delete=0 AND is_featured=1 AND b.name='${branch_name}'
            LIMIT 6`,
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: error,
            });
          }
          return res.status(200).send({
            success: true,
            data: results,
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  adjustStockAfterOrder: (req, res) => {
    try {
      const { items } = req.body;
      const adjustStock = (stock, quantity, product_id) => {
        return new Promise(async (resolve, reject) => {
          try {
            db.query(
              `UPDATE product SET ? WHERE id = ${product_id}`,
              { stock: stock - quantity },
              (err, result) => {
                if (err) throw new Error(err);
                resolve(true);
              }
            );
          } catch (error) {
            reject(error);
          }
        });
      };
      Promise.all(
        items.map(async (val) => {
          let result = await adjustStock(
            val.stock,
            val.quantity,
            val.product_id
          );
          return result;
        })
      )
        .then(() => {
          return res.status(200).send({
            success: true,
            message: "Adjust product stock after order success",
          });
        })
        .catch((err) => {
          return res.status(500).send({
            success: false,
            message: "Adjust product stock failed",
          });
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getBranchList: (req, res) => {
    db.query(`SELECT name from branch`, (err, result) => {
      if (err) {
        return res.status(404).send({
          success: false,
          message: "You don't have any branch store",
        });
      }
      return res.status(200).send(result);
    });
  },
  getProductsAdmin: (req, res) => {
    const { search, page, limit, sort_by, order } = req.query;
    const offset = (page - 1) * limit;
    const query = `SELECT p.id, p.name, p.description, p.price, p.stock, p.weight, p.is_featured ,p.is_delete, p.product_img, c.name AS category_name FROM product p JOIN branch b ON p.branch_id = b.id JOIN category c ON p.category_id = c.id WHERE p.is_delete=0 AND b.name='${
      req.decript.branch_name
    }' AND (c.name LIKE '%${search}%' OR p.name LIKE '%${search}%') ${
      sort_by === ""
        ? ""
        : `ORDER BY p.${sort_by} ${order === "true" ? "ASC" : "DESC"}`
    } `;
    const pagination = `LIMIT ${limit} OFFSET ${offset}`;
    db.query(query + " " + pagination, (error, results) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: error,
        });
      }
      if (!results.length) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      db.query(query, (error, results2) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: error,
          });
        }
        return res.status(200).send({
          result: results,
          allResultLength: results2.length,
        });
      });
    });
  },
  getProductDetailAdmin: (req, res) => {
    db.query(
      `SELECT p.id, p.name, p.description, p.price, p.stock, p.weight, p.is_featured ,p.is_delete, p.product_img, c.name AS category_name FROM product p JOIN category c ON p.category_id = c.id WHERE p.is_delete=0 AND p.id=${req.params.id}`,
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        return res.status(200).send(results[0]);
      }
    );
  },
  addProductAdmin: async (req, res) => {
    try {
      const { category, product_name, description, price, weight } = req.body;
      const categoryId = await dbQuery(
        `SELECT id from category WHERE name=${db.escape(category)}`
      );
      if (!categoryId.length) {
        return res.status(404).send({
          success: false,
          message: "Category ID not found",
        });
      }
      db.query(
        `INSERT INTO product SET ?`,
        {
          name: product_name,
          description,
          price,
          stock: 0,
          weight,
          branch_id: req.decript.branch_id,
          category_id: categoryId[0].id,
        },
        (err, results) => {
          if (err) {
            return res.status(400).send({
              success: false,
              message: err,
            });
          }
          return res.status(201).send({
            success: true,
            message: "Add product success",
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addProductImg: (req, res) => {
    db.query(
      `UPDATE product SET ? WHERE id=(SELECT MAX(id) FROM (SELECT id FROM product) AS x)`,
      { product_img: `/imgProduct/${req.files[0].filename}` },
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        return res.status(200).send({
          success: true,
          message: "Product image uploaded",
        });
      }
    );
  },
  editProduct: async (req, res) => {
    try {
      const { category, product_name, description, price, weight } = req.body;
      const categoryId = await dbQuery(
        `SELECT id from category WHERE name=${db.escape(category)}`
      );
      if (!categoryId.length) {
        return res.status(404).send({
          success: false,
          message: "Category ID not found",
        });
      }
      db.query(
        `UPDATE product SET ? WHERE id=${req.params.id}`,
        {
          name: product_name,
          description,
          price,
          weight,
          category_id: categoryId[0].id,
        },
        (err, results) => {
          if (err) {
            return res.status(400).send({
              success: false,
              message: err,
            });
          }
          return res.status(200).send({
            success: true,
            message: "Edit product success",
          });
        }
      );
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  editProductImg: (req, res) => {
    db.query(
      `UPDATE product SET ? WHERE id=${req.params.id}`,
      { product_img: `/imgProduct/${req.files[0].filename}` },
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        return res.status(200).send({
          success: true,
          message: "Product image uploaded",
        });
      }
    );
  },
  deleteProduct: (req, res) => {
    db.query(
      `UPDATE product SET ? WHERE id=${req.params.id}`,
      { is_delete: 1 },
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        return res.status(204).send({
          success: true,
          message: "Product successfully deleted",
        });
      }
    );
  },
  setFeaturedProduct: (req, res) => {
    db.query(
      `UPDATE product SET ? WHERE id=${req.params.id}`,
      { is_featured: req.body.checked ? 1 : 0 },
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        return res.status(200).send({
          success: true,
          message: "Set featured product success",
        });
      }
    );
  },
  addStock: (req, res) => {
    const { addStock, stock } = req.body;
    db.query(
      `UPDATE product SET ? WHERE id=${req.params.id}`,
      {
        stock: stock + addStock,
      },
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        db.query(
          `INSERT INTO stock_history SET ?`,
          {
            product_id: req.params.id,
            type: "add_stock",
            quantity_change: addStock,
            is_increase: 1,
          },
          (err2, results2) => {
            if (err2) {
              return res.status(500).send({
                success: false,
                message: err2,
              });
            }
            return res.status(201).send({
              success: true,
              message: "Add stock success",
            });
          }
        );
      }
    );
  },
  adjustStock: (req, res) => {
    const { actualQty, quantity_change, is_increase } = req.body;
    if (actualQty < 0) {
      return res.status(400).send({
        success: false,
        message: "Quantity after adjust stock may not below 0",
      });
    }
    db.query(
      `UPDATE product SET ? WHERE id=${req.params.id}`,
      {
        stock: actualQty,
      },
      (err, results) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }
        db.query(
          `INSERT INTO stock_history SET ?`,
          {
            product_id: req.params.id,
            type: "stock_adjustment",
            quantity_change,
            is_increase,
          },
          (err2, results2) => {
            if (err2) {
              return res.status(500).send({
                success: false,
                message: err2,
              });
            }
            return res.status(201).send({
              success: true,
              message: "Stock adjustment success",
            });
          }
        );
      }
    );
  },
};
