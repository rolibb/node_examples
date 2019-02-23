app.delete('/messages/:messageIds', function(req, res, next) {
    var messageIds = req.params.messageIds.split(',');
    //`5` is the `concurrency` argument here
    // ----------------------------↴
    async.forEachLimit(messageIds, 5, function(messageId, callback) {
        db.delete('messages', messageId, callback);
    }, function(err) {
        if (err) return next(err);
        res.json({
            success: true,
            message: messageIds.length+' message(s) was deleted.'
        });
    });
});
