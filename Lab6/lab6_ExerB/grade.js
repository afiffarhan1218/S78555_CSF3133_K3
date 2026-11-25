// =========================================================================
// ERROR LOG (Part 1 - Debugging)
// =========================================================================
// Error 1 (grade.html, Line 9): onsubmit="checkMark()" lacked 'return', causing the form to reload and wipe the result immediately. Changed to onsubmit="return checkMark()".
// Error 2 (grade.html, Line 17): onclick="showtable()" had incorrect lowercase 't'. Changed to onclick="showTable()".
// Error 3 (grade.html, Line 19): <script src="grades.js"> pointed to a non-existent file. Changed to <script src="grade.js">.
// Error 4 (grade.js, Line 2 & 3): Missing assignment operators '=' when declaring 'name' and 'mark'. Added '='.
// Error 5 (grade.js, Line 3): Mismatched bracket '["mark")' instead of '["mark"]'. Fixed closing bracket.
// Error 6 (grade.js, Line 4): Used single '=' (assignment) instead of '===' (comparison) in if (name = ""), which wiped the name input. Changed to name.trim() === "".
// Error 7 (grade.js, Line 7): Typo 'isNan(mark)' instead of 'isNaN(mark)', plus the alert and parseInt blocks were misplaced after the range check. Fixed casing and order.
// Error 8 (grade.js, Line 11): Used logical AND '&&' in (mark < 0 && mark > 100), which is impossible. Changed to logical OR '||'.
// Error 9 (grade.js, Line 23 & 26): Missing closing parenthesis ')' on line 23 and missing '=' on line 26 (grade "F";). Fixed syntax.
// Error 10 (grade.js, Line 28 & 29): Typo 'getElementByID' (capital D) and unquoted strings 'got grade'. Fixed to getElementById and quoted strings.
// Error 11 (grade.js, Line 30): British spelling 'style.colour' instead of 'style.color'. Changed to style.color.
// Error 12 (grade.js, Line 31): Returned 'true' on valid submission, causing page refresh. Changed to 'return false;' so the result stays on screen.
// Error 13 (grade.js, Line 38): Loop started at 'let i = 1', skipping index 0 ("A"). Changed to 'let i = 0'.
// Error 14 (grade.js, Line 40): 'tableHTML += "</table>";' was placed inside the loop instead of after it. Moved outside the loop.
// Error 15 (grade.js, Line 42): Typo '.innerHtml' instead of '.innerHTML'. Fixed casing.
// =========================================================================

// Validates input, calculates grade, applies grade color, and logs timestamp
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Validate non-empty name
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2 (Step 5): Validate non-empty mark
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate numeric mark
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark to number and validate range (0-100)
    mark = Number(mark);
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and Part 2 (Step 6) grade-specific color
    let grade;
    let gradeColor;

    if (mark >= 80) {
        grade = "A";
        gradeColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        gradeColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        gradeColor = "orange";
    } else {
        grade = "F";
        gradeColor = "red";
    }

    // Display result with dynamic color
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = gradeColor;

    // Part 2 (Step 8): Display date and time checked
    document.getElementById("checkedTime").innerHTML = "Checked on: " + new Date();

    // Prevent form submission reload so output remains visible
    return false;
}

// Part 2 (Step 7): Generates a random whole number from 0 to 100 into the mark field
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Builds and displays the full grade reference table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}