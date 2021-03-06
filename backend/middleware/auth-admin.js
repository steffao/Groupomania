// vérification de l'id grâce token avant de lancer une requête (requete métier de controllers par exemple) 
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    
    try {
        
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
        const isAdmin= decodedToken.isAdmin   
        
        req.auth = {isAdmin : isAdmin} // permet d'attribuer une clé userId à la requête
        
        if (req.body.isAdmin){
            console.log(token)            
            throw 'User ID non autorisée'
        } else {            
            next()
        }

    } catch (error) {
        res.status(403).json({error :error || 'Requête non autorisée'})
    }
}