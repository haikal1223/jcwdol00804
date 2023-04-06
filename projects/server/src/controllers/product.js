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
                WHERE p.id= ?`, [id], (error, results) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error,
                    });
                };
                return res.status(200).send({
                    success: true,
                    data: results[0],
                });
            });
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Get Products
    getProducts: async (req, res) => {
        try {
            const { category, limit, name, by, order, page } = req.query;
            const offset = (page - 1) * limit;
            const query = `SELECT p.id, p.name, p.description, p.price, p.stock, p.weight, p.is_delete,
            b.name AS branch_id, c.name AS category_id
            FROM product p
            JOIN branch b ON p.branch_id = b.id
            JOIN category c ON p.category_id = c.id
            WHERE p.is_delete=0
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
                };
                if (!results.length) {
                    return res.status(404).send({
                        success: false,
                        message: "Product not found",
                    });
                };
                return res.status(200).send({
                    success: true,
                    data: results,
                });
            });
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Get Categories
    fetchCategories: async (req, res) => {
        try {
            db.query(`SELECT c.name AS category_id
            FROM product p
            JOIN category c ON p.category_id = c.id
            WHERE p.is_delete=0
            GROUP BY c.name;`, (error, results) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error,
                    });
                };
                return res.status(200).send({
                    success: true,
                    data: results,
                });
            });
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Get Featured Products
    getFeaturedProducts: async (req, res) => {
        try {
            db.query(`SELECT id, name, price, weight from product
            WHERE is_delete=0 AND is_featured=1
            LIMIT 6`, (error, results) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error,
                    });
                };
                return res.status(200).send({
                    success: true,
                    data: results,
                });
            });
        } catch (error) {
            return res.status(500).send(error);
        };
    },
}