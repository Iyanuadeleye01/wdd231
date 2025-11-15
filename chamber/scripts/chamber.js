const hambButton = document.querySelector("#hamb-btn");
const nav = document.querySelector("nav");

// Add event listener
hambButton.addEventListener("click", () =>{
    nav.classList.toggle("show");
});


const membersContainer = document.getElementById("membersContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// Fetch and display members
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membership}</p>
            <p>${member.description}</p>
        `;

        membersContainer.appendChild(card);
    });
}

// Toggle Grid View
gridBtn.addEventListener("click", () => {
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");
});

// Toggle List View
listBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");
});

// Load members on page load
loadMembers();
