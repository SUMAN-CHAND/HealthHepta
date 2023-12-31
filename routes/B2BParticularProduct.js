const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.get('/b2b/addtocart/:product_id', (req, res) => {

    // const sql2 = "Select * from product where `product_id` In sql1";
    // console.log(req.params.product_id)
    const product_id = req.params.product_id;
    const sql1 = "Select *  from B2B_product where product_id = ?";
    db.query(sql1, [product_id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            //  res.json("Success");
            console.log(data)
            return res.json(data);
        } else {
            console.log(data)
            return res.json("Faile");
        }
    })
})

//Add to Cart Route

router.post('/b2b/addtocart/:product_id/:quantity', (req, res) => {
    if (req.session.user) {
        const product_id = parseInt(req.params.product_id);
        const quantity = parseInt(req.params.quantity);
        const sub_admin_id = parseInt(req.session.user.id);

        const product = [
            product_id,
            quantity,
            sub_admin_id
        ]
        // console.log(product)

        try {
            // Insert the product into the database
            db.query('insert into B2B_carttable (`product_id`,`quantity`,`sub_admin_id`) values (?,?,?);', product, (err, result) => {
                if (err) {
                    console.log( err);
                    res.status(500).json({ error: 'Failed to add the product to CART' });
                } else {
                    console.log('Product added successfully');
                    res.status(200).json({ message: 'Product added to CART successfully' });
                }
            });
        } catch (err) {
            console.error('Error while processing the request: ' + err.message);
            res.status(500).json({ error: 'An error occurred while processing the request' });
        }
    } else {
        return res.json(null);
    }
})



module.exports = router;