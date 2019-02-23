app.get('/user/:userId', function(req, res, next) {
    var locals = {};
    var userId = req.params.userId;
    async.parallel([
        //Load user
        function(callback) {
            db.get('users', userId, function(err, user) {
                if (err) return callback(err);
                locals.user = {
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                };
                callback();
            });
        },
        //Load posts
        function(callback) {
            db.query('posts', {userId: userId}, function(err, posts) {
                if (err) return callback(err);
                locals.posts = posts;
                callback();
            });
        }
    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err); //If an error occurred, we let express handle it by calling the `next` function
        //Here `locals` will be an object with `user` and `posts` keys
        //Example: `locals = {user: ..., posts: [...]}`
        res.render('user-profile', locals);
    });
});
