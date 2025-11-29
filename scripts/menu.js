const hamBtn = document.querySelector("#ham-btn");
const nav = document.querySelector("nav");

hamBtn.addEventListener("click", ()=>{
nav.classList.toggle("show")
});


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// DOM elements
const container = document.querySelector("#course-cards");
const creditOutput = document.querySelector("#credit-total");

//Funtion
function displayCourses(list){
    container.innerHTML = "";

    list.forEach(course => {
      const card = document.createElement("div");
      card.classList.add("course");
      
      if (course.completed) {
        card.classList.add("completed");
      }

      card.innerHTML = `<h3>${course.subject} ${course.number}</h3>
                        <p>${course.title}</p>
                        <p>Credits: ${course.credits}</p>`;

                        // Add CourseDiv
                         card.addEventListener("click", () => {
                        displayCourseDetails(course);
        });

        container.appendChild(card);
    });

    // Calculate credit total
    const totalCredits = list.reduce((sum, item) =>sum + item.credits, 0);
    creditOutput.textContent = `Total Credits: ${totalCredits}`;
}

// Initial display
displayCourses(courses);

// Filter Buttons
document.querySelector("#all").addEventListener("click", () =>{
    displayCourses(courses);
});

document.querySelector("#cse").addEventListener("click", () =>{
    const filtered = courses.filter(c => c.subject === "CSE");
    displayCourses(filtered);
});

document.querySelector("#wdd").addEventListener("click", () =>{
    const filtered = courses.filter(c => c.subject === "WDD");
    displayCourses(filtered);
});

// To dynamically display time
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastmodified").textContent = "Lastmodified: " + document.lastModified;

// Dialog
const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course){
    courseDetails.innerHTML = "";
    courseDetails.innerHTML = `
    <button id="closeModal">X</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(',')}</p>`;
    // Open dialog 
    courseDetails.showModal();

    
    // Select the close button after it exists in the DOM
    const closeModal = document.querySelector("#closeModal");

    // Add the close functionality
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });

};


