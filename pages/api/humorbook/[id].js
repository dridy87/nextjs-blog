const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dridy:fkawk1@cluster0.etzbx.mongodb.net/dridy?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


export default function userHandler(req, res) {
    const {
      query: { id, name },
      method,
    } = req

    console.log('dsfsfs', id)
    client.connect(err => {
        const collection = client.db("dridy").collection("bodygall");
        // perform actions on the collection object
      
        //console.log(collection.find())
        collection.find({ pid: id }).toArray(function (err, result) {
          if (err) throw err;
      
          console.log('result:' , {value:result})
          res.statusCode = 200
          res.status(200).json(result)
        //   client.close();
          });
        
        //client.close();
      });
  }