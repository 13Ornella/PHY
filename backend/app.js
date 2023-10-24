 const express = require('express');
 const mysql = require("mysql");
 const cors = require('cors');

 const app = express();
 app.use(cors());
 app.use(express.json());

 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "gesrec" 
 });

 db.connect((error)=>{
   if(error){
      console.log(error); 
   } else{
      console.log("Connected");
  }
})

 app.post('/users', (req, res) =>{
   const sql= "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
   
   const values = [
      req.body.name,
      req.body.email,
      req.body.password
   ]
   db.query(sql,[values], (err, data) => {
      if(err){
         return res.json("Error");
            }
            return res.json(data);
   })
 })

 app.post('/ajoutOffre', (req, res) =>{
   const sql= "INSERT INTO offre (`name`,`description`,`experience`,`imageSrc`,`date`) VALUES (?)";
   
   const values = [
      req.body.name,
      req.body.description,
      req.body.experience,
      req.body.imageSrc,
      req.body.date
   ]
   db.query(sql,[values], (err, data) => {
      if(err){
         return res.json(err);
            }
            return res.json(data);
   })
 })

 app.get('/offre', (req, res)=>{
   db.query('SELECT * FROM offre', (err, results) => {
      if (err){
         console.error("Erreur!"+err);
         res.status(500).json({ error:'Erreur'})
      } else {
         res.json(results);
      }
   });
 }); 

 app.get("/", (req,res)=>{ 
 res.render('frontend/src/pages/dashboard')

 });

 app.listen(3001, ()=>{
    console.log("Server listen to the port 3001");
 })