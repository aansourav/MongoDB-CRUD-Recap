const express = require("express");
const cors = require("cors");
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`))

app.get("/", (req, res) => {
    res.send("Welcome to Express Server");
});

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    try {
        await client.connect();
        const collection = await client.db("Draft").collection("Draft Crud");
        await client.db("Draft").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.get('/users', async (req, res) => {
            try {
                const users = await collection.find({}).toArray();
                res.json(users);
            } catch (err) {
                console.error("Error while retrieving users:", err);
                res.status(500).send("Internal Server Error");
            }
        });

        app.post("/users", async (req, res) => {
            const newUser = req.body
            const result = await collection.insertOne(newUser)
            res.send(result)

        })

        app.delete("/users/:id", async (req, res) => {
            const userId = new ObjectId(req.params.id)
            try {
                const result = await collection.deleteOne({_id: userId});
                if (result.deletedCount === 1) {
                    res.json({message: "User deleted successfully"});
                } else {
                    res.status(404).json({message: "User not found"});
                }
            } catch (err) {
                console.error("Error while deleting user:", err);
                res.status(500).send("Internal Server Error");
            }
        });

        app.put('/users/:id', async (req, res) => {
            const user = req.body
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await collection.updateOne({_id: new ObjectId(req.params.id)}, updatedUser, {upsert: true});
            res.send(result)
        })

        app.get("/users/:id", async (req, res) => {
            const userId = new ObjectId(req.params.id)
            try {
                const user = await collection.findOne({_id: userId});
                if (user) {
                    res.send(user);
                } else {
                    res.status(404).json({message: "User not found"});
                }
            } catch (err) {
                console.error("Error while updating user:", err);
                res.status(500).send("Internal Server Error");
            }
        });

    } catch (err) {
        console.log(err);
    }
}

run().catch(console.log);



