// const express = require('express')
// const users = express.Router()
// const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

// const User = require('../models/User')
// users.use(cors())

// process.env.SECRET_KEY = 'secret'

// users.post('/login', (req, res) => {
//     User.findOne({
//       where: {
//         email: req.body.email
//       }
//     })
//       .then(user => {
//         if (user) {
//           if (bcrypt.compareSync(req.body.password, user.password)) {
//             let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
//               expiresIn: 1440
//             })
//             res.send(token)
//           }
//         } else {
//           res.status(400).json({ error: 'User does not exist' })
//         }
//       })
//       .catch(err => {
//         res.status(400).json({ error: err })
//       })
//   })

exports.login = function (req, res) {
    var username = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE username = ?', [username],
    function( error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                if(results[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "username and password does not match"
                    });
                }
            } else {
                res.send({
                    "code":204,
                    "success": "username does not exists"
                });
            }
        }    
    }) 
}