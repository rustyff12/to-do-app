import Projects from "./todo-logic.js";
import "../css/styles.css";

const menuButton = document.querySelector("#menu-btn");
const addButton = document.querySelector("#add-project");
const cancelButton = document.querySelector("#cancel-btn");

let nextKey = 1;
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
