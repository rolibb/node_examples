app.get('/user/:name', function(req, res, next) {
    var locals = {};
    var name = req.params.name;
    var userId;
    async.series([
        //Load user
        function(callback) {
            loadUserByName(name, function(err, user) {
                if (err) return callback(err);
                userId = user.id;
                locals.user = user;
                callback();
            });
        },
        function(callback) {
            async.parallel([
                //Load posts
                function(callback) {
                    loadPostsByUserId(userId, function(err, posts) {
                        if (err) return callback(err);
                        locals.posts = posts;
                        callback();
                    });
                },
                //Load photos
                function(callback) {
                    loadPhotosByUserId(userId, function(err, photos) {
                        if (err) return callback(err);
                        locals.photos = photos;
                        callback();
                    });
                }
            ], callback);
        }
    ], function(err) {
        if (err) return next(err);
        res.render('user-profile', locals);
    });
});

function loadUserByName(name, callback) {
    db.query('users', {name: name}, function(err, users) {
        if (err) return callback(err);
        //Check that a user was found
        if (users.length == 0) {
            return callback(new Error('No user with name '+name+' found.'));
        }
        callback(null, users[0]);
    });
}

function loadPostsByUserId(userId, callback) {
    db.query('posts', {userId: userId}, function(err, posts) {
        if (err) return callback(err);
        callback(null, posts);
    });
}

function loadPhotosByUserId(userId, callback) {
    db.query('photos', {userId: userId}, function(err, photos) {
        if (err) return callback(err);
        var photos = [];
        async.forEach(photos, function(photo, callback) {
            fs.exists(photo.path, function(exists) {
                if (exists) {
                    photos.push(photo);
                }
                callback();
            });
        }, function(err) {
            if (err) return callback(err);
            callback(null, photos);
        });
    });
}
