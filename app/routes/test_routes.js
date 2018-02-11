var ObjectID = require('mongodb').ObjectID;
const Uri = 'test';
const collect = 'test';

module.exports = function (app, db) {
  //select 'get'
  app.get('/'+Uri+'/', (req, res) => {
    const test = { test:'OK' };
    console.log('Get :'+test.test);
    db.collection(collect).findOne(test, (err, result) => {
      if (err) {
        res.send('FAIL');
      } else {
        res.send('OK');
      }
    });
  });
};