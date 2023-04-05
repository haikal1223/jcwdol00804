const { db, dbQuery } = require("../config/db");

module.exports = {
    // Get Address
    getAddress: async (req, res) => {
        try {
            db.query(
                `SELECT * from address 
                WHERE user_id=${db.escape(req.decript.id)}
                AND is_delete=0
                ORDER BY is_main DESC;`, (error, results) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error,
                    });
                } else {
                    return res.status(200).send(results);
                };
            });
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Add Address
    addAddress: async (req, res) => {
        try {
            const { address, city, province, zipcode } = req.body;
            db.query(
                `SELECT address from address 
                WHERE address=${db.escape(address)};`, (error, results) => {
                if (results.length) {
                    return res.status(409).send({
                        success: false,
                        message: "Your address is already added",
                    });
                } else {
                    db.query(
                        `INSERT INTO address
                            (address, city, province, zipcode, user_id)
                            VALUES (
                                ${db.escape(address)},
                                ${db.escape(city)},
                                ${db.escape(province)},
                                ${db.escape(zipcode)},
                                ${db.escape(req.decript.id)});`, (error, results) => {
                        if (error) {
                            return res.status(500).send({
                                success: false,
                                message: error,
                            });
                        };
                        return res.status(200).send({
                            success: true,
                            message: 'Add Address success',
                        });
                    });
                };
            });
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Delete Address (soft delete)
    deleteAddress: async (req, res) => {
        try {
            const addressId = req.params.id;
            db.query(
                "UPDATE address SET is_delete=1 WHERE id= ?",
                [addressId], (error, results) => {
                    if (error) {
                        res.status(500).send({
                            success: false,
                            message: 'Failed to Delete Address',
                        });
                    };
                    return res.status(200).send({
                        success: true,
                        message: 'Delete Address success',
                        data: results,
                    });
                });
        } catch (error) {
            return res.status(500).send(error);
        };
    },
    // Set Main Address
    setMain: async (req, res) => {
        const addressId = req.params.id;
        db.query(
            `UPDATE address SET is_main=0;`, (error, results) => {
                if (error) {
                    res.status(500).send(error);
                };
                db.query(
                    `UPDATE address SET is_main=1
                    WHERE id=${addressId};`, (error, results) => {
                    if (error) {
                        res.status(500).send(error);
                    };
                    return res.status(200).send({
                        success: true,
                        message: 'This address is set to your Main Address',
                        data: results,
                    });
                });
            });
    },
}