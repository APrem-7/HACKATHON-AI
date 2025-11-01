import express from "express";
import { PORT } from "./env.js";

const app = express();

app.use(express.json());

//get request
app.get('/',(req,res)=>{
  res.send('Welcome the the Subscription Tracker API')
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API ig on PORT ${PORT} `);

});