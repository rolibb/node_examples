//DON'T DO THIS AT HOME!
app.get('/user/:userId', function(req, res, next) {
    var locals = {};
    var userId = req.params.userId;
    var callbackCounter = 0;
    var gotError = false;
    db.get('users', userId, function(err, user) {
        if (gotError) {
            return;
        }
        if (err) {
            gotError = true;
            return next(err);
        }
        locals.user = {
            name: user.name,
            email: user.email,
            bio: user.bio
        };
        callbackCounter++;
        if (callbackCounter == 2) {
            res.render('user-profile', locals);
        }
    });
    db.query('posts', {userId: userId}, function(err, posts) {
        if (gotError) {
            return;
        }
        if (err) {
            gotError = true;
            return next(err);
        }
        locals.posts = posts;
        callbackCounter++;
        if (callbackCounter == 2) {
            res.render('user-profile', locals);
        }
    });
});
