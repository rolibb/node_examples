app.delete('/messages/:messageIds', function(req, res, next) {
    var messageIds = req.params.messageIds.split(',');
    async.forEach(messageIds, function(messageId, callback) { //The second argument, `callback`, is the "task callback" for a specific `messageId`
        //When the db has deleted the item it will call the "task callback"
        //This way async knows which items in the collection have finished
        db.delete('messages', messageId, callback);
    }, function(err) {
        if (err) return next(err);
        //Tell the user about the great success
        res.json({
            success: true,
            message: messageIds.length+' message(s) was deleted.'
        });
    });
});
