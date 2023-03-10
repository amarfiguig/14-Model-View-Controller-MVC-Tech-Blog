const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(CommentData => res.json(CommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new comment
router.post('/', (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(CommentData => res.json(CommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete a comment by ID
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(CommentData => {
      if (!CommentData) {
        res.status(404).json({ message: 'Could not find comment with this id.' });
        return;
      }
      res.json(CommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
