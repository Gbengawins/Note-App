const LocalStorage = {};

//the getter method
LocalStorage.get = key => {
  return localStorage.getItem(key);
};

//the setter method
LocalStorage.set = (key, value) => {
  return localStorage.setItem(key, value);
};

//the remove method
LocalStorage.remove = key => {
  return localStorage.removeItem(key);
};

//the get all notes method
LocalStorage.getNotes = () => {
  return LocalStorage.get('notes');
};

//the get all notebook methods
LocalStorage.getNotebooks = notebook  => {
  return LocalStorage.get('notebook');
};

//the set a group of notes method
LocalStorage.setNotes = (notes) => {
  LocalStorage.set('notes', notes);
};

//remove a notes method
LocalStorage.removeNotes = (notes) => {
  LocalStorage.remove('notes');
};

//remove a note by index method
LocalStorage.note = id => {
  if (LocalStorage.getNotes() !== null) {
    const List = JSON.parse(LocalStorage.getNotes());
    return List[id];
  }
  return [];
};

//check a note's existence by id method
LocalStorage.rowExists = object => {
  const List = JSON.parse(LocalStorage.getNotes());
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return object.id === item.id;
    });
  } else {
    return [];
  }
};

//check a note's existence by id in a specific notebook method
LocalStorage.rowExistsIn = (notebook, object) => {
  const List = JSON.parse(localStorage.getItem(notebook));
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return object.id === item.id;
    });
  } else {
    return [];
  }
};

LocalStorage.getAllNotes = (callback) => {
  let NoteNextMonth = LocalStorage.getNotebooks("Next Month");
  let University = LocalStorage.getNotebooks("University");
  let Home = LocalStorage.getNotebooks("Home");
  let Notes = LocalStorage.getNotebooks("Notes");
  let All;

  NoteNextMonth = NoteNextMonth !== null ? JSON.parse(NoteNextMonth) : [];
  University = University !== null ? JSON.parse(University) : [];
  Home = Home !== null ? JSON.parse(Home) : [];
  Notes = Notes !== null ? JSON.parse(Notes) : [];
  All = [...NoteNextMonth, ...University, ...Home, ...Notes];

  return All;
};

//get note by id
LocalStorage.findId = id => {
  const List = LocalStorage.getAllNotes();
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return id === item.id;
    });
  } else {
    return [];
  }
};

//updateNote by id
LocalStorage.updateId = (id, itemObject) => {
  const List = JSON.parse(
    LocalStorage.getNotebooks(
      itemObject.notebook === '' ? 'notes' : itemObject.notebook
      )
    );
  
  let notebookIs = itemObject.notebook;
  if (List !== null && List.length > 0) {
    const updatedList = List.filter(item => {
      if (id === item.id) {
        const { title, message, category } = itemObject;
        item.title = title;
        item.message = message;
        item.category = category;
      }
      return item;
    });
    LocalStorage.set(
      notebookIs === '' ? 'notes' : notebookIs,
      JSON.stringify(updatedList)
    );
    return true;
    } else {
      return false;
      }
};

export default LocalStorage;