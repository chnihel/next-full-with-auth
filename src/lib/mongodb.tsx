import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://cherifnihel456:44LbxP8wVFcJqJDk@cluster0.rdevl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const options = {}

let client : MongoClient | undefined
let clientPromise: Promise<MongoClient>

if (!client) {
  client = new MongoClient(url, options)
  clientPromise = client.connect()
}else {
  clientPromise = Promise.resolve(client)
}




export default clientPromise