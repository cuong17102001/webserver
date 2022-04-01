import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();

let app = express();



//config app


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

viewEngine(app);
initWebRoutes(app);

connectDB();



const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
app.use(cors(corsOpts));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });


  
let port = process.env.PORT || 6969;


app.listen(port , () => {
    console.log("backend Nodejs is runing on the port:" + port);
});