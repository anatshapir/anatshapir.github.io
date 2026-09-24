import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.json());
app.get("/",(req,res)=>res.json({service:"Anat Recommends API",status:"ok"}));
app.get("/health",(req,res)=>res.json({ok:true}));
app.get("/auth/yahoo",(req,res)=>{
  if(!process.env.YAHOO_CLIENT_ID) return res.status(503).json({error:"Yahoo OAuth is not configured yet."});
  const p=new URLSearchParams({client_id:process.env.YAHOO_CLIENT_ID,response_type:"code",redirect_uri:process.env.YAHOO_REDIRECT_URI||"",scope:"openid"});
  res.redirect("https://api.login.yahoo.com/oauth2/request_auth?"+p.toString());
});
app.get("/auth/yahoo/callback",(req,res)=>{
  res.status(501).send("Yahoo callback is reserved for the approved Mail scope and token exchange.");
});
const port=process.env.PORT||3000;
app.listen(port,()=>console.log("Anat Recommends API listening on "+port));