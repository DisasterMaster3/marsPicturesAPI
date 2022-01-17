const { append } = require('express/lib/response');
const bodyParser = require("body-parser");
const express = require('express');
var request = require('request');
const app = express();

require("dotenv").config();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = `${process.env.api_key}`;

app.get("/", function(req, res){
    res.render("index", {satData: false,error: null});
}); 

app.post("/", function(req, res){
    let sol = req.body.sol;
    var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&sol=${sol}`;

    request(url, function(err, response, body){
        let data = JSON.parse(body);
        console.log(data);
        if (err || data.photos.length == 0) {
            console.log(`Error occurred: ${err}`);
            res.render('index', {satData: false, error: `Invalid entry or no picture was taken on day "${sol}"`})
        }
        else {
            let day = sol;
            //console.log(data);
            let pictures = data.photos;
            let image1 = pictures[0].img_src;
            console.log(pictures[0].sol);
            console.log(pictures[0].earth_date);

            res.render("index", {
                sols: day,
                pictures: pictures,
                satData: true,
                error: null,
            })
        }
    })
});

app.listen(3000, function () {
    console.log("Mars app listening on port 3000!");
});


/*
// this is an arrow function
const arroFunc = (number) => {

    setTimeout(() => {
        console.log(`${Math.random()} this is your randomly generated number`)
    }, 5000);
};

// this is a promise function
const promFunc = new Promise((resolve, reject) => {
    var num = Math.ceil(Math.random());
    console.log(num);
    if (num % 2 == 1){
        resolve("you did it!"); // we can either resolve
    } else{
        reject("you didnt do it!"); // or we can reject
    }
});
console.log
// this is an async function

const asynFunc = async() => {

    const name = await arroFunc(52);
}

asynFunc();

promFunc.then(message => {
    console.log(message); // say if we're good or not
}).catch(error => {
    console.log(error); // or say if there was an error
})






*/