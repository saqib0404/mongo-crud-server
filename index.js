const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// 5VEwLiyZpfXUXbZh
// dbUser2

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dbUser2:5VEwLiyZpfXUXbZh@cluster0.csyc5ob.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('mongoCRUD').collection('users');
        // const user={name:"saaaa",email:'kkk'};

        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(user);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally { }
}
run().catch(e => console.log(e))


app.get('/', (req, res) => {
    res.send("Server Running....");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})