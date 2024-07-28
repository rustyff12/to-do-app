import DOMPurify from "dompurify";

export default class Projects {
    constructor(title, description, priority, key) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = this.getDate();
        this.key = key;
    }

    render() {
        const projectUl = document.querySelector(".projects-container > ul");

        if (document.getElementById(this.key)) return;

        const newTask = document.createElement("li");
        newTask.classList.add("project-list-item");
        newTask.id = this.key;
        // Sanitize user input
        const sanitizedTitle = DOMPurify.sanitize(this.title);
        const sanitizedDescription = DOMPurify.sanitize(this.description);

        newTask.innerHTML = `

            <div class="project-info" id=${this.key}>
                <button class="project-info-details">
                    <i class="fa-solid fa-list-check"></i>
                </button>
                <p class="project-title">${sanitizedTitle}</p>
                <p class="project-description">${sanitizedDescription}</p>
                <p class="project-date">${this.date}</p>
                <button class="project-info-close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

    `;
        projectUl.append(newTask);

        if (this.priority !== "undefined") {
            const addPriority = document.getElementById(this.key);
            addPriority.classList.add("priority");
        }
    }

    saveToLocalStorage() {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const existingIndex = projects.findIndex(
            (project) => project.key === this.key
        );

        if (existingIndex >= 0) {
            projects[existingIndex] = {
                title: this.title,
                description: this.description,
                priority: this.priority,
                date: this.date,
                key: this.key,
            };
        } else {
            projects.push({
                title: this.title,
                description: this.description,
                priority: this.priority,
                date: this.date,
                key: this.key,
            });
        }

        localStorage.setItem("projects", JSON.stringify(projects));
    }

    static removeFromLocalStorage(key) {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects = projects.filter((project) => project.key !== key);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    static getAllProjects() {
        return JSON.parse(localStorage.getItem("projects")) || [];
    }

    getDate() {
        const date = new Date();
        return date.toISOString().split("T")[0];
    }
}
