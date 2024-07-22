const menuButton = document.querySelector("#menu-btn");
const addButton = document.querySelector("#add-project");

menuButton.addEventListener("click", () => {
    const navContainer = document.querySelector(".nav-container");
    if (navContainer.classList.contains("active")) {
        navContainer.classList.remove("active");
    } else {
        navContainer.classList.add("active");
    }
});

addButton.addEventListener("click", (e) => {
    console.log(e.target);
});
