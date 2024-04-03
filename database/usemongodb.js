import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const uri = "mongodb://mongo:ct0zsBp1PX8Q7Ndb6fJYVH5M9342DTvG@tpe0.clusters.zeabur.com:32406";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('test');
    const users = database.collection('users');

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const find = users.find()

    const res = await find.toArray()
    console.log(res);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);