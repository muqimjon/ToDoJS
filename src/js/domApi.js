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


export function pop(arr, index){
    if(index == undefined)
        index = arr.length - 1

    let item = arr[index];
    arr.splice(index, 1);
    return item;
}

export function capitalize(words){
    let text = new String();
    
    for(let word of words.split(' '))
        text += word ? ' ' + word.title() : '';

    return text;
}

export function title(text){
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}