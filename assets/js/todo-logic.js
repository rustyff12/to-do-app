import DOMPurify from "dompurify";

export default class Projects {
    constructor(title, description, priority, date, key) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date;
        this.key = key;
    }

    render() {
        const projectUl = document.querySelector(".projects-container > ul");
        const newTask = document.createElement("li");
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

    getDate() {
        const weekDayArr = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const monthArr = [
            "Jan",
            "Feb",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const date = new Date();
        const weekDay = date.getDay();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${weekDayArr[weekDay]}, ${day} ${monthArr[month]}, ${year}`;
    }
}
