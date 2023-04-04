const { db, dbQuery } = require("../config/db");

module.exports = {
  createNewOrder: (req, res) => {
    const { items, shopName, address_id, courier } = req.body;
    const insertItems = shopName.map((val) => {
      return items.filter((val2) => val2.branch_name === val);
    });
    // db.query(`INSERT INTO order (user_id, address_id, courier) VALUES ?`, [[...shopName.map(()=>req.decript.id)], [...address_id], [...courier]], (err)=> {
    //     if (err) {
    //         return res.status(500).send({
    //             success : false,
    //             message : "Failed inserting order"
    //         })
    //     }
    //     db.query(`INSERT INTO order_item (product_id, order_id, quantity) VALUES ?`, [], (err,result)=>{

    //     })

    // } )
  },
  getOrderList: (req, res) => {},
};
