
const tesseract = require("node-tesseract-ocr");

function ReadImage(config,path) {
//create a promise
  return new Promise((resolve, reject) => {
    let textFromImage = {};

    //read the image file
    tesseract
      .recognize(path, config)
      .then(rslt => {

        //split the txt to an array
        let text = rslt.split("\n");
        //filter the spical character
        text = text.filter(word => word !== " \r").filter(word => word !== "\f").filter(word => word !== "\r");
        //get the first line as a title
        textFromImage.title = text[0].replace("\r", "");
        //delete the first line
        text.splice(0, 1);
        //get the rest of the text
        textFromImage.body = text.join('\n');


        //return the object
        resolve(textFromImage);
      })
      .catch(error => {
        console.log(error.message);
        reject(error);
      });

  })

  console.log(MyResult);


};



module.exports.ReadImage = ReadImage;