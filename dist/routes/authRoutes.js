import passport from 'passport';
import express from 'express';
const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
}));
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
}));
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
}));
router.get('/login/failed', (request, response) => {
    response.status(401).json({
        success: false,
        message: 'failure',
    });
});
router.get('/login/success', (request, response) => {
    if (request.user) {
        console.log(request.user);
        response.status(200).json({
            success: true,
            message: 'Successfully logged in',
            user: request.user,
            // cookies: request.cookies
        });
    }
});
router.get('/logout', (request, response) => {
    request.logout();
    response.redirect(CLIENT_URL);
});
app.post('/login', (req, res) => {
    UserModel.findOne({ username: req.body.username }).then((user) => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Could not find the user.',
            });
        }
        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect password',
            });
        }
        const payload = {
            username: user.username,
            id: user._id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d',
        });
        return res.status(200).send({
            success: true,
            message: 'Logged in successfully!',
            token: 'Bearer ' + token,
        });
    });
});
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
        },
    });
});
export default router;
