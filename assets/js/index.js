import Projects from "./todo-logic.js";
import "../css/styles.css";

const menuButton = document.querySelector("#menu-btn");
const addButton = document.querySelector("#add-project");
const cancelButton = document.querySelector("#cancel-btn");
const form = document.querySelector("#form-data");
const projectName = document.querySelector("#title");
const add = document.querySelector("#add-new-project");

let nextKey = Number(document.querySelector(".project-info").id) || 1;

projectName.addEventListener("change", (e) => {
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
    const titleInput = document.querySelector(".project-item-title > input");
    const titleDescription = document.querySelector(
        ".project-item-description > input"
    );
    const priorityInput = document.querySelector("#priority");

    priorityInput.checked = false;
    titleInput.value = "";
    titleDescription.value = "";

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

const clearInput = (input) => {
    input.value = "";
    const addButton = document.querySelector("#add-new-project");
    if (input.closest(".project-item-title")) {
        console.log("here");
        addButton.classList.add("disabled-btn");
    }
};

const uncheckedPriority = () => {
    const priorityInput = document.querySelector("#priority");
    priorityInput.checked = false;
};

form.addEventListener("click", (e) => {
    const closeButton = e.target.closest(".close-btn");
    if (!closeButton) return;

    const projectItem = closeButton.closest(".project-item");
    const projectPriority = closeButton.closest(".project-item-priority");

    if (projectItem) {
        const inputValue = projectItem.querySelector("input");
        if (inputValue) {
            clearInput(inputValue);
        }
    } else if (projectPriority) {
        uncheckedPriority();
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

    const newProject = new Projects(
        `${title}`,
        `${description}`,
        `${priority}`,
        "",
        (nextKey += 1)
    );
    newProject.render();
});
