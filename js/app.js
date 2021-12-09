window.addEventListener("DOMContentLoaded", function () {
  //получаем инпуты
  let fioFilterInput = document.querySelector("#fioFilter");
  let birthdayFilterInput = document.querySelector("#birthdayFilter");
  let facultyFilterInput = document.querySelector("#facultyFilter");
  let yearEntryFilterInput = document.querySelector("#yearEntryFilter");

  //добавление студента
  let firstName = document.querySelector("#firstName");
  let lastName = document.querySelector("#lastName");
  let middleName = document.querySelector("#middleName");
  let birthday = document.querySelector("#birthday");
  let yearEntry = document.querySelector("#yearEntry");
  let faculty = document.querySelector("#faculty");
  let numberPhone = document.querySelector("#numberPhone");

  //массив студента
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let studentsArr = [
    {
      firstName: "Dmitry",
      middleName: "Alexandrovich",
      lastName: "Melkov",
      fio: "Dmitry Alexandrovich Melkov",
      birthday: new Date(1993, 05 - 1, 14).toLocaleString("ru", options),
      yearEntry: "2011",
      yearGraduated: "2015",
      faculty: "Chemical-technological",
      numberPhone: "+7-999-456-32-87",
    },
    {
      firstName: "Alexandr",
      middleName: "Dmitrievich",
      lastName: "Gorbunov",
      fio: "Alexandr Dmitrievich Gorbunov",
      birthday: new Date(2000, 05 - 1, 19).toLocaleString("ru", options),
      yearEntry: "2010",
      yearGraduated: "2014",
      faculty: "electrical-engineering",
      numberPhone: "+7-999-469-82-97",
    },
    {
      firstName: "Ivan",
      middleName: "Ivanovich",
      lastName: "Ivanov",
      fio: "Ivan Ivanovich Ivanov",
      birthday: new Date(1997, 09 - 1, 10).toLocaleString("ru", options),
      yearEntry: "2015",
      yearGraduated: "2019",
      faculty: "electrical-engineering",
      numberPhone: "+7-999-456-32-87",
    },
    {
      firstName: "Egor",
      middleName: "Petrovich",
      lastName: "Sokolov",
      fio: "Egor Petrovich Sokolov",
      birthday: new Date(1995, 08 - 1, 11).toLocaleString("ru", options),
      yearEntry: "2013",
      yearGraduated: "2017",
      faculty: "Chemical-technological",
      numberPhone: "+7-992-256-32-78",
    },
  ];

  //валидация
  let selector = document.querySelector("input[type='tel']");

  let im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);


  new JustValidate(".panel__new-student", {
    rules: {
      numberPhone: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
      },
      firstName: {
        required: true,
        minLength: 3,
        maxLength: 30,
      },
      lastName: {
        required: true,
        minLength: 3,
        maxLength: 30,
      },
      middleName: {
        required: true,
        minLength: 3,
        maxLength: 30,
      },
      faculty: {
        required: true,
        minLength: 3,
        maxLength: 30,
      },
      birthday: {
        required: true,
        function: function () {
          let now = new Date(); //Текущя дата
          let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
          let dob = new Date(birthday.valueAsDate); //Дата рождения
          let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
          let age; //Возраст

          //Возраст = текущий год - год рождения
          age = today.getFullYear() - dob.getFullYear();
          //Если ДР в этом году ещё предстоит, то вычитаем из age один год
          if (today < dobnow) {
            age = age - 1;
          }
          if (age >= 18) return true
        },
      },
      yearEntry: {
        required: true,
      },
    },
    messages: {
      numberPhone: {
        required: "Укажите номер телефона",
      },
      firstName: {
        required: "Укажите имя",
      },
      lastName: {
        required: "Укажите фамилию",
      },
      middleName: {
        required: "Укажите отчество",
      },
      faculty: {
        required: "Укажите факультет",
      },
      birthday: {
        function: "Вам должно быть не меньше 18",
      },
      yearEntry: {
        required: "Укажите год поступления",
      },
    },

    colorWrong: "red",


    submitHandler: function () {
      // let numberValue = number.value
      let firstNameValue = firstName.value;
      let lastNameValue = lastName.value;
      let middleNameValue = middleName.value;
      let birthdayValue = new Date(birthday.value).toLocaleString("ru", options) ;
      let yearEntryValue = yearEntry.value;
      let facultyValue = faculty.value;
      let numberPhoneValue = numberPhone.value;



      studentsArr.push({
        // number: numberValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        middleName: middleNameValue,
        fio: firstNameValue + " " + middleNameValue + " " + lastNameValue,
        birthday: birthdayValue,
        yearEntry: yearEntryValue,
        yearGraduated: Number(yearEntryValue) + 4,
        faculty: facultyValue,
        numberPhone: numberPhoneValue,
      });
      render();
    },
  });

  console.log(birthday.value)

  //создание tr
  function createStudTr(student) {
    //создаем tr
    let elRowTR = document.createElement("tr");

    let elRowH = document.createElement("th");
    elRowH.setAttribute("scope", "row");
    elRowH.classList.add("id");
    elRowH.textContent = studentsArr.indexOf(student) + 1;
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
    elRowTD.textContent = student.yearGraduated;
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

    copyStudentsArr = studFilter(copyStudentsArr);

    tbody.innerHTML = "";

    for (let student of copyStudentsArr) {
      let newTr = createStudTr(student);
      newTr.classList.add("tr");
      tbody.append(newTr);
    }
  }

  render();

  // сортировка
  document.querySelector("#number").addEventListener("click", function () {
    columnSort = "number";
    dirSort = !dirSort;
    render();
  });

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

  //Фильтрация
  fioFilterInput.addEventListener("input", render);
  birthdayFilterInput.addEventListener("input", render);
  facultyFilterInput.addEventListener("input", render);
  yearEntryFilterInput.addEventListener("input", render);

  function studFilter(arr) {
    const fioFilter = fioFilterInput.value;
    const birthdayFilter = birthdayFilterInput.value;
    const facultyFilter = facultyFilterInput.value;
    const yearEntryFilter = yearEntryFilterInput.value;

    let copyArr = [...arr];

    copyArr = copyArr.filter((e) => e.fio.includes(fioFilter));
    copyArr = copyArr.filter((e) => String(e.birthday).includes(birthdayFilter));
    copyArr = copyArr.filter((e) => e.faculty.includes(facultyFilter));
    copyArr = copyArr.filter((e) => e.yearEntry.includes(yearEntryFilter));

    return copyArr;
  }

  //очистка фильтров
  let buttonClearFilters = document.querySelector("#clearBtn");
  let allInputFilter = document.getElementsByTagName("form__input-value");

  let inputValue;

  buttonClearFilters.addEventListener("click", (e) => {
    e.preventDefault;
    inputValue = allInputFilter.value;
  });
});

