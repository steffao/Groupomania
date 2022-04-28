const bcrypt = require('bcrypt'); // package de la fonction de hashage des données
const jwt = require('jsonwebtoken'); // package permettant de créer un token
const validator = require('validator'); // validation du format de l'email
const models = require('../models')

const validatePwd = (password) => {
  let pwdPattern = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
  return pwdPattern.test(password); 
}

const buildToken = (user) => {
    return jwt.sign(
        { userId: user.id, isAdmin: user.is_admin },
        'RANDOM_SECRET_TOKEN',
        { expiresIn: '24h' },
    )
}
const buildUser = (user) => {
    return {
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        isAdmin: user.is_admin,
    }
    
}

exports.signup = (req, res, next) => {
    models.User.findOne({ where : {email : req.body.email}})
        .then(user => {
            if (!user) {
                if(validator.isEmail(req.body.email, {blacklisted_chars: '$="'}) && validatePwd(req.body.password)) { // Vérification de l'email
                    bcrypt.hash(req.body.password, 10) // salage du mot de passe
                    .then(hash => {
                        models.User.create({
                            email: req.body.email,
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            password: hash,
                            is_admin: false   
                        })
                        .then((createdUser) => { // Récupération du user crée
                            console.log(createdUser.dataValues)
                            const user = createdUser.dataValues
                            console.log(user)
                            return res.status(201).json({ 
                                user: buildUser(user),
                                token: buildToken(user), 
                            })
                        })
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
                        user: buildUser(user),
                        token: buildToken(user),
                    });
                    
                })
                .catch(error => res.status(500).json({ error : 'nooooo' }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.delete = (req, res, next) => {
    models.User.destroy({ where : {id : req.body.id}})
        .then(() => {
            res.status(200).json({message : 'Utilisateur supprimé'});
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        })
}

