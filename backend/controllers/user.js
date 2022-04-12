const bcrypt = require('bcrypt'); // package de la fonction de hashage des données
const jwt = require('jsonwebtoken'); // package permettant de créer un token
const validator = require('validator'); // validation du format de l'email
const models = require('../models')

const validatePwd = (password) => {
  let pwdPattern = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
  return pwdPattern.test(password); 
}

exports.signup = (req, res, next) => {
    models.User.findOne({ where : {email : req.body.email}})
        .then(user => {
            console.log(user)
            if (!user) {
                if(validator.isEmail(req.body.email, {blacklisted_chars: '$="'}) && validatePwd(req.body.password)) { // Vérification de l'email
                bcrypt.hash(req.body.password, 10) // salage du mot de passe
                    .then(hash => {
                        models.User.create({
                            email: req.body.email,
                            first_name: req.body.first_name,
                            name: req.body.name,
                            password: hash,
                            is_admin: req.body.is_admin,
                        })
                    .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                    .catch(error => res.status(400).json({ error }));
                    })
                } else {
                    res.status(400).json({ error: "Le format de l'adresse email est invalide ou le mot de passe n'est pas conforme"});
                }
            } else {
                res.status(409).json({ error: "L'utilisateur existe déjà"})                
            }
        })
        .catch(error => res.status(500).json({ error }));    
}

exports.login = (req, res, next) => {
    models.User.findOne({ where : {email : req.body.email}})
        .then( user => {
            
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur introuvable' });
            }
            bcrypt.compare(req.body.password, user.password) // Si user correspondant trouvé, comparaison du hash (hash du user trouvé en bdd, hash saisi)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    console.log(user.id)
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_SECRET_TOKEN',
                            {isAdmin: user.is_admin},
                            { expiresIn: '24h' },
                        ),
                    });
                    
                })
                .catch(error => res.status(500).json({ error : 'nooooo' }));
        })
        .catch(error => res.status(500).json({ error }));
}

    

/*
function(bcryptedPassword, done) {
    var newUser = models.User.create({
      email: email,
      username: username,
      password: bcryptedPassword,
      bio: bio,
      isAdmin: 0
    })
    .then(function(newUser) {
      done(newUser);
    })
    .catch(function(err) {
      return res.status(500).json({ 'error': 'cannot add user' });
    })
*/

// exports.signup = (req, res, next) => {
//   if(validator.isEmail(req.body.email, {blacklisted_chars: '$="'}) && validatePwd(req.body.password)) { // Vérification de l'email
//       bcrypt.hash(req.body.password, 10) // salage du mot de passe
//           .then(hash => {
//               const user = new User({
//                   email: req.body.email,
//                   password: hash
//               });
//               user.save()
//                   .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
//                   .catch(error => res.status(400).json({ error }));
//           })
//   } else {
//       res.status(400).json({ error: "Le format de l'adresse email est invalide"});
//   }
// };


// exports.login = (req, res, next) => {
//   User.findOne({ email: req.body.email }) // finOne permet de rechercher notre user avec {l'email correspondant}
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//       }
//       bcrypt.compare(req.body.password, user.password) // Si user correspondant trouvé, comparaison du hash (hash du user trouvé en bdd, hash saisi)
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Mot de passe incorrect !' });
//           }
//           res.status(200).json({ // si requête réussi
//             userId: user._id,
//             token: jwt.sign( // permet d'encoder un nouveau token. Ce token contient un payload (1er argt) correspondant au user id
//               { userId: user._id },
//               process.env.SECRET_TOKEN, // Chaine secrète  pour encoder le token
//               { expiresIn: '24h' } // Durée de validité du token
//             ),
//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };
