const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dridy:fkawk1@cluster0.etzbx.mongodb.net/dridy?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


export default function userHandler(req, res) {
    const {
      query: { id, name },
      method,
    } = req

    console.log('dsfsfs', id)
    res.statusCode = 200
    res.status(200).json({'req':'req'})
 
  }