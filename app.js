//  <div class="note">
//             <div class="tool">
//                 <i class="fa-solid fa-download"></i>
//                 <i class="fa-solid fa-trash"></i>
//             </div>
//             <textarea></textarea>
//         </div> 

let addBtn = document.getElementById("addBtn");
let main = document.getElementById("main");




addBtn.addEventListener("click", function () {

    addNote();
})

function addNote(text = "") {
    let note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = ` 
            <div class="tool">
                     <i class=" save fa-solid fa-download"></i>
                     <i class=" trash fa-solid fa-trash"></i>
            </div>
                <textarea>${text}</textarea>
            `;

    main.appendChild(note);
    saveNotes();

    note.querySelector(".trash").addEventListener("click", function () {
        note.remove();
        saveNotes();
    })

    note.querySelector(".save").addEventListener("click", function () {
        saveNotes();
    })
    //works as auto save
    note.querySelector("textarea").addEventListener("focusout", function(){
        saveNotes();
    })

}

function saveNotes() {
    let notes = document.querySelectorAll(".note textarea");
    // console.log(notes);  
    let data = [];

    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    // console.log(data)
    if (data.length === 0) {
        localStorage.removeItem("notes");
    }
    else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

(
    function () {
        let lsnotes = JSON.parse(localStorage.getItem("notes"));

        if (lsnotes === null) {
            addNote();
        }
        else {
            lsnotes.forEach(
                     (lsnotes) => {
                         addNote(lsnotes);
        
                     });
        }
    }
)()
