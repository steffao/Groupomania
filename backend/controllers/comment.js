const models = require('../models')

//---------------------CREATE---------------------------
exports.createComment = (req, res, next) => {
    console.log(req.auth.userId)
    console.log(Number(req.params.id))
    console.log(req.body)
  
    const newCommentObject =
    {
      user_id: req.auth.userId,
      post_id: req.params.id,
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
    where : {post_id : req.params.id},
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