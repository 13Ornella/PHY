 const express = require('express');
 const mysql = require("mysql");
 const multer = require("multer");
 const cors = require('cors');
 const nodemailer = require('nodemailer');
 const PDFDocument = require('pdfkit');
const fs = require('fs');
const os = require('os'); 

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

app.get('/offre/:id', (req, res) =>{
  const sql= "UPDATE offre SET `name`=?,`description`=?,`experience`=?,`imageSrc`=?,`date`=? WHERE ID=?";
  const id=req.params.id;
  db.query(sql,[ req.body.name,
    req.body.description,
    req.body.experience,
    req.body.imageSrc,
    req.body.date, id]),
    (err, result)=>{
      if(err) {
        return res.status(500).json({ message: "Server Error" });
      }
      return res.status(200).json(result);
   } });
    
  /*app.post('/modifierOffre', async (req, res) => {
    const {
      id,
      name,
      description,
      experience,
      imageSrc,
      date,
    } = req.body;
  
    const updateQuery = `
      UPDATE offre
      SET name = ?,
          description = ?,
          experience = ?,
          imageSrc = ?,
          date = ?
      WHERE id = ?
    `;
  
    db.query(updateQuery, [name, description, experience, imageSrc, date, id], (err, results) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Offer not found' });
        } else {
          res.json({ message: 'Offer updated successfully' });
        }
      }
    });
  });*/
  


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

 app.get('/nbParOffre', (req, res)=>{
   const value = req.body.offreId;
   db.query('SELECT COUNT(*) AS offerCount FROM account WHERE offreId = ?', value, (err, results) => {
      if (err){
         console.error("Erreur!"+err);
         res.status(500).json({ error:'Erreur'})
      } else {
         res.json(results);
      }
   });
 });

 app.delete('/offre/:id', (req, res) => {
  const offreId = req.params.id;
  
  // Use SQL to delete the "offre" with the specified ID from your database
  const sql = "DELETE FROM offre WHERE id = ?";
  
  db.query(sql, [offreId], (err, result) => {
    if (err) {
      console.error("Error deleting 'offre':", err);
      res.status(500).json({ error: "An error occurred while deleting the 'offre'." });
    } else {
      // Check if any rows were affected; if not, the "offre" with the provided ID doesn't exist
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "The 'offre' with the specified ID was not found." });
      } else {
        // Successful deletion
        res.status(204).send();
      }
    }
  });
});

app.post('/modifierOffre', (req, res) => {
  const { id, name, description, experience, imageSrc, date } = req.body;
  
  // Use a SQL UPDATE statement to modify the offer
  const sql = 'UPDATE offers SET name = ?, description = ?, experience = ?, imageSrc = ?, date = ? WHERE id = ?';
  const values = [name, description, experience, imageSrc, date, id];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    return res.json({ message: 'Offer modified successfully' });
  });
});

/*app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

 app.post('/nbPostulant', (req, res) =>{
   const sql= "INSERT INTO offre (`Postulant`) VALUES (?)";
   
   const values = [
      req.body.Postulant,]})

 app.get('/nbOffre', (req, res)=>{
   db.query('SELECT * FROM offre', (err, results) => {
      if (err){
         console.error("Erreur!"+err);
         res.status(500).json({ error:'Erreur'})
      } else {
         res.json(results);
      }
   });
 });

 app.post('/account', (req, res) =>{
   const sql= "INSERT INTO account (`nom`,`prenom`,`email`,`telephone`,`situation`,`sexe`,`domaine`,`niveau`,`experience`,`adresse`,`cv`,`offreId`) VALUES (?)";
   const sql2 = "UPDATE offre o JOIN (SELECT offreId, COUNT(*) AS compteur FROM account GROUP BY offreId) a ON o.id = a.offreId SET o.Postulant = a.compteur";
   
   const values = [
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.telephone,
      req.body.situation,
      req.body.sexe,
      req.body.domaine,
      req.body.niveau,
      req.body.experience,
      req.body.adresse,
      req.body.cv,
      req.body.offreId
   ]
   db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json("Error");
      }
  
      // La première requête SQL a réussi, exécutez maintenant la deuxième requête SQL (sql2)
      db.query(sql2, (err2, data2) => {
        if (err2) {
          return res.json("Error executing SQL2");
        }
        
        // Les deux requêtes SQL ont réussi
        return res.json(data2);
      });
    });
  });

  app.get('/candidature/offre/:offreId', (req, res) => {
   const offreId = req.params.offreId;
   const query = 'SELECT * FROM account WHERE offreId = ?';
   db.query(query, [offreId], (err, results) => {
     if (err) {
       console.error('Erreur lors de la récupération des candidatures : ' + err.message);
       res.status(500).json({ error: 'Erreur serveur' });
     } else {
      console.log(results);
       res.json(results);
     }
   });
 });

   app.get('/candidat/:id', (req, res) => {
   const id = req.params.id;
   const query = 'SELECT * FROM account WHERE id = ?';
   db.query(query, [id], (err, results) => {
     if (err) {
       console.error('Erreur lors de la récupération des candidatures : ' + err.message);
       res.status(500).json({ error: 'Erreur serveur' });
     } else {
      console.log(results);
       res.json(results);
     }
   });
 });

 app.get('/candidat/:id/cv', (req, res) => {
   const candidatId = req.params.id;
 
   // Utilisez une requête SQL pour récupérer le blob PDF en fonction de l'ID du candidat
   const query = 'SELECT cv FROM candidats WHERE id = ?';
 
   db.query(query, [candidatId], (err, result) => {
     if (err) {
       console.error('Erreur lors de la récupération du blob PDF : ' + err);
       res.status(500).send('Erreur lors de la récupération du blob PDF');
     } else {
       if (result.length > 0) {
         // Le blob PDF a été récupéré avec succès
         const pdfBlob = result[0].cv;
 
         // Envoyez le blob PDF en réponse au client avec le bon type MIME
         res.setHeader('Content-Type', 'application/pdf');
         res.status(200).send(pdfBlob);
       } else {
         // Aucun candidat trouvé avec cet ID
         res.status(404).send('Candidat non trouvé');
       }
     }
   });
 });
 

 app.get('/candidature', (req, res)=>{
   db.query('SELECT * FROM account', (err, results) => {
      if (err){
         console.error("Erreur!"+err);
         res.status(500).json({ error:'Erreur'})
      } else {
         res.json(results);
      }
   });
 });
  
 app.get('/nbCandidature', (req, res)=>{
   db.query('SELECT COUNT(*) as nbCandidature FROM account', (err, results) => {
      if (err){
         console.error("Erreur!"+err);
         res.status(500).json({ error:'Erreur'})
      } else {
         res.json(results);
      }
   });
 }); 

 const transporter = nodemailer.createTransport({
  service: 'Gmail', // Ex: 'Gmail'
  auth: {
    user: 'phytaratsimbazafy@gmail.com', // Votre adresse e-mail
    pass: '13ORNELLA', // Votre mot de passe
  },
});
app.put('/modifierOffre/:id', (req, res) => {
  const id = req.params.id; // Assuming you have an "id" parameter in the URL to specify which record to update.
  const sql = "UPDATE offre SET `name`=?, `description`=?, `experience`=?, `imageSrc`=?, `date`=? WHERE id=?";
   
  const values = [
    req.body.name,
    req.body.description,
    req.body.experience,
    req.body.imageSrc,
    req.body.date,
    id // Make sure to include the ID to specify which record to update.
  ];
  });


/*app.delete('/supprOffre/:id', (req, res) => {
  const id = req.params.id; // Assuming you have an "id" parameter in the URL to specify which record to delete.
  const sql = "DELETE FROM offre WHERE id = ?";
});*/

 app.post('/envoyer-email', (req, res) => {
  const message = req.body.message; // Récupérez le message du formulaire

  const mailOptions = {
    from: 'phytaratsimbazafy@gmail.com',
    to: 'miantsaiarilanja@gmail.com', // Remplacez par l'e-mail de callout.email
    subject: 'Nouveau message de formulaire',
    text: message,
  };

  // Envoyer l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
    } else {
      console.log('E-mail envoyé : ' + info.response);
      res.status(200).send('E-mail envoyé avec succès');
    }
  });
});

 app.listen(3001, ()=>{
    console.log("Server listen to the port 3001");
 })