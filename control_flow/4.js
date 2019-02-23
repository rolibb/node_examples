app.get('/user/:name', function(req, res, next) {
    var name = req.params.name;
    //Get user by name
    db.query('users', {name: name}, function(err, users) {
        if (err) return next(err);
        if (users.length == 0) {
          return callback(new Error('No user with name '+name+' found.'));
        }
        var user = users[0];

        //Load user's posts
        db.query('posts', {userId: user.id}, function(err, posts) {
            if (err) return next(err);
            locals.posts = posts;

            //We're done and can render the template to the client
            res.render('user-profile', {
                user: {
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                },
                posts: posts
            });
        });
    });
});
