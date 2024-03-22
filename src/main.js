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
    listItem.textContent = text;

    addCompleteBtn(listItem, index);
    addDeleteBtn(listItem, index);
    
    return listItem;
}

function addDeleteBtn(element, index) {
    const btn = create("button");
    btn.textContent = "Delete";
    btn.id = `element${index}`;

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
    btn.textContent = toDoList[index].isCompleted ? "Return" : "Complete";
    btn.id = `element${index}`;

    btn.addEventListener("click", () => toggleComplete(index));

    element.appendChild(btn);
}

function toggleComplete(index) {
    toDoList[index].isCompleted = !toDoList[index].isCompleted;
    toDoList.push(toDoList.newPop(index));
    renderToDos();
}

renderToDos();

const btn = get("#add-btn");
btn.addEventListener("click", addNewItem);













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