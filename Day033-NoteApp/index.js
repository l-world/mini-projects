const addBtn = document.querySelector(".add_btn");

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){
    notes.forEach( note => {
        createNote(note)
    });
}

addBtn.addEventListener("click", () => createNote());

function createNote(text = "") {
    const note = document.createElement("div");
    note.classList.add('note');
    note.innerHTML = `
    <header class="note-header">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </header>
    <div class="no-edit ${text ? "" : "hidden"}"></div>
    <textarea class="textarea ${text ? "hidden" : ""}"></textarea>`;

    const editBtn = note.querySelector('.edit'),
          deleteBtn = note.querySelector('.delete'),
          textarea = note.querySelector('textarea'),
          noEditeArea = note.querySelector('.no-edit');

    textarea.value = text;
    noEditeArea.innerHTML = text;

    editBtn.addEventListener('click', e => {
        textarea.classList.toggle('hidden');
        noEditeArea.classList.toggle('hidden')
    })

    deleteBtn.addEventListener('click', function(e){
        note.remove();
        storageNotes();
    })

    textarea.addEventListener('input',e => {
        const value = e.target.value;
        noEditeArea.innerHTML = value;
        storageNotes();
    })

    document.body.appendChild(note);
}


function storageNotes(){
    const textareas = document.querySelectorAll('textarea');
    const notes = [];
    textareas.forEach( textarea => {
        notes.push(textarea.value)
    })
    localStorage.setItem('notes',JSON.stringify(notes));
}
