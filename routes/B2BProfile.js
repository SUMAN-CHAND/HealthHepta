const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.get('/sub_admin/profile-details', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id;
        const user = req.session.user;
        // console.log(user)
        var address;
        if (true) {
            // const sql = "Select * from address where user_id = ?";
            const sql = "SELECT  sub_admin.id ,name ,phone ,role,SubAdminImageId,LicenceImageId,address_sub_admin.address_id ,Village ,P_O,City,district,State,Pin  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id and sub_admin.id = ?;";
            // const sql2 = "SELECT  id ,name ,phone ,role FROM sub_admin where sub_admin.id = ?;";

            const sql1 = "Select COUNT(`cart_id`) AS namesCount from B2B_CartTable where sub_admin_id = ?";
            db.query(sql, [user_id], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                address = data;
                // console.log(data)
            })
            db.query(sql1, [user_id], (err, data) => {
                try {
                    if (err) {
                        return res.json(err);
                    }
                    if (data.length > 0) {
                        //  res.json("Success");

                        // console.log(data)
                        // console.log(address)
                        return res.json([data[0].namesCount, user_id, address[0].City]);
                    } else {
                        return res.json(null);
                    }
                } catch (error) {
                    // console.log(error)
                }

            })
        } else {
            const sql = "Select * from address INNER JOIN address_sub_admin ON address_sub_admin.address_id = address.address_id  where address_sub_admin.sub_admin_id = ?;";
            // const sql1 = "Select COUNT(`cart_id`) AS namesCount from CartTable where user_id = ?";
            db.query(sql, [user_id], (err, data) => {
                if (err) {
                    // console.log(err)
                    return res.json(err);
                } try {
                    address = data;
                    return res.json([data.length - 1, user_id, address[0].City]);
                }
                catch {
                    console.log(error)
                }
            })
            // db.query(sql1, [user_id], (err, data) => {
            //     try {
            //         if (err) {
            //             return res.json(err);
            //         }
            //         if (data.length > 0) {
            //             //  res.json("Success");

            //             console.log(data)
            //             // console.log(address)
            //             // data[0].namesCount = 0;
            //             return res.json([data[0].namesCount, user_id, address[0].City]);
            //         } else {
            //             return res.json("Faile");
            //         }
            //     } catch (error) {
            //         console.log(error)
            //     }

            // })
        }
    } else {

        // req.session.user = user;
        return res.json("0")
    }
})


module.exports = router;