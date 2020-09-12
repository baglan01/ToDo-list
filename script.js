let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add');
    todo = document.querySelector('.todo');
let todolist = [] ;
if (localStorage.getItem('todo')){
    todolist = JSON.parse(localStorage.getItem('todo'));
    displayMessades();
}
addButton.addEventListener('click' , function() {
    let newTodo = {
        todo : addMessage.value,
        checked: false,
        important : false
    };
    todolist.push(newTodo);
    displayMessades()
    localStorage.setItem('todo' , JSON.stringify(todolist));
})
    function displayMessades(){
        let displayMessage = ''
            todolist.forEach(function(item , i){
            displayMessage += `
            <li>
                <input type = 'checkbox' id ='item_${i}' ${item.checked ? 'checked' : '' } >
                <label for='item_${i}' >${item.todo}</label>
            </li>
            `;
            todo.innerHTML = displayMessage;
        });
    }

todo.addEventListener('change' , function (event){
   let idinput = event.target.getAttribute('id');
   let forlabel = todo.querySelector('[for=' + idinput + ']');
   let valuelabel = forlabel.innerHTML;

   todolist.forEach(function (item){
        if(item.todo == valuelabel){
            item.checked = !item.checked;
            localStorage.setItem('todo' , JSON.stringify(todolist));
        }
   });
   console.log(forlabel);
});

todo.addEventListener('contextmenu' , function (event) {
    event.preventDefault();
    todolist.forEach(function (item , i) {
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey || event.metaKey){
                todolist.splice(i,1);
            }else{
                item.important = !item.important;
            }
            displayMessades();
            localStorage.setItem('todo' , JSON.stringify(todolist));
        }
    });
});