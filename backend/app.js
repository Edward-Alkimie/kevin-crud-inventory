const express = require('express');
const bcrypt = require("bcrypt");
const env = process.env.NODE_ENV || "development";
const knex = require('knex')(require('./knexfile')[env]);
var cors = require('cors')

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());

const saltRounds =12;
const {hash, compare} = bcrypt;

app.get('/inventory', (req, res) => {
    knex('inventory_list')
        .select('*')
        .then(inventory => {
            res.status(200).json(inventory)
        })
})
app.post('/inventory', async (req, res) => {
    const maxIdQuery = await knex('inventory_list').max('id as maxId').first();
    console.log(maxIdQuery);
    let num = maxIdQuery.maxId + 1;
    console.log(num)
    knex('inventory_list')
        .insert({
            id: num,
            user_id: req.body.user_id,
            itemName: req.body.itemName,
            description: req.body.description,
            quantity: req.body.quantity,
        })
        .then(res.status(200).send('post completed'))
    //     .then(inventory => {
    //         res.status(200).json(inventory)})
})

app.patch('/inventory', (req, res) => {
    knex('inventory_list')
        .where('id', req.body.id)
        //   .then(console.log(req.body.id))
        .update({
            itemName: req.body.itemName,
            description: req.body.description,
            quantity: req.body.quantity
        })
        .then(inventory => {
            inventory === 0 ? res.status(204).send(`Entry ${id} doesn't exist, so nothing was updated`)
                : res.status(200).send(`inventory ${req.body.id} is updated`);
        });
});

app.delete('/inventory', async (req, res) => {
    knex('inventory_list')
        .where('id', req.body.id)
        .del()
        .then(inventory => {
            inventory == 0 ? res.status(204).send(`inventory ${req.body.id} doesn't exist, so nothing was removed`)
                : res.status(410).send(`inventory ${req.body.id} has been removed`);
        })
})



app.get('/user', (req, res) => {
    knex('user_list')
        .select('*')
        .then(users => {
            res.status(200).json(users)
        })
})
///////////////////////////////////////
app.post("/user/login", (req, res) => {
    // verify if a user has entered the right password for their existing account
    let { body } = req;
    let { userName, pass } = body;
    // console.log(userName, pass)
    
    function getPasswordHashForUser(userName) {
        return knex("user_list")
          .where({ userName })
          .select(`password`)
          .then((data) => data[0].password);
      }
  
    getPasswordHashForUser(userName)
      .then((password) => {
        // check the entered pass against the hashed one using bcrypt
        // console.log(`What the user entered on login:`, pass);
        // console.log(`What the db has stored for that user:`, password);
        // look up the hashed password for that user
        compare(pass, password)
          // return a succeed or fail message, depending on the password being right
          .then((isMatch) => {
            if (isMatch) res.status(202).json("PASSWORDS MATCH");
            else res.status(401).json("NO MATCH");
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json("Unrecognized Username"));
  });

// authitication only
// app.get('/user/auc', (req, res) => {
//     knex('user_list')
//         .select('userName')
//         .where(req.body.userName)
//         .catch(res.status(404).send(false))
//         .then(users => {
//             res.status(200).json(users)
//         })
// })
// app.get('/user/aul', (req, res) => {
//     knex('user_list')
//         .select('userName')
//         .then(users => {
//             res.status(200).json(users)
//         })
// })
///////////////////////////////////////

app.post('/user', async (req, res) => {
    const maxIdQuery = await knex('user_list').max('id as maxId').first();
    console.log(maxIdQuery);
    let num = maxIdQuery.maxId + 1;
    console.log(num)
    bcrypt.hash(req.body.password, saltRounds, function(err,hashpass){
    knex('user_list')
        .insert({
            id: num,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: hashpass
        })
        .then(res.status(201).send('post completed'))
    })
});

// app.post('/user', async (req, res) => {
//     const maxIdQuery = await knex('user_list').max('id as maxId').first();
//     console.log(maxIdQuery);
//     let num = maxIdQuery.maxId + 1;
//     console.log(num)
//     knex('user_list')
//         .insert({
//             id: num,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             userName: req.body.userName,
//             password: req.body.password
//         })
//         .then(res.status(201).send('post completed'))
// });






app.patch('/user', (req, res) => {
    knex('user_list')
        .where('id', req.body.id)
        //   .then(console.log(req.body.id))
        .update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password
        })
        .then(inventory => {
            inventory === 0 ? res.status(204).send(`Entry ${id} doesn't exist, so nothing was updated`)
                : res.status(200).send(`inventory ${req.body.id} is updated`);
        });
});

app.delete('/user', async (req, res) => {
    knex('user_list')
        .where('id', req.body.id)
        .del()
        .then(
            knex('inventory_list')
                .where('user_id',req.body.id)
                .del()
                .then(inventory => {
                    inventory == 0 ? res.status(204).send(`inventory ${req.body.id} doesn't exist, so nothing was removed`)
                        : res.status(410).send(`inventory ${req.body.id} has been removed`);

                })
        )

})



app.listen(port, () => {
    `the app is listening at port ${port}`
})