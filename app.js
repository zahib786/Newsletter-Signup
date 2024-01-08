const express = require("express")
const app = express()
const https = require("node:https");
const bodyParser = require("body-parser");
const { url } = require("node:inspector");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
    // res.send()
})

app.post('/', function(req,res){

    const fullName = req.body.fullName
    const email = req.body.email

    const data = {
        members: [{
            email_address:email,
            status: "subscribed",
            merge_fields : {
                FULLNAME: fullName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    // console.log(jsonData);

    const url = "https://us10.api.mailchimp.com/3.0/lists/c91486355a";
    const options = {
        method: "POST",
        auth: "zahib:94a24bfa1fa4c34d1571c7e4bf70aa5a-us10"
    };

   const request =  https.request(url,options, function(response){

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        } )

        if (response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

    });

    request.write(jsonData);
    request.end();

    // console.log(res);

});


app.listen(3000, function () {
    console.log("Server is running on port 3000.");
  });



  // Api Key 
  // 94a24bfa1fa4c34d1571c7e4bf70aa5a-us10
  // audience id
  // c91486355a