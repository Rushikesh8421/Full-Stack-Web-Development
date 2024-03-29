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
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp1 = weatherData.main.temp;
      const desp = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<h1>The weather description is: "+desp+"<h1>");
      res.write("<h1>Today's temperature of "+query+" is:" + temp1 + " degree Celcius<h1>");
      res.write("<img src="+ imgURL +">");
      res.send();
    });

  });
});





app.listen(3000,function(){
  console.log("Server is running on port 3000")
})
