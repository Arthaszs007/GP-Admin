import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URL;
const options = {}
let client = new MongoClient(URI!, options)
let clientPromise:Promise<MongoClient>

if (!process.env.MONGO_URL) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise


