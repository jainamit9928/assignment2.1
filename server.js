var express = require('express')
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config')
var fs = require("fs");
var _ = require("lodash")
const port = 3000;
const app = express();
const HttpStatus = require('http-status-codes');

app.use(express.static('./src/assets/images'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/items', function (req, res) {
  fs.readFile("src/assets/json/db.json", 'utf-8', (error, data) => {
    if(error){
      res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        status:error
    });
  }
     res
    .status(HttpStatus.OK)
    .send(JSON.parse(data))
  });
});

app.post('/items', function (req, res) {

  fs.readFile('src/assets/json/db.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    else {
      var jsonObject = JSON.parse(data);
      req.on('data', function (obj1) {
        var buf = new Buffer.from(obj1);
        console.log(buf)
        jsonObject.techies.push(JSON.parse(buf)) //add some data body = ;
      });
      req.on('end', function () {
        json = JSON.stringify(jsonObject); //convert it back to json
        fs.writeFile('src/assets/json/db.json', json, 'utf8', function (err) {
          if (err)
            throw err
          console.log("done")
        }); // write it back 
      })
    }

  })
})
app.listen(port, function (error) {
  if (error) {
    console.log(error);
  }
});


app.put('/items/:id', function (req, res) {
  var id = req.params.id

  fs.readFile('src/assets/json/db.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        status:error
    });
    }
    else {
      var jsonObject = JSON.parse(data);
      var techies = jsonObject.techies;
      var techieData
      req.on('data', function (obj1) {
        techieData = JSON.parse(new Buffer.from(obj1))
        var filteredArray = techies.map(techie => {
          if (techie.id === techieData.id) {
            techie = techieData
          }
          return techie
        })
        jsonObject.techies = filteredArray;
      });
      req.on('end', function () {
        json = JSON.stringify(jsonObject); //convert it back to json
        fs.writeFile('src/assets/json/db.json', json, 'utf8', function (err) {
          if (err){
             res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        status:error
    });
          }
          console.log("done",techieData)
          res
    .status(HttpStatus.CREATED)
    .send({status:"success",message:HttpStatus.getStatusText(HttpStatus.CREATED),data:techieData});
        }); // write it back 
      })
    }

  })

});

app.get('/items/:id', function (req, res) {
  var id = req.params.id

  fs.readFile('src/assets/json/db.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
       res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        status:error
    });
    }
    else {
      var jsonObject = JSON.parse(data);
      var techies = jsonObject.techies;
       var filteredArray = techies.filter(techie => {
          return techie.id == id
       })
       console.log("filtered data"+filteredArray[0])
         json =filteredArray[0]; //convert it back to json
             res
    .status(HttpStatus.OK)
    .send({status:"success",data:json});
    }

  })

});
