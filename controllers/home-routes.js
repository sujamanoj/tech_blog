const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

//get all posts for homepage
router.get('/', async (req, res) => {
    try {
        //we need to get all Posts and include the User for each (change lines 8 and 9) - DONE!
        const postData = await Post.findAll({
            include: [User],
        });
        //serialize the data
        const posts = postData.map((post) => post.get({ plain: true }));
        // we should render all the posts here - DONE!
        res.render('all-posts-admin', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get single post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (postData) {
            //serialize the data
            const post = postData.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//giving you the login and signup route.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

module.exports = router;
