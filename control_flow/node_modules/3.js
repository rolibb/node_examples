app.get('/user/:name', function(req, res, next) {
    var locals = {};
    var name = req.params.name;
    var userId; //Define `userId` out here, so both tasks can access the variable
    async.series([
        //Load user to get `userId` first
        function(callback) {
            db.query('users', {name: name}, function(err, users) {
                if (err) return callback(err);
                //Check that a user was found
                if (users.length == 0) {
                    return callback(new Error('No user with name '+name+' found.'));
                }
                var user = users[0];
                userId = user.id; //Set the `userId` here, so the next task can access it
                locals.user = {
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                };
                callback();
            });
        },
        //Load posts (won't be called before task 1's "task callback" has been called)
        function(callback) {
            db.query('posts', {userId: userId}, function(err, posts) {
                if (err) return callback(err);
                locals.posts = posts;
                callback();
            });
        }
    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Here locals will be populated with `user` and `posts`
        //Just like in the previous example
        res.render('user-profile', locals);
    });
});
