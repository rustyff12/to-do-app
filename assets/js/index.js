import Projects from "./todo-logic.js";
import "../css/styles.css";

const menuButton = document.querySelector("#menu-btn");
const addButton = document.querySelector("#add-project");
const cancelButton = document.querySelector("#cancel-btn");
const form = document.querySelector("#form-data");
const projectName = document.querySelector("#title");
const add = document.querySelector("#add-new-project");

let nextKey =
    Projects.getAllProjects().length > 0
        ? Math.max(...Projects.getAllProjects().map((p) => p.key))
        : 0;

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
    navContainer.classList.toggle("active");
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
            descriptionElement.classList.toggle("expanded");
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
                        Projects.removeFromLocalStorage(
                            parseInt(projectInfo.id, 10)
                        );
                    }
                }
            }
        }
    });

const clearInput = (input) => {
    input.value = "";
    const addButton = document.querySelector("#add-new-project");
    if (input.closest(".project-item-title")) {
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
        (nextKey += 1)
    );
    newProject.render();
    newProject.saveToLocalStorage();
});

document.querySelector("#show-projects").addEventListener("click", () => {
    updateProjectList("Projects");
});
document.querySelector("#show-today").addEventListener("click", () => {
    updateProjectList("Today");
});
document.querySelector("#show-week").addEventListener("click", () => {
    updateProjectList("Week");
});

const updateProjectList = (viewType) => {
    const projectUl = document.querySelector(".projects-container > ul");
    const showProjectsButton = document.querySelector("#show-projects");
    const showTodayButton = document.querySelector("#show-today");
    const showWeekButton = document.querySelector("#show-week");

    // Clear the list
    projectUl.innerHTML = "";

    const projects = Projects.getAllProjects();
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    let filteredProjects = [];

    // Filter projects based on the viewType
    if (viewType === "Today") {
        filteredProjects = projects.filter((project) => {
            const projectDate = new Date(project.date);
            return projectDate.toDateString() === today.toDateString();
        });
        showTodayButton.classList.add("disabled-btn");
        showProjectsButton.classList.remove("disabled-btn");
        showWeekButton.classList.remove("disabled-btn");
    } else if (viewType === "Week") {
        filteredProjects = projects.filter((project) => {
            const projectDate = new Date(project.date);
            return projectDate >= sevenDaysAgo && projectDate <= today;
        });
        showWeekButton.classList.add("disabled-btn");
        showProjectsButton.classList.remove("disabled-btn");
        showTodayButton.classList.remove("disabled-btn");
    } else if (viewType === "Projects") {
        filteredProjects = projects;
        showProjectsButton.classList.add("disabled-btn");
        showTodayButton.classList.remove("disabled-btn");
        showWeekButton.classList.remove("disabled-btn");
    }

    // Ensure projects are rendered and not duplicated
    filteredProjects.forEach((projectData) => {
        const projectElement = document.getElementById(projectData.key);
        if (!projectElement) {
            const project = new Projects(
                projectData.title,
                projectData.description,
                projectData.priority,
                projectData.key
            );
            project.render();
        }
    });

    document.querySelector(".projects-container  > h2").textContent = viewType;
};
