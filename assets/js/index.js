import Projects from "./todo-logic.js";

const menuButton = document.querySelector("#menu-btn");
const addButton = document.querySelector("#add-project");
const cancelButton = document.querySelector("#cancel-btn");

menuButton.addEventListener("click", () => {
    const navContainer = document.querySelector(".nav-container");
    if (navContainer.classList.contains("active")) {
        navContainer.classList.remove("active");
    } else {
        navContainer.classList.add("active");
    }
});

addButton.addEventListener("click", () => {
    const newProjectContainer = document.querySelector(
        ".new-project-container"
    );
    newProjectContainer.classList.add("active");
    addButton.classList.add("hidden");
});

cancelButton.addEventListener("click", () => {
    const newProjectContainer = document.querySelector(
        ".new-project-container"
    );
    newProjectContainer.classList.remove("active");
    addButton.classList.remove("hidden");
});

const project1 = new Projects("This", "is", "a", "project");

/* const populateDefault = () => {
    const projectDiv = document.querySelector(".project-info")
}
 */
