const express = require('express')
const cors = require('cors')
const app = express()
const model = require('./model/model')
const db = require('./server/server')
const bodyparser = require('body-parser')
require('dotenv').config()

app.use(cors());
app.use(express.json())
app.use(bodyparser.json({ extended: true }))
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('hello there')
})



app.post('/signup', async function (req, res) {
    try {
        await adduser(req, res)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'error processing signup' })
    }
})

const adduser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, confirmpassword } = req.body;

        if (!firstname || !lastname || !username || !email || !password || !confirmpassword) {
            return res.status(400).json({ message: "please enter field correctly" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password didn't match" });
        }

        const data = new model(req.body);

        try {
            const existingUser = await model.findOne({ email: data.email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

        } catch (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

        const mydata = await data.save();
        res.status(201).json(mydata);
        console.log('Sign up complete');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error saving user data" });
    }
};



app.get('/userlist', async function (req, res) {
    try {
        await getalluser(req, res)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error fetching data" })
    }
})

let getalluser = async (req, res) => {
    try {
        const data = await model.find()
        if (!data || data.length > 2 === 0) {
            return res.status(400).send('data not present')
        }
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).josn({ message: "error fetching user data" })
    }

}


if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`server is running on port no. ${PORT}`)
})
