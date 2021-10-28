const express = require('express');
var cors = require('cors');
const app = express();

const port = 3000;

//call
app.use(cors());
app.use(express.json());//sting data is converted to json

app.get('/', (req, res) => {
    console.log('home')
})

let users = [
    { id: 0, name: 'lulu', email: "lulu@gmail.com", phone: "018888181818" },
    { id: 1, name: 'kulu', email: "kulu@gmail.com", phone: "010000181818" },
    { id: 2, name: 'hulu', email: "hulu@gmail.com", phone: "019888181818" },
    { id: 3, name: 'dulu', email: "dulu@gmail.com", phone: "019888181818" }
]
app.post('/users', (req, res) => {

    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);

    console.log('hitting the post', req.body);
    // res.send(JSON.stringify(newUser))
    res.json(newUser);
})

app.get('/users', (req, res) => {
    const search = req.query.search;
    if (search) {
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult);
    }

    else {
        res.send(users);
    }
});


app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];
    res.send(user);
    // console.log(req.params.id);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})