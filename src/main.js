let toDoList = [];

function renderToDos() {
    const activeList = get("#toDo-active");
    const completedList = get("#toDo-completed");

    activeList.innerHTML = "";
    completedList.innerHTML = "";

    toDoList.forEach((element, index) => {
        const item = createItem(element.text, index);
        set(element.isCompleted ? completedList : activeList, item);
    });
}

function addNewItem() {
    const inp = get("#inToDo");
    let text = inp.value.trim();
    
    if(text)
        toDoList.push({
            text: text,
            isCompleted: false,
        });

    inp.value = '';

    renderToDos();
}

function createItem(text, index) {
    const listItem = create("li");
    listItem.textContent = text.title();
    
    listItem.classList.add("list-item");
    addButtons(listItem, index);
    
    return listItem;
}

function addButtons(element, index){
    const div = create("div");
    div.classList.add("btn-group");
    addCompleteBtn(div, index);
    addDeleteBtn(div, index);
    element.appendChild(div);
}

function addDeleteBtn(element, index) {
    const btn = create("button");
    btn.textContent = "Delete";
    btn.id = `element${index}`;
    btn.classList.add("btn-danger");

    btn.addEventListener("click", () => {
        if(!confirm("Are you sure you want to do this?"))
            return;

        toDoList.splice(index, 1);
        renderToDos();
    });

    element.appendChild(btn);
}

function addCompleteBtn(element, index) {
    const btn = create("button");
    btn.textContent = toDoList[index].isCompleted ? "Return" : "Completed";
    btn.id = `complement${index}`;
    btn.classList.add("btn-success")

    btn.addEventListener("click", () => toggleComplete(index));

    element.appendChild(btn);
}

function toggleComplete(index) {
    toDoList[index].isCompleted = !toDoList[index].isCompleted;
    toDoList.push(toDoList.newPop(index));
    renderToDos();
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13)
        addNewItem();
});

const btn = get("#add-btn");
btn.addEventListener("click", addNewItem);

renderToDos();













// Another module

function get(selector) {
    return document.querySelector(selector);
}

function set(parent, child) {
    parent.appendChild(child);
}

function create(element){
    return document.createElement(element)
}

Array.prototype.newPop = function(index){
    let item = this[index];
    this.splice(index, 1);
    return item;
}

String.prototype.capitalize = function (){
    let text = new String();

    for(let word of this.split(' '))
        text += word ? ' ' + word.title() : ' ';

    return text;
}

String.prototype.title = function (){
    return this[0].toUpperCase() + this.slice(1).toLowerCase();
}