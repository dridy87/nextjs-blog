const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dridy:fkawk1@cluster0.etzbx.mongodb.net/dridy?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


export default function userHandler(req, res) {
    const {
        query: { id },
        method,
    } = req

    console.log(method)

    switch (method) {
        case 'POST':
            console.log('billboard api ')
            console.log(req.body)
            client.connect(err => {
                const collection = client.db("dridy").collection("like");
                // perform actions on the collection object

                collection.remove({id: req.body.id}, function(err1, result1){
                    
                    collection.save(req.body, function (err, result) {
                        if (err) throw err;
    
                        
                        res.statusCode = 200
                        res.status(200).json(result)
                    });
                })
                

                //console.log(collection.find())


                //client.close();
            });

            break
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:

            console.log(req.body)
    }




}