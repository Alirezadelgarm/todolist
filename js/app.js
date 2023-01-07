let $ = document
const inputElem = $.getElementById('itemInput')
const addButton = $.getElementById('addButton')
const clearButton = $.getElementById('clearButton')
const todoListElem = $.getElementById('todoList')

let todosArray = []

function addNewTodo() {
    let newTodoTitle = inputElem.value
    if(newTodoTitle){

        let newTodoObj = {
            id: todosArray.length + 1,
            title: newTodoTitle,
            complete: false
        }
    
        inputElem.value = ''
    
        todosArray.push(newTodoObj)
        setLocalStorage(todosArray)
        todosGenerator(todosArray)
    
        inputElem.focus()
        inputElem.nextElementSibling.innerHTML=""
    }else{
        inputElem.nextElementSibling.innerHTML="please enter something "
        inputElem.nextElementSibling.style.color="red"
        inputElem.focus()

    }
}
// setdata in localstorage
function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}
// create element dom
const todosGenerator=(todoList)=>{
    todoListElem.innerHTML=""
    todoList.forEach((todo)=>{
        todoListElem.innerHTML+=`
        <li id="li" class="completed well">
            <label>${todo.title}</label>
            <button id="completeBtn" class="btn btn-success" onclick="editTodo(${todo.id})">Complete</button>
            <button class="btn btn-danger" onclick="removeTodo(${todo.id})">Delete</button>
        </li>`
        if(todo.complete){
         const liElem=$.querySelectorAll("#li")
         const completeBtn=$.querySelectorAll("#completeBtn")
        liElem[todo.id -1].className="uncompleted well"
        liElem[todo.id -1].style.backgroundColor="silver"
        completeBtn[todo.id -1].innerHTML="UnComplete"
        
     }
    })
}
// completeBtn
function editTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    todosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })

    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}
// removeBtn remove selected todo from dom & localstorage
function removeTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
    })

    todosArray.splice(mainTodoIndex, 1)

    setLocalStorage(todosArray)
    todosGenerator(todosArray)

}
// get data from localStorage
function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }

    todosGenerator(todosArray)
    inputElem.focus()
}
// clear all todos from dom & localstorage 
function clearTodos() {
    todosArray = []
    todosGenerator(todosArray)
    // localStorage.clear()
    localStorage.removeItem('todos')
    inputElem.focus()
}


window.addEventListener('load', getLocalStorage)
addButton.addEventListener('click', addNewTodo)
clearButton.addEventListener('click', clearTodos)
inputElem.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addNewTodo()
    }
})