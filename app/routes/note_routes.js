var ObjectID = require('mongodb').ObjectID;
const noteUri = 'note';
const collect = 'notes';

module.exports = function (app, db) {  
  //select 'get'
  app.get('/'+noteUri+'/:id', (req, res) => {
    const id = req.params.id;
    console.log('Get id:'+id);
    const details = { '_id': new ObjectID(id) }; //MongoDB ID object create
    console.log('Get ObjectID:'+details);
    db.collection(collect).findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        console.log('get item:'+item);
        res.json(item);
      }
    });
  });
  //insert 'post'
  app.post('/'+noteUri, (req, res) => {
    const note = { text: req.body.body, title: req.body.title, complit: 'F' };
    console.log(note);
    db.collection(collect).insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  //delete 'delete'
  app.delete('/'+noteUri+'/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection(collect).remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
  //update 'put'
  app.put ('/'+noteUri+'/:id', (req, res) => { 
    console.log('note update (put)')   
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) }
    var update = { title: req.body.title, text: req.body.body, complit: req.body.complit }
    if (typeof update.title === 'undefined') delete update.title
    if (typeof update.text === 'undefined') delete update.text
    if (typeof update.complit === 'undefined') delete update.complit
    const newvalues = { $set: update}
    db.collection(collect).update(details, newvalues, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'})
      } else {
          res.send(newvalues)
      } 
    });
  });
};