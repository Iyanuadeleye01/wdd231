// Hamburger Menu
const hambButton = document.querySelector("#hamb-btn");
const nav = document.querySelector("nav");

// Add event listener
hambButton.addEventListener("click", () =>{
    nav.classList.toggle("show");
});


document.getElementById("timestamp").value = new Date().toISOString();

//Open dialogs
document.querySelectorAll("[data-dialog]").forEach(button =>{
    button.addEventListener("click", e => {
        const dialogId = e.target.getAttribute("data-dialog");
        document.getElementById(dialogId).showModal();
    });
});

//Close dialog
document.querySelectorAll(".close-dialog").forEach(button => {
    button.addEventListener("click", e => {
        e.target.closest("dialog").close();
    });
});