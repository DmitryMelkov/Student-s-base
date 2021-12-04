window.addEventListener("DOMContentLoaded", function () {
  let input = document.querySelectorAll(".panel__item-input");
  let buttonClear = document.getElementById("clearBtn");

  //очистка полей
  buttonClear.addEventListener("click", () => {
    input.forEach((input) => (input.value = ""));
  });

  //массив студента
  let studentsArr = [
    {
      firstName: "Dmitry",
      middleName: "Alexandrovich",
      lastName: "Melkov",
      fio: "Dmitry Alexandrovich Melkov",
      birthday: new Date("1993-05-14"),
      yearEntry: 2011,
      faculty: "Chemical-technological",
      numberPhone: "+7-999-456-32-87",
    },
    {
      firstName: "Alexandr",
      middleName: "Dmitrievich",
      lastName: "Gorbunov",
      fio: "Alexandr Dmitrievich Gorbunov",
      birthday: new Date("1992-05-19"),
      yearEntry: 2010,
      faculty: "Chemical-technological",
      numberPhone: "+7-999-469-82-97",
    },
    {
      firstName: "Ivan",
      middleName: "Ivanovich",
      lastName: "Ivanov",
      fio: "Ivan Ivanovich Ivanov",
      birthday: new Date("1997-09-10"),
      yearEntry: 2015,
      faculty: "Chemical-technological",
      numberPhone: "+7-999-456-32-87",
    },
    {
      firstName: "Egor",
      middleName: "Petrovich",
      lastName: "Sokolov",
      fio: "Egor Petrovich Sokolov",
      birthday: new Date("1995-08-11"),
      yearEntry: 2013,
      faculty: "Chemical-technological",
      numberPhone: "+7-992-256-32-78",
    },
  ];

  //создание tr
  function createStudTr(student) {
    //создаем tr
    let elRowTR = document.createElement("tr");

    let elRowH = document.createElement("th");
    elRowH.setAttribute("scope", "row");
    elRowH.classList.add("id");
    elRowTR.append(elRowH);

    let elRowTD = document.createElement("td");
    elRowTD.classList.add("td");
    elRowTD.textContent = student.firstName + " " + student.middleName + " " + student.lastName;
    elRowTR.append(elRowTD);

    elRowTD = document.createElement("td");
    elRowTD.classList.add("td");
    elRowTD.textContent = student.faculty;
    elRowTR.append(elRowTD);

    elRowTD = document.createElement("td");
    elRowTD.classList.add("td");
    elRowTD.textContent = student.birthday;
    elRowTR.append(elRowTD);

    elRowTD = document.createElement("td");
    elRowTD.classList.add("td");
    elRowTD.textContent = student.yearEntry;
    elRowTR.append(elRowTD);

    elRowTD = document.createElement("td");
    elRowTD.classList.add("td");
    elRowTD.textContent = student.numberPhone;
    elRowTR.append(elRowTD);

    return elRowTR;
  }

  let tbody = document.getElementById("listStudents");

  function render() {
    let copyStudentsArr = [...studentsArr];

    tbody.innerHTML = "";

    for (let student of copyStudentsArr) {
      let newTr = createStudTr(student);
      newTr.classList.add("tr");
      tbody.append(newTr);
    }
  }

  render();


  function sortStudents(studentsArr, column, dir = true) {
    let result = studentsArr.sort(function (a, b) {
      let direction = a[column] < b[column];
      if (dir == true) {
        direction = a[column] > b[column];
      }

      if (direction == true) return -1;
    });

    return result;
  }

  //по году поступления
  console.log(sortStudents(studentsArr, "firstName"));
});
