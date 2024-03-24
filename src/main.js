class ItemGenerator {
    createItem(text, index) {
        const listItem = create("li");
        listItem.textContent = title(text);
        
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
    
        btn.addEventListener("click", () => this.#removeItem(index));
        element.appendChild(btn);
    }
    
    #addCompleteBtn(element, index) {
        const btn = create("button");
        btn.textContent = toDoList[index].isCompleted ? "Return" : "Complete";
        btn.id = `complement${index}`;
        btn.classList.add("btn-success");
    
        btn.addEventListener("click", () => this.#toggleComplete(index));
    
        element.appendChild(btn);
    }
    
    #removeItem(index) {
        if(!confirm("Are you sure you want to do this?"))
            return;
    
        toDoList.splice(index, 1);
        storage.save('toDo', toDoList);
        renderToDos();
    }

    #toggleComplete(index) {
        toDoList[index].isCompleted = !toDoList[index].isCompleted;
        storage.save('toDo', toDoList);
        renderToDos();
    }
}

class Memory {
    retrieve(key) {
        return this.#restore(localStorage.getItem(key));
    }

    save(key, data) {
        localStorage.setItem(key, this.#toString(data));
    }

    #restore(text) {
        return JSON.parse(text)
    }

    #toString(obj) {
        return JSON.stringify(obj);
    }
}

let storage = new Memory();
let toDoList = storage.retrieve('toDo') || [];
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
    {
        toDoList.push({
            text: text,
            isCompleted: false,
        });

        storage.save('toDo', toDoList);
    }

    inp.value = '';

    renderToDos();
}

renderToDos();

addClickListener("#add-btn", addNewItem);
addClickListener(13, addNewItem);


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

function addClickListener(key, fn){
    if(typeof key == "string")
        get(key).addEventListener("click", fn);
    else
        document.addEventListener("keydown", 
            function(event) { 
                if (event.keyCode === key) 
                    fn();
        });
}


function pop(arr, index){
    if(index == undefined)
        index = arr.length - 1

    let item = arr[index];
    arr.splice(index, 1);
    return item;
}

function capitalize(words){
    let text = new String();
    
    for(let word of words.split(' '))
        text += word ? ' ' + word.title() : '';

    return text;
}

function title(text){
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}