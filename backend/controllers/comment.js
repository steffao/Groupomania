const models = require('../models')

//---------------------CREATE---------------------------
exports.createComment = (req, res, next) => {
    console.log(req.auth.userId)
    console.log(req.params.id)
  
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