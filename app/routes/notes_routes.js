var ObjectID = require('mongodb').ObjectID;
const noteUri = 'notes';
const collect = 'notes';

module.exports = function (app, db) {
    //select 'get'
    app.get('/' + noteUri + '/', (req, res) => { //:count
        console.log('get notes')
        const count = req.params.count;
        var options = {
            // "limit": count,
            //"skip": 10,
            "sort": "_id"
        }        
        db.collection(collect).find({}, options).toArray((err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result);
            }
        }); //.sort({_id:1}.limit(count)
    });
    //insert 'post'
    //delete 'delete'
    //update 'put'
};