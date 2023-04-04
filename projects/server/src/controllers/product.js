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
}