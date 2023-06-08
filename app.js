const express=require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
var code;
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res)
{
  var firstname=req.body.firstname;
  var lastname=req.body.secondname;
  var email=req.body.email;
  var data =
  {
    members:
    [
      {
      email_address: email,
      status: "subscribed",
      merge_fields:
      {
        FNAME: firstname,
        LNAME: lastname,
      }
     }
    ]
  };

  var jSONdata=JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/afad76f1ba ";
  const options={
    method:"POST",
    auth: "bharathn97:c28c44c576780478683478c12788a69e-us14"
  }
const request = https.request(url,options,function(response)
{
  if(response.statusCode===200)
  res.sendFile(__dirname+"/success.html");
  else
  res.sendFile(__dirname+"/failure.html");
   response.on("data",function(data)
 {
   console.log(JSON.parse(data));
 });

});
request.write(jSONdata);
request.end();
});
app.post("/failure.html",function(req,res){
  res.redirect("/");
})
app.listen(6604,function(req,res)
{
  console.log("SERVER STARTED ON 6604");
});
