console.log('hello')
show_notes()
    //code foe button and textarea
let submit = document.getElementById('submit');
let add_notes = document.getElementById("add_notes")

submit.addEventListener('click', (e) => {
    console.log("clciked", add_notes.value);
    //for checking whether notes are existing or not in the local storage
    let notes = localStorage.getItem('notes');
    // console.log('notes are ', typeof(notes))
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    //creating an object to store both title and note
    let title = document.getElementById('title')
    let obj = {
            title: title.value,
            note: add_notes.value
        }
        // console.log(typeof(obj))
    notesObj.push(obj)
    localStorage.setItem('notes', JSON.stringify(notesObj))
        // console.log(localStorage.getItem('notes'))
    add_notes.value = ""
    title.value = ""
    show_notes();
})

function show_notes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach((element, index) => {
        // console.log(element, index)
        html += `<div class="inner_notes">
        <h4>${index+1}</h4>
        <p>title:${element.title}</p>
        <hr>
        <p>${element.note}</p>
        <button type="button" id=${index} class="btn btn-danger" onclick="deleteNote(this.id)">Delete</button>
    </div>`
    });
    let note_div = document.getElementById("notes");
    if (notesObj.length != 0) {
        note_div.innerHTML = html;
    } else {
        note_div.innerHTML = `nothing is in the list please add`
    }
}

function deleteNote(index) {
    // console.log("deleting")
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    //splice method is used for both purpose such as add and delete
    //it can be also used to overwrite the origional array
    notesObj.splice(index, 1) //specify the index and no of elements to be deleted
    localStorage.setItem('notes', JSON.stringify(notesObj))
    show_notes()
}

//for searching
let search = document.getElementById('search')
search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    console.log("input clicked", inputVal)
    let notes = document.getElementsByClassName('inner_notes')
    console.log("notes card is ", notes)
    Array.from(notes).forEach((ele) => {
        let carText = ele.getElementsByTagName("p")[0].innerText;
        console.log(carText)
        let title = ele.getElementsByTagName("p")[1].innerText;
        if (carText.includes(inputVal) || title.includes(inputVal)) {
            // console.log("ented")
            ele.style.display = "block";
        } else {
            ele.style.display = "none"
        }
    })
})