function Student(id, name, semesters) {
    this.id = id;
    this.name = name;
    this.semesters = semesters;
  }

  const marksSection = document.getElementById("marksSection");

  for (let s = 1; s <= 5; s++) {
    let div = document.createElement("div");
    div.className = "semester";
    div.innerHTML = `<strong>Semester ${s}</strong><br>`;

    for (let sub = 1; sub <= 5; sub++) {
      div.innerHTML += `
        <input type="number" min="0" max="100" class="mark s${s}" placeholder="S${sub}">
      `;
    }

    marksSection.appendChild(div);
  }

  function getGrade(p) {
    if (p >= 80) return "A+";
    if (p >= 70) return "A";
    if (p >= 60) return "B";
    if (p >= 50) return "C";
    return "Fail";
  }

  function generateReport() {
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;

    let semesters = [];
    let obtained = 0;
    let total = 0;

    for (let s = 1; s <= 5; s++) {
      let semesterMarks = [];
      let inputs = document.querySelectorAll(`.s${s}`);

      inputs.forEach(input => {
        let mark = Number(input.value || 0);
        semesterMarks.push(mark);
        obtained += mark;
        total += 100;
      });

      semesters.push(semesterMarks);
    }

    const student = new Student(id, name, semesters);
    const percentage = (obtained / total) * 100;
    const grade = getGrade(percentage);

    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = `
      <h3>📄 Report Card</h3>
      <p><span class="highlight">Name:</span> ${student.name}</p>
      <p><span class="highlight">ID:</span> ${student.id}</p>
      <p><span class="highlight">Obtained Marks:</span> ${obtained}</p>
      <p><span class="highlight">Total Marks:</span> ${total}</p>
      <p><span class="highlight">Percentage:</span> ${percentage.toFixed(2)}%</p>
      <p class="grade ${grade === 'Fail' ? 'fail' : ''}">
        Grade: ${grade}
      </p>
    `;
  }