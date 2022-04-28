const express = require ('express');
const helmet = require('helmet');
const path = require('path');
const authRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const app = express() ;
require('dotenv').config();

app.use(express.json()); // middleware interceptant tous les objets json provenant de json.

//---------------------------ADRESSE BDD----------------------
// mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PWD}@${process.env.MDB_CLUSTER}/${process.env.MDB_DB_NAME}?retryWrites=true&w=majority`, // adress de la base mongoDB
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

//---------------------------SECURITY----------------------
app.use(helmet()); // failles XSS

//---------------------------CORS----------------------
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*' );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images'))); // middleware répondant au requête envoyée à /image
// requete envoyé a /images , le middleware sert le dossier static. en argument on passe le chemin.
// path = chemin du server, dirname = repertoire de base, 'images' = sous réperoire image

//---------------------------ROUTES----------------------
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;