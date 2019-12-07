const { ReadImage } = require("./Helper/textFromImage.helper");
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
//configuration
const config = {
  lang: "eng",
  oem: 1,
  psm: 3
}
const path = 'image/0.png';

ReadImage(config,path).then(result => {
  if (result.title) {
    //get the connection string from .env file
    const MONGODB_URL = process.env.MONGODB_URL;
    //connect to the mongo client
    const client = new MongoClient(MONGODB_URL, { useUnifiedTopology: true }, { useNewUrlParser: true });

    client.connect(err => {
      //create connection
      const collection = client.db("MyDB").collection("Content");
      // perform actions on the collection object
      console.log("connected");
      console.log(result);
      //test if content exist if yes exit
      collection.findOne({ title: result.title })
        .then(function (doc) {
          if (doc) {
            console.log('this content is already exist ..');
            process.exit(1);
          }

        });
      //add content
      collection.insertOne(result, function (err, res) {
        console.log("data inserted");
      })
      client.close();
    });
  } else {
    console.log("no result");

  }

});

