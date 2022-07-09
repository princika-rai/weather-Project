//jshint esversion:6
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
      res.sendFile(__dirname+"/index.html");
  })

    app.post("/",function(req,res){
        const query=req.body.cityname;
        const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=8d39d75e847fd955341caa1456de07c1&units=metric#";
        https.get(url,function(response){    
        response.on("data",function(data){
            const wheatherdata=JSON.parse(data);
            console.log(wheatherdata);
            const temp=wheatherdata.main.temp;
            const wheatherdescription=wheatherdata.weather[0].description;
            const icone=wheatherdata.weather[0].icon;
            console.log(icone);
           const imageUrl="http://openweathermap.org/img/wn/"+icone+"@2x.png";
            res.write("<h1>Temperature at "+query+" is "+temp +" degree celsius</h1>" );
            res.write("<h2>Wheather description : "+wheatherdescription+"</h2>");
            res.write("<img src="+imageUrl+">");
            res.send();
    })
        
    })
    
});

app.listen(3000,function(){
    console.log("server is running");
});