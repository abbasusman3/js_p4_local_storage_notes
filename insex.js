let btn = document.querySelector("#add_btn");
btn.addEventListener("click", addNote);

function addNote() {
    let note = document.querySelector("#userInput").value;
    if (note.trim() == "") {
        alert("Please enter a note");
        return false;
    }
    let existingNotes = JSON.parse(localStorage.getItem('note'));
    if (!existingNotes) {
        existingNotes = [];
    }
    let time = new Date().toLocaleString();
    let array = [note, time];
    existingNotes.unshift(array);
    localStorage.setItem('note', JSON.stringify(existingNotes));
    document.querySelector("#userInput").value = "";
    displayNotes(); // Call displayNotes to update the notes display
}

function displayNotes() {
    let existingNotes = JSON.parse(localStorage.getItem('note'));
    let row = document.querySelector("#section-two");
    let html = "";
    existingNotes.forEach(function (notes, index) {
        html += `<div class="box">
            <span id="cross-icon" onclick='removeNote(${index})'>&times;</span>
            <p class="note">
                ${notes[0]}
            </p>
            <div class="note-item">
                <hr> <small>${notes[1]}</small>
            </div>
        </div>`;
    });
    row.innerHTML = html;
}

function removeNote(index) {
    let existingNotes = JSON.parse(localStorage.getItem('note'));
    existingNotes.splice(index, 1);
    localStorage.setItem('note', JSON.stringify(existingNotes));
    displayNotes();
}

// Initial call to display notes if any exist
displayNotes();