const comp = document.querySelector(".comp");
const cross = document.querySelector(".cross");
const Good = document.querySelector(".good");
const fam = document.querySelector(".form")
const mark = document.querySelector(".checks")
const pass = document.querySelector(".pass")
const head = document.getElementById("head");
const complete = document.querySelector(".complete");
const moons = document.querySelector(".moons");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
const text = document.getElementById("text");
const active = document.querySelector(".active");
const dark = document.querySelector(".bgDark");
const bg = document.querySelector(".bg");
const root = document.querySelector(':root')
let darkMode = false;
    const todosToSHow = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    let tab = "all"
const previousStyle = getComputedStyle(root);
if (darkMode != true) {
    moon.addEventListener("click", function() {
        root.style.setProperty("--white", "hsl(235, 24%, 19%)")
        root.style.setProperty("--off", "white")
        root.style.setProperty("--gray", "black")
        root.style.setProperty("--shadow", "none")
        root.style.setProperty("--lite", 'url("./images/bg-desktop-dark.jpg")')
        root.style.setProperty("--blink", 'url("./images/bg-mobile-dark.jpg")')
    })
}

let lightMode = false;
if (lightMode != true) {
    sun.addEventListener("click", function() {
        root.style.setProperty("--white", "white")
        root.style.setProperty("--black", "hsl(0, 0%, 98%)")
        root.style.setProperty("--off", "off")
        root.style.setProperty("--gray", "hsl(0, 0%, 98%)")
        root.style.setProperty("--shadow", "0 15px 50px 0px hsl(236, 33%, 92%)")
        root.style.setProperty("--lite", 'url("./images/bg-desktop-light.jpg")')
        root.style.setProperty("--blink", 'url("./images/bg-desktop-light.jpg")')
    })
}

moons.addEventListener('click', () => {
    sun.classList.toggle("long")
    moon.classList.toggle("sun")
})


const showAllTodo = () => {
    const all = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    let data = tab === "all" ? all : tab === "active" ? all.filter(todo => todo.completed === false) : all.filter(todo => todo.completed === true)
    document.querySelector(".call").innerHTML = ""
    data.forEach((todo) => {
        const todoComponent = document.createElement("div")
        todoComponent.innerHTML = `
        <div class="${todo.completed ? "complete" : "complete"}">
       <div class="pass">
       <div class="${todo.completed ? "checks move good" : "checks"}">
       </div>
        <p class="java ${todo.completed ? "java line" : "java"}">${todo?.name}</p>
        </div>
       <div class="${todo.completed ? "cross shows" : "cross"}">
       </div>
    </div>`

        todoComponent.addEventListener("click", () => {
            completeTodo(todo.id)

        })
        
        todoComponent.querySelector(".cross").addEventListener("click", (e) => {
            e.stopPropagation();
            todoComponent.style.display = "none";
            removeTodo(todo.id)
        })
        document.querySelector(".call").appendChild(todoComponent)

    })
    const completed = data.filter((todo) => todo.completed === true)
    const remaining = document.createElement("div")
    remaining.innerHTML = `<div class="active">
            <p class="items">${data.length - completed.length} items left</p>
            <div class="add">
                <button class="alls" onclick="showAll()">All</button>
                <button class="actives" onclick="showActive()">Active</button>
                <button class="completeds" onclick="showCompleted()">Completed</button>
            </div>
            <button class="all">Clear Completed</button>

        </div>`
    document.querySelector(".call").appendChild(remaining)
}

showAllTodo()

const completeTodo = (id) => {
    const data = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    const index = data.findIndex((todo) => todo.id === id)
    data[index].completed = !data[index].completed
    localStorage.setItem("todos", JSON.stringify(data))

    showAllTodo()
}

const addTodo = (value) => {
    let allTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    const newTodo = {
        id: Math.random(),
        name: value,
        completed: false
    }
    allTodos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(allTodos))
    showAllTodo()
}

const removeTodo = (id) => {
    const data = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    const modifiedData = data.filter((todo) => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(modifiedData))
    showAllTodo()
}



let form = document.getElementById("form");
let input = document.getElementById("text")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (input.value.length == 0) {
        return ""
    } else {
        addTodo(input.value)
        input.value = ""
    }



})


const showActive = () => {
    data = JSON.parse(localStorage.getItem("todos")) || []
    const uncompleted = data.filter((todo) => todo.completed === false)

    tab = "active"
    showAllTodo()
}

const showCompleted = () => {

    data = JSON.parse(localStorage.getItem("todos")) || []
    const completed = data.filter((todo) => todo.completed === true)

    tab = "completed"
    showAllTodo()
}

const showAll = () => {
    data = JSON.parse(localStorage.getItem("todos")) || []

    tab = "all"
    showAllTodo()
}

