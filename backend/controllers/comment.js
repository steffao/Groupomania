const models = require('../models')

//---------------------CREATE---------------------------
exports.createComment = (req, res, next) => {
    console.log(req.auth.userId)
    console.log(Number(req.params.postid))
    console.log(req.body)
  
    const newCommentObject =
    {
      user_id: req.auth.userId,
      post_id: req.params.postid,
      content: req.body.content, 
    }
    console.log(newCommentObject)
    models.Comment.create({ ...newCommentObject })
      .then(() => res.status(201).json({ message: 'Commentaire enregistré avec succès' }))
      .catch(error => res.status(400).json({ error }));
}

//---------------------FIND ALL---------------------------
exports.getAllComments = async (req, res, next) => {

  const commentsListObject =
  {
    where : {post_id : req.params.postid},
    include: {
      model: models.User,
      attributes: ['id', 'first_name', 'last_name'],
    },
    order: [['created_at', 'ASC']] // tri décroissant
  }
  
  models.Comment.findAll({
    ...commentsListObject
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
  console.log('wooo')
}

//---------------------DELETE ONE---------------------------

exports.deleteComment = (req, res, next) => {
  models.Comment.findOne({ where: { id : req.params.id  } }).then( // On cherche à récupérer le userId de l'objet à suppr pour comparer au userId de la requête
    (comment) => {
      if (!comment) { // si l'objet pas trouvé en base
        res.status(404).json({
          error: new Error('Commentaire introuvable')
        });
        return
      }
      if ((!req.auth.isAdmin) && (req.auth.userId !== comment.user_id)) { // Si le userId de la req (défini dans le middleware auth) et le userId de l'objet en base sont différents        
        res.status(400).json({
        error: ('Requête non autorisée!')
        }); 
        return
      }
      
      models.Comment.destroy({ where : {id : req.params.id}})
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(400).json({ error }));           
    }
  )
};
// exports.deleteComment = (req, res, next) => {
//   models.Comment.findOne({ where: {post_id : req.params.postid, id : req.params.id  } }).then( // On cherche à récupérer le userId de l'objet à suppr pour comparer au userId de la requête
//     (comment) => {
//       if (!comment) { // si l'objet pas trouvé en base
//         res.status(404).json({
//           error: new Error('Commentaire introuvable')
//         });
//         return
//       }
//       if ((!req.auth.isAdmin) && (req.auth.userId !== comment.user_id)) { // Si le userId de la req (défini dans le middleware auth) et le userId de l'objet en base sont différents        
//         res.status(400).json({
//         error: ('Requête non autorisée!')
//         }); 
//         return
//       }
      
//       models.Comment.destroy({ where : {id : req.params.id}})
//         .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
//         .catch(error => res.status(400).json({ error }));           
//     }
//   )
// };