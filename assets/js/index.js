import Projects from "./todo-logic.js";
import "../css/styles.css";

const menuButton = document.querySelector("#menu-btn");
const addButton = document.querySelector("#add-project");
const cancelButton = document.querySelector("#cancel-btn");
const form = document.querySelector("#form-data");
const projectName = document.querySelector("#title");

let nextKey = 1;

projectName.addEventListener("change", (e) => {
    const add = document.querySelector("#add-new-project");
    const inputText = e.target.value;
    if (inputText !== "") {
        add.classList.remove("disabled-btn");
    } else {
        add.classList.add("disabled-btn");
    }
});

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

document
    .querySelector(".projects-container > ul")
    .addEventListener("click", (e) => {
        // description
        if (
            e.target.classList.contains("project-description") ||
            e.target.closest(".project-description")
        ) {
            const descriptionElement = e.target.closest(".project-description");
            if (descriptionElement.classList.contains("expanded")) {
                descriptionElement.classList.remove("expanded");
            } else {
                descriptionElement.classList.add("expanded");
            }
        }

        // remove project
        if (
            e.target.classList.contains("project-info-close") ||
            e.target.closest(".project-info-close")
        ) {
            const closeButton = e.target.closest(".project-info-close");
            if (closeButton) {
                const projectInfo = closeButton.closest(".project-info");
                if (projectInfo) {
                    const projectItem = projectInfo.closest("li");
                    if (projectItem) {
                        projectItem.remove();
                    }
                }
            }
        }
    });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let title;
    let description;
    let priority;
    for (const entry of data.entries()) {
        if (entry[0] === "title") {
            title = entry[1];
        } else if (entry[0] === "description") {
            description = entry[1];
        } else if (entry[0] === "priority") {
            priority = entry[1];
        }
    }
    console.log(
        `Title: ${title}, Description: ${description}, Priority ${priority}`
    );
    const newProject = new Projects(
        `${title}`,
        `${description}`,
        `${priority}`,
        "",
        (nextKey += 1)
    );
    newProject.render();
});

/* const project1 = new Projects(
    "This",
    "is an example of a project where it has a long description, is an example of a project where it has a long description",
    "a",
    "project",
    (nextKey += 1)
); */
/* const project2 = new Projects(
    "This",
    "is an example of a project where it has a long description, is an example of a project where it has a long description",
    "a",
    "project",
    (nextKey += 1)
); */
/* project1.render();
project2.render(); */

/*
const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector()
    console.log(``);
    const key = nextKey + 1;
    const newProject = new Projects(title, description, "", "", key);
    newProject.render();
*/
