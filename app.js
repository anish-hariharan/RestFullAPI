let express= require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/adduser", (req, res) => {
    let username = req.body.username;
    let dob = req.body.dob;
    let obj = {};
    let key = req.body.userid
    let newuser = {
        "name" : username,
        "dob" : dob
    }
    obj[key] = newuser;

    fs.readFile("users.json", (err, data) => {
        data = JSON.parse(data)
        data[key] = obj[key];
        console.log(data);
        let updateuser = JSON.stringify(data);
        fs.writeFile("users.json", updateuser, (err) => {
            res.end( JSON.stringify(data));
        });
    });
});

app.post("/specific" , (req, res) => {
    fs.readFile("users.json", (err, data) => {
        let users = JSON.parse(data);
        let user = users[req.body.urid]
        console.log(user)
        res.end(JSON.stringify(user))
    })
})

app.post("/delete" , (req, res) => {
    fs.readFile("users.json", (err, data) => {
        data = JSON.parse(data);
        let user = req.body.uid
        delete data[user];
        let update = JSON.stringify(data);
        fs.writeFile("users.json", update, (err) => {
            res.end(JSON.stringify(data))
        })
    })
})

app.get("/show", (req, res) => {
    fs.readFile("users.json", (err, data) => {
        res.end(data);
    })
})

app.listen(5000)