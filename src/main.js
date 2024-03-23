import { addClickListener, create, get, set } from "./domApi";

class ItemGenerator {
    createItem(text, index) {
        const listItem = create("li");
        listItem.textContent = text.title();
        
        listItem.classList.add("list-item");
        this.#addButtons(listItem, index);
        
        return listItem;
    }
    
    #addButtons(element, index){
        const div = create("div");
        div.classList.add("btn-group");
        this.#addCompleteBtn(div, index);
        this.#addDeleteBtn(div, index);
        element.appendChild(div);
    }
    
    #addDeleteBtn(element, index) {
        const btn = create("button");
        btn.textContent = "Delete";
        btn.id = `element${index}`;
        btn.classList.add("btn-danger");
    
        btn.addEventListener("click", this.#removeItem);
    
        element.appendChild(btn);
    }
    
    #addCompleteBtn(element, index) {
        const btn = create("button");
        btn.textContent = toDoList[index].isCompleted ? "Return" : "Complete";
        btn.id = `complement${index}`;
        btn.classList.add("btn-success")
    
        btn.addEventListener("click", () => this.#toggleComplete(index));
    
        element.appendChild(btn);
    }
    
    #removeItem(index) {
        if(!confirm("Are you sure you want to do this?"))
                return;
    
        toDoList.splice(index, 1);
        renderToDos();
    }

    #toggleComplete(index) {
        toDoList[index].isCompleted = !toDoList[index].isCompleted;
        toDoList.push(toDoList.newPop(index));
        renderToDos();
    }
}

let toDoList = [];
let api = new ItemGenerator();

function renderToDos() {
    const activeList = get("#toDo-active");
    const completedList = get("#toDo-completed");

    activeList.innerHTML = "";
    completedList.innerHTML = "";

    toDoList.forEach((element, index) => {
        const item = api.createItem(element.text, index);
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

renderToDos();

addClickListener("#add-btn", addNewItem);
addClickListener(13, addNewItem);
