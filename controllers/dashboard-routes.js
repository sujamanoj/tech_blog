const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

//all post dashboard
router.get('/', withAuth, async (req, res) => {
    try {

        const postData = await Post.findAll({
            where: { "userId": req.session.userId },
            include: [User]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render('all-posts', {
            // this is how we specify a different layout other than main! no change needed
            layout: 'dashboard',
            // coming from line 10 above, no change needed
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

//after we click on new post button
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

//when we click on the post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            //serializing the data
            const post = postData.get({ plain: true });
            console.log(post);
            // which view should we render if we want to edit a post?
            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;
