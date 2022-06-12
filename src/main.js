const noteContainer=document.getElementById("app")
const addNoteButton=noteContainer.querySelector(".add-note")

getNotes().forEach(note => {
    const noteElement=createNoteElement(note.id, note.content)
    noteContainer.insertBefore(noteElement,addNoteButton)
    
});

addNoteButton.addEventListener("click",()=> addnote())

function getNotes(){
return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]")
}
function saveNotes(notes){
localStorage.setItem("stickynotes-notes",JSON.stringify(notes))
}

function createNoteElement(id,content){
const element=document.createElement("textarea")

element.classList.add("note")
element.value=content
element.placeholder="Empty Sticky Note"

element.addEventListener("change",()=>{
    updateNote(id,element.value)
})

element.addEventListener("dblclick", ()=>{
    const doDelete=confirm("Are you sure you wish to delete this sticky note?")
    if(doDelete){
        deletenote(id,element)
    }
})

return element
}

function addnote(){
const notes=getNotes()
const noteObject ={
    id:Math.floor(Math.random()*100000),
    content:""
}
const noteElement=createNoteElement(noteObject.id,noteObject.content)
noteContainer.insertBefore(noteElement,addNoteButton)

notes.push(noteObject)
saveNotes(notes)
}

function updateNote(id,newContent){
const notes=getNotes()
const targetNote=notes.filter(notes=>notes.id==id)[0]

targetNote.content=newContent
saveNotes(notes)
}
function deletenote(id,element){
const notes =getNotes().filter(note=>note.id !=id)
saveNotes(notes)
noteContainer.removeChild(element)
}