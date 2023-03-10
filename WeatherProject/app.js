const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "4a035bc8567680a5b0df92e76cdaae5a";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";
    https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDesp = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The weather at "+query+" is "+weatherDesp+"</h1>");
        res.write("<h1>The temp at "+query+" is "+temp+"</h1>");
        res.write("<img src="+imageURL+">");
        res.send();

      });
    });

})


app.listen(3000,function(){
  console.log("The app is running at port: 3000");
});
