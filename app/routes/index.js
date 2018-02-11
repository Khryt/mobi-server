//const rootRout = require('./root_routes');
const noteRout = require('./note_routes');
const userRout = require('./user_routes');
const loginRout = require('./login_routes');
const notesRout = require('./notes_routes');
const testRout = require('./test_routes');
module.exports = function(app, db) {  
  //rootRout(app);
  loginRout(app, db);
  noteRout(app, db);
  userRout(app, db);
  notesRout(app, db);
  testRout(app, db);
};