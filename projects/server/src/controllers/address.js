const { db, dbQuery } = require("../config/db");
const { geocode } = require("opencage-api-client");

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
            const geoResults = await geocode({
                q: `${address}, ${city}, ${province}`,
                countrycode: "id",
                key: process.env.OPENCAGE_KEY
            });
            const { lat, lng } = geoResults.results[0].geometry;
            db.query(
                `INSERT INTO address
                (address, city, province, zipcode, user_id, lat, lng)
                VALUES (
                ${db.escape(address)},
                ${db.escape(city)},
                ${db.escape(province)},
                ${db.escape(zipcode)},
                ${db.escape(req.decript.id)},
                ${lat},
                ${lng});`,
                (error, results) => {
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
        const userId = req.decript.id;
        db.query(
            `UPDATE address SET is_main = CASE
            WHEN id = ${addressId} 
            THEN 1
            ELSE 0
            END
            WHERE user_id = ${userId}`,
            (error, results) => {
                if (error) {
                    res.status(500).send(error);
                };
                return res.status(200).send({
                    success: true,
                    message: 'This address is set to your Main Address',
                    data: results,
                });
            }
        );
    },
}