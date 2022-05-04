
const models = require('../models')
const fs = require('fs')


//---------------------CREATE---------------------------
exports.createPost = (req, res, next) => {
  
  const newPostObject =
  {
    user_id: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    media_url: req.file ? `${req.protocol}://${req.get('host')}/medias/${req.file.filename}` : null,    
    likes: 0,
  }
  models.Post.create({ ...newPostObject })
    .then(() => res.status(201).json({ message: 'Post enregistré avec succès' }))
    .catch(error => res.status(400).json({ error }));
}

//---------------------FIND ALL---------------------------
exports.getAllPosts = async (req, res, next) => {

  const postsListObject =
  {
    include: {
      model: models.User,
      attributes: ['id', 'first_name', 'last_name'],
    },
    order: [['created_at', 'DESC']] // tri décroissant
  }
   
  models.Post.findAll({
    ...postsListObject
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res, next) => {
  models.Post.findOne({ where: {id : req.params.id} }).then( // On cherche à récupérer le userId de l'objet à suppr pour comparer au userId de la requête
    (post) => {
      if (!post) { // si l'objet pas trouvé en base
        res.status(404).json({
          error: new Error('Post introuvable')
        });
      }
      if ((!req.auth.isAdmin) && (req.auth.userId !== post.user_id)) { // Si le userId de la req (défini dans le middleware auth) et le userId de l'objet en base sont différents        
        res.status(400).json({
        error: ('Requête non autorisée!')
        }); 
        return
      }
      if (post.media_url){
        const filename = post.media_url.split("/medias/")[1];
        fs.unlink(`medias/${filename}`, () => {
        models.Post.destroy({ where : {id : req.params.id}})
          .then(() => res.status(200).json({ message: 'Post supprimé' }))
          .catch(error => res.status(400).json({ error }));
        })
      } else {
        models.Post.destroy({ where : {id : req.params.id}})
          .then(() => res.status(200).json({ message: 'Post supprimé' }))
          .catch(error => res.status(400).json({ error }));
      }      
    }
  )
};

//-------------------------LIKE/UNLIKE-------------
exports.likeSauce = (req, res, next) => { // crée une sauce

  const userId = req.body.userId
  const like = req.body.like
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      if (like === 1) {

        if (!sauce.usersLiked.includes(userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: userId }, $inc: { likes: 1 } })
            .then(() => res.status(200).json({ message: 'L\' utilisateur aime cette sauce!' }))
            .catch(error => res.status(400).json({ error }));
        }

      } else if (like === -1) {

        if (!sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } })
            .then(() => res.status(200).json({ message: 'L\' utilisateur n\'aime pas cette sauce!' }))
            .catch(error => res.status(400).json({ error }));
        }

      } else if (like === 0) {

        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
            .then(() => res.status(200).json({ message: 'L\' utilisateur n\'aime pas cette sauce!' }))
            .catch(error => res.status(400).json({ error }));
        } else if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
            .then(() => res.status(200).json({ message: 'L\' utilisateur aime cette sauce!' }))
            .catch(error => res.status(400).json({ error }));
        }
      }
    }
  )
    .catch((error) => res.status(404).json({ error }));
}

