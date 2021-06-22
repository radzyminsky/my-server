console.log("start");
const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use(require("cors")());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/noa');

const schema = mongoose.Schema;



const ModelCarpentry = new schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    carpentry_shop_name: {
        type: String,
        required: true
    },
    adress: {
        type: {
            street: String,
            num: Number,
            city: String,
        },
        required: true
    },
    fon_numbers: {
        type: String,
        required: true
    },
    types_of_woodens: {
        type: [{
            name_of_Wooden_beam: String,
            description: String,
            price_and_existing_lengthes: [{
                length: Number,
                price: Number,
            }],
        }],
        required: false
    }

})


var Carpentry = mongoose.model('CarpentryOwner', ModelCarpentry);


app.post("/register", (req, res) => {
    var newCarpentry = new Carpentry(req.body);
    newCarpentry.save((err, newDoc) => {
        if (err) {
            console.error("there is an error in user while sign up: " + err.message);
            return res.send(err);
        }
        console.log(newDoc);
        res.status(200).send(req.body);
    });
});

app.post("/login", (req, res) => {
    Carpentry.findOne(req.body, (err, doc) => {
        if (err)
            return res.send(err.msg);
        if (!doc)
            return res.status(404).send("password or name dosent exist");
        res.status(200).send(doc.type_tree);
    });
});


app.put("/update", (req, res) => {

    Carpentry.update(req.body.username_and_password, { $set: req.body.body }, (err, result) => {
        console.log("83", req.body.username_and_password);
        console.log("84", req.body.body);
        console.log("85", result);

        if (err) {
            return res.status(500).send();
        }
        if (!result.n) {
            console.log(result);
            return res.status(404).send();
        }
        res.status(200).send();
    }
    );

});


app.get("/getAllCarpentry", (req, res) => {
    Carpentry.find((err, documents) => {
        if (err)
            return res.status(500).send(err);
        let type_tree_list = [];
        let carpentry_shop_name_list = [];
        for (let index = 0; index < documents.length; index++) {
            type_tree_list[index] = documents[index].type_tree;
            carpentry_shop_name_list[index] = documents[index].carpentry_shop_name;
        }
        res.status(200).send({
            type_tree_list: type_tree_list,
            carpentry_shop_name_list: carpentry_shop_name_list
        });
    });
});

app.listen(3560);



