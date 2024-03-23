export function get(selector) {
    return document.querySelector(selector);
}

export function set(parent, child) {
    parent.appendChild(child);
}

export function create(element){
    return document.createElement(element)
}

export function addClickListener(key, fn){
    if(typeof key == "string")
        get(key).addEventListener("click", fn);
    else
        document.addEventListener("keydown", 
            function(event) { 
                if (event.keyCode === key) 
                    fn();
        });
}

Array.prototype.newPop = function(index){
    if(index == undefined)
        index = this.length - 1

    let item = this[index];
    this.splice(index, 1);
    return item;
}

String.prototype.capitalize = function (){
    let text = new String();
    
    for(let word of this.split(' '))
        text.add(word ? ' ' + word.title() : ' ');

    return text;
}

String.prototype.title = function (){
    return this[0].toUpperCase() + this.slice(1).toLowerCase();
} 