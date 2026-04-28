let students = JSON.parse(localStorage.getItem("students")) || [];

let form = document.getElementById("studentForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let dept = document.getElementById("dept").value.trim();

    if (name === "" || roll === "" || dept === "") {
        alert("All fields are required!");
        return;
    }

    students.push({ name, roll, dept });
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    form.reset();
});

function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        let row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.dept}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });

    document.getElementById("count").innerText =
        "Total Students: " + students.length;
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function editStudent(index) {
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("dept").value = student.dept;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function searchStudent() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        let name = row.children[0].textContent.toLowerCase();
        row.style.display = name.includes(input) ? "" : "none";
    });
}

displayStudents();