const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require('../../utils/auth')

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["user_name"],
          }
        },
        {
            model: User,
            attributes: ['user_name']
        }
      ],
    });
    res.status(200).json(postData);
    console.log("hello")
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  console.log("Searching for post ID: ", req.params.id);
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ mode: Comment }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new", async (req, res) => {
  try {
    const newPostData = await Post.create({
      title: req.body.title,
      post: req.body.post,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const postData = await Post.update(
            {
                title: req.body.title
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
