const bcrypt = require('bcrypt'); // package de la fonction de hashage des données
const jwt = require('jsonwebtoken'); // package permettant de créer un token
const validator = require('validator'); // validation du format de l'email
const fs = require('fs')
const { Op } = require('sequelize');
const models = require('../models');

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
        id: user.id,
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
                            is_admin: req.body.isAdmin
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
                .catch(error => res.status(500).json({ error : error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.deleteUser = async (req, res, next) => {
    const user = await models.User.findOne({ where: {id : req.auth.userId} });
    if(!user) {
        res.status(404).json({
            error: new Error('Utilisateur introuvable')
        });
        return
    }
    if (req.auth.userId !== user.id) { // Si le userId de la req (défini dans le middleware auth) et le userId de l'objet en base sont différents 
        console.log(req.auth)       
        console.log(user)       
        res.status(400).json({error: ('Requête non autorisée!')}); 
        return
    }
    const partialPosts = await models.Post.findAll({
        where: {
            user_id : user.id,
            media_url: {
            [Op.not]: null
            }
        },
        attributes: ['media_url'] 
    });
    const mediaUrlList = partialPosts.map(partialPost => partialPost.getDataValue('media_url'))
    
    try {
        await models.User.destroy({ where : {id : user.id}, force: true })
    }
    catch(e) {
        res.status(400).json({error: e});
        return
    }

    mediaUrlList.forEach(mediaUrl => {
        const filename = mediaUrl.split("/medias/")[1];
        fs.unlinkSync(`medias/${filename}`)
    
    });         
    res.status(200).json({message : 'Utilisateur supprimé'});
}
