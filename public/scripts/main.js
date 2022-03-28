document.getElementById("submitAccessCode").addEventListener('click', () => {
    let code = document.getElementById("accessCode").value;
    getNotes(code);
})
document.getElementById("accessCode").addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        let code = document.getElementById("accessCode");
        getNotes(code.value);
        code.value = "";
    }
})

async function getNotes(code) {
    try {
        const records = await fetch(`./api/notes/`, {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify({
                accessCode: code
            })
        })
    
        .then(result => result.json())
    
        let notes = records;

        populateNotes(notes);

    } catch (error) {
        console.error(error);
    }

}

function populateNotes(notes) {
    notes.forEach(note => {

        let details = document.createElement('div');
        details.classList.add('details');

        let title = document.createElement('p');
        title.classList.add('title');
        title.textContent = note.fields.Title;

        let url = document.createElement('p');
        url.classList.add('url');
        url.textContent = note.fields.URL;

        details.appendChild(title);
        details.appendChild(url);

        let noteElement;
        if (!document.getElementById(note.id)) {
            noteElement = document.createElement('a');
            noteElement.classList.add('note', note.fields.Color);
            noteElement.id = note.id;
            noteElement.href = note.fields.URL;

            noteElement.appendChild(details);

            document.querySelector('.notesGrid').appendChild(noteElement);
        } else {
            noteElement = document.getElementById(note.id);
            noteElement.textContent = "";
            
            noteElement.appendChild(details);
        }
    });
}