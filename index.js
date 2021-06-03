console.log("start");
const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use(require("cors")());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/noa');
const schema = mongoose.Schema;
const myModel = new schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
})


var person = mongoose.model('person', myModel);

app.post("/", (req, res) => {
    var newPerson = new person(req.body);
    newPerson.save((arr, newDoc) => {
        if (arr) {
            console.log("there is an error");
            return res.send(arr);
        }
        res.status(200).send(req.body);
    });
});


app.listen(3560);