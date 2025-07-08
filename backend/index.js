const express = require("express");
const rootRouter=require('./routes/index')
const cors=require('cors')
require("dotenv").config();



const app=express();

app.use(cors({
  origin: "https://paytm-roan.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // only if using cookies
}));
app.use(express.json())
app.use('/api/v1',rootRouter)

app.listen(3000);
