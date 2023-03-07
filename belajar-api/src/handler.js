let notes = require('./notes');

module.exports = {
  getAllNotes, getNote, editNote, addNote, updateNote, deleteNote
};


function getAllNotes() {
  return { status: 'success', data: { notes } };
}


function getNote(request, header) {
  const { id } = request.params;
  const note = notes.filter(note => note.id == id)[0];

  if (note) {
    return { status: 'success', data: { note } };
  }

  const response = header.response({
    status: 'fail',
    message: `Catatan dengan id ${id} tidak ditemukan`
  });
  response.code(404);
  return response;
}


function editNote(request, header) {
  const { id } = request.params;
  const note = notes.filter(note => note.id == id)[0];

  if (note) {
    return { status: 'success', data: { note } };
  }

  const response = header.response({
    status: 'fail',
    message: `Catatan dengan id ${id} tidak ditemukan`
  });
  response.code(404);
  return response;
}


function addNote(request, header) {
  const { title, tags, body } = request.payload;

  const id = notes.length + 1;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const note = {
    id, title, body, tags, createdAt, updatedAt
  };

  notes.push(note);

  const isSuccess = notes.filter(note => note.id == id).length > 0;

  if (isSuccess) {
    const response = header.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: { noteId: id }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });
  response.code(500);
  return response;
}


function updateNote(request, header) {
  const { id } = request.payload;
  const index = notes.findIndex(note => note.id == id);

  if (index > -1) {
    const { title, tags, body } = request.payload;
    notes[index] = { ...notes[index], title, tags, body };

    const response = header.response({
      status: 'success',
      message: 'Catatan berhasil diubah'
    });
    response.code(200);
    return response;
  }

  const response = header.response({
    status: 'fail',
    message: 'Catatan gagal diubah, id tidak ditemukan'
  });
  response.code(404);
  return response;
}


function deleteNote(request, header) {
  const { id } = request.payload;
  const index = notes.findIndex(note => note.id == id);

  if (index > -1) {
    notes = notes.splice(index, 1);
    const response = header.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = header.response({
    status: 'fail',
    message: 'Catatan gagal dihapus, id tidak ditemukan'
  });
  response.code(404);
  return response;
}

