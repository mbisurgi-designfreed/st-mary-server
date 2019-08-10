const nodemailer = require('nodemailer');
const express = require('express');
const parser = require('body-parser');
const axios = require('axios');
const cors = require('cors')

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({status: 'ok'});
});

app.post('/email', async (req, res) => {
    const {edad, email, nombre, seconds} = req.body;
    
    try {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'maximiliano.bisurgi@gmail.com',
               pass: 'Maximati12'
           }
       });

    const mailOptions = {
        from: 'maximiliano.bisurgi@gmail.com', 
        to: process.env.TO || 'maximiliano.bisurgi@gmail.com',
        subject: `Resultado encuesta de ${email}`, 
        html: `<p>${nombre} de ${edad} años de edad, cuyo mail es ${email} tardo ${seconds} en resolver el problema</p>`
      };

      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              reject(err);
            else
              resolve(info);
         });
      });
        
        res.status(200).json({status: 'ok'});
    } catch (err) {
        res.status(500).json({err});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening')
});

