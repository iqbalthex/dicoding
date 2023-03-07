const {
  getAllNotes, getNote, editNote,
  addNote, updateNote, deleteNote
} = require('./handler');

const routes = [
  // GET
  { method: 'GET', path: '/notes',           handler: getAllNotes },
  { method: 'GET', path: '/notes/{id}',      handler: getNote },
  { method: 'GET', path: '/notes/{id}/edit', handler: editNote },

  // POST
  { method: 'POST', path: '/notes', handler: addNote },

  // PUT
  { method: 'PATCH', path: '/notes', handler: updateNote },

  // DELETE
  { method: 'DELETE', path: '/notes', handler: deleteNote },
];

module.exports = routes;
