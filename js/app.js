window.addEventListener("DOMContentLoaded", function () {
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
      faculty: "electrical-engineering",
      numberPhone: "+7-999-469-82-97",
    },
    {
      firstName: "Ivan",
      middleName: "Ivanovich",
      lastName: "Ivanov",
      fio: "Ivan Ivanovich Ivanov",
      birthday: new Date("1997-09-10"),
      yearEntry: 2015,
      faculty: "electrical-engineering",
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

  let columnSort = "fio";
  let dirSort = false;

  function render() {
    let copyStudentsArr = [...studentsArr];

    copyStudentsArr = sortStudents(copyStudentsArr, columnSort, dirSort);

    tbody.innerHTML = "";

    for (let student of copyStudentsArr) {
      let newTr = createStudTr(student);
      newTr.classList.add("tr");
      tbody.append(newTr);
    }
  }

  render();

  //сортировка
  document.querySelector("#fioSort").addEventListener("click", function () {
    columnSort = "fio";
    dirSort = !dirSort;
    render();
  });

  document.querySelector("#facultySort").addEventListener("click", function () {
    columnSort = "faculty";
    dirSort = !dirSort;
    render();
  });

  document.querySelector("#birthdaySort").addEventListener("click", function () {
    columnSort = "birthday";
    dirSort = !dirSort;
    render();
  });

  document.querySelector("#yearEntrySort").addEventListener("click", function () {
    columnSort = "yearEntry";
    dirSort = !dirSort;
    render();
  });

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

  //установка ильтров
  let applyBtnFilter = document.querySelector("#applyBtn");

  //получаем инпуты 1ый вариант
  let fioFilterInput = document.querySelector("#fioFilter");
  let birthdayFilterInput = document.querySelector("#birthdayFilter");
  let facultyFilterInput = document.querySelector("#facultyFilter");
  let yearEntryFilter = document.querySelector("#yearEntryFilter");

  let inputValue;

  applyBtnFilter.addEventListener("click", function (e) {
    e.preventDefault();
    inputValue = yearEntryFilter.value;

    filterStudents();
  });

  function filterStudents() {
    let result = studentsArr.filter(function (item) {
      return item.yearEntry == inputValue;
    });
    console.log(result);
  }


  

  //получаем инпуты 2ой вариант
  const getFilterElements = () => {
    let groupInputFilters = document.getElementById("panelFilters");
    return groupInputFilters.getElementsByTagName("input");
  };

  let currentFilters = [];

  const applyFilterFio = (value) => {
    studentsArr = studentsArr.filter(
      (e) => e.firstName.includes(value) || e.middleName.includes(value) || e.lastName.includes(value)
    );
  };

  const applyFilterFaculty = (value) => {
    studentsArr = studentsArr.filter((e) => e.faculty.includes(value));
  };

  const applyFilterYearEntry = (value) => {
    studentsArr = studentsArr.filter((e) => e.yearEntry === value);
  };

  const applyFilterBirthday = (value) => {
    studentsArr = studentsArr.filter((e) => e.birthday === value);
  };

  let applyCurrentFilters = function () {
    for (let el of currentFilters) {
      if (el.name === "fio") {
        applyFilterFio(el.value);
      } else if (el.name === "faculty") {
        applyFilterFaculty(el.value);
      } else if (el.name === "yearEntry") {
        applyFilterYearEntry(el.value);
      } else if (el.name === "birthday") {
        applyFilterBirthday(el.value);
      }
    }
  };


  const cleanFilters = () => {
    let arrayInputFilters = getFilterElements();
    currentFilters.length = 0;

    for (let el of arrayInputFilters) {
      if (el.type === "number") {
        el.value = null;
      } else {
        el.value = "";
      }
    }
  };

  //очистка фильтров
  let buttonClearFilters = document.querySelector("#clearBtn");

  buttonClearFilters.addEventListener("click", (e) => {
    e.preventDefault();
    cleanFilters();
  });
});
