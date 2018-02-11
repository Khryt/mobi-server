var ObjectID = require('mongodb').ObjectID;
const userUri = 'login';
const collect = 'users';

module.exports = function (app, db) {
    //insert 'post'
    app.post('/' + userUri, (req, res) => {
        const usr = { usr: req.body.usr };
        const pwd = req.body.pwd;
        console.log(usr);
        db.collection(collect).findOne(usr, (err, user) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                if (user && (user.pwd === pwd)) 
                    res.send('Ok');
                else
                    res.send('Fail');   
            }
        });
    });
};