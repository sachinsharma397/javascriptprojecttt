// Array to store student records
let students = [];

// Load data from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
        students = JSON.parse(storedStudents);
        renderStudents();
    }
});

// Function to add a new student
document.getElementById("student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //  form values
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("student-id").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;

    // Validate inputs
    if (!name || !studentId || !email || !contact) {

        alert("Please fill in all fields.");
        return;
    }

    // Add student to array
    const newStudent = { name, studentId, email, contact };
    students.push(newStudent);

    // Save to local storage
    localStorage.setItem("students", JSON.stringify(students));

    // Render  updated list
    renderStudents();

    // Clear the form
    document.getElementById("student-form").reset();
});

// Function to render students in table
function renderStudents() {
    const tbody = document.querySelector("#student-table tbody");
    tbody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Function to delete  student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    }
}

// Function to edit student
function editStudent(index) {
    const student = students[index];

    // Populate the form with the student's details
    document.getElementById("name").value = student.name;
    document.getElementById("student-id").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    // Remove the student from  array
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
}