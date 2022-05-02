
const models = require('../models')


//---------------------CREATE---------------------------
exports.createPost = (req, res, next) => {
  console.log(req.file)
  const newPostObject =
  {
    user_id: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    media_url: req.file ? `${req.protocol}://${req.get('host')}/medias/${req.file.filename}` : null,
    is_active: req.body.isActive,
    likes: 0,

  }
  models.Post.create({ ...newPostObject })
    .then(() => res.status(201).json({ message: 'Post enregistré avec succès' }))
    .catch(error => res.status(400).json({ error }));
}

//---------------------FIND ALL---------------------------
exports.getAllPosts = (req, res, next) => {
  console.log(req.auth.isAdmin)
  const isAdmin = req.auth.isAdmin
  const postsListObject = isAdmin ?
  {
    include: {
      model: models.User,
      attributes: ['id', 'first_name', 'last_name'],
    },
    order: [['created_at', 'DESC']] // tri décroissant
  } :
  {
    where: {
      is_active: true
    },
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







//---------------------UPDATE---------------------------
// exports.updateSauce = (req, res, next) => {
//   const sauceObject = req.file ?
//     {
//       ...JSON.parse(req.body.sauce),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
//   Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // 1er arg est l'objet de la bdd correspondant à l'/:id de la req
//     // 2e arg est le nouvel objet de la req dont l'id correspond à celui des param de la req
//     .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
//     .catch(error => res.status(400).json({ error }));
// };

exports.togglePost = (req, res, next) => {
  models.Post.findOne({ where: {id : req.body.id} }).then( // On cherche à récupérer le userId de l'objet à suppr pour comparer au userId de la requête
    (post) => {
      if (!post) { // si l'objet pas trouvé en base
        res.status(404).json({
          error: new Error('Post introuvable')
        });
      } 
      models.Post.update({ is_active : req.body.isActive }, { where: {id: req.body.id}})
        .then(() => res.status(200).json({ message: 'Post modifié' }))
        .catch(error => res.status(400).json({ error }));
    }
  )
};

exports.hidPost = (req, res, next) => {
  Post.findOne({ whereid: {id : req.body.id} }).then( // On cherche à récupérer le userId de l'objet à suppr pour comparer au userId de la requête
    (post) => {
      if (!post) { 
        res.status(404).json({
          error: new Error('Post introuvable')
        });
      }
      if (sauce.userId !== req.auth.userId) { // Si le userId de la req (défini dans le middleware auth) et le userId de l'objet en base sont différents
        res.status(400).json({
          error: new Error('Requête non autorisée!')
        });
      }
      const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // 1er arg est l'objet de la bdd correspondant à l'/:id de la req
        // 2e arg est le nouvel objet de la req dont l'id correspond à celui des param de la req
        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
        .catch(error => res.status(400).json({ error }));
    }
  )
};
//---------------------DELETE---------------------------
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then( // On cherche à récupérer le userId de l'objet à suppr pour comparer au userId de la requête
    (sauce) => {
      if (!sauce) { // si l'objet pas trouvé en base
        res.status(404).json({
          error: new Error('Sauce introuvable!')
        });
      }
      if (sauce.userId !== req.auth.userId) { // Si le userId de la req (défini dans le middleware auth) et le userId de l'objet en base sont différents
        res.status(400).json({
          error: new Error('Requête non autorisée!')
        });
      }
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => { // suppression de l'image du répertoire
        Sauce.deleteOne({ _id: req.params.id }).then( // callback, suppression de l'objet de la bdd
          () => {
            res.status(200).json({
              message: 'Supprimée!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
      )
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

