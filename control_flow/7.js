app.get('/user/:name', function(req, res, next) {
    var locals = {};
    var name = req.params.name;
    var userId;
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
                userId = user.id; //Set the `userId` here, so the next tasks can access it
                locals.user = {
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                };
                callback();
            });
        },
        //Load posts and photos in parallel (won't be called before task 1's "task callback" has been called)
        function(callback) {
            async.parallel([
                //Load posts
                function(callback) {
                    db.query('posts', {userId: userId}, function(err, posts) {
                        if (err) return callback(err);
                        locals.posts = posts;
                        callback();
                    });
                },
                //Load photos
                function(callback) {
                    db.query('photos', {userId: userId}, function(err, photos) {
                        if (err) return callback(err);
                        locals.photos = [];
                        //Iterate over each photo
                        async.forEach(photos, function(photo, callback) {
                            fs.exists(photo.path, function(exists) {
                                //Only add the photo to locals.photos if it exists on disk
                                if (exists) {
                                    locals.photos.push(photo);
                                }
                                callback();
                            });
                        }, callback);
                    });
                }
            ], callback); //Remember to put in the second series task's "task callback" as the "final callback" for the async.parallel operation
        }
    ], function(err) { //This function gets called after the two series tasks have called their "task callbacks"
        if (err) return next(err);
        //Here `locals` will be populated with `user`, `photos` and `photos`
        res.render('user-profile', locals);
    });
});
