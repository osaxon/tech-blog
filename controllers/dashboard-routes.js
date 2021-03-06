const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "post"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    }); // TODO: find all posts for current logged in user
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts });
  } catch (err) {
    res.status(500).json(...err);
  }
});

router.get('/new', (req, res) => {
    res.render('new-post')
})

router.get("/edit/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "title", "post"],
        include: [
          {
            model: Comment,
            attributes: ["id", "comment", "post_id", "user_id"],
            include: {
              model: User,
              attributes: ["user_name"],
            },
          },
          {
            model: User,
            attributes: ["user_name"],
          },
        ],
    }
    );
    const post = postData.get({ plain: true });
    console.log(post)
    res.render("edit-post", {post, logged_in: req.session.logged_in} );
  } catch (err) {
    res.status(400).json({...err});
  }
});

module.exports = router;
