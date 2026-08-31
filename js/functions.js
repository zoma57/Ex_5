function getStudent (id) {
  let student = { id: id };

    registerInputs.forEach(function(registerInput) {
        let key = registerInput.name,
        value = registerInput.value;
        student[key] = value;
      });
      return student;
    }
    
function addStudent() {
  let focusInput = document.querySelector("input:focus"),
    InvalidInput = registerForm.querySelector("input[data-valid='false']");
    focusInput?.blur();


  let invalidInput = registerForm.querySelector("input.is-invalid");

    if (invalidInput !== null || InvalidInput !== null) {
      return;
    }

    let student = getStudent(++id);

    students.push(student);

    updateLocalStorage();

    showStudent(student);

    isNoData(students);

    resetForm();
}


/* function validateStudent(student) {
  for (let field in student) {
    let inputName = field,
    inputValue = student[field];
    console.log(regaxInputs[inputName].test(inputValue));
    }
    } */

   function showStudent(student) {
     tableBody.innerHTML += `
     <tr data-student-id="${student.id}">
     <th>${student.id}</th>
     <td>${student.firstName}</td>
     <td>${student.lastName}</td>
     <td>${student.email}</td>
  <td>${student.age}</td>
    <td>${student.phone}</td>
    <td>
    <div class="buttons">
    <button class="btn btn-info text-light me-2" onclick="insertStudentIntoForm(${student.id})">Edit</button>
    <button class="btn btn-danger" onclick = "deleteStudent(${student.id}, this)">Delete</button>
    </div>
    </td>
    </tr>
    `;
  }
  
  function checkInput(input) {
    let inputName = input.name,
    inputValue = input.value,
    isEmpty = inputValue === "",
    errorEle = document.querySelector(`p.alert[data-error-name="${inputName}"]`),
    isInvalid = !regaxInputs[inputName].test(inputValue),
    errorMsg = "";

    if (isEmpty) {
      errorMsg = "This field is required."
    } else if (isInvalid) {
      errorMsg = "Invalid Field."
    }

    if (isEmpty || isInvalid) {
      input.classList.add("is-invalid");
      errorEle.textContent = errorMsg;
      errorEle.classList.remove("d-none");
      input.classList.remove("is-valid");
      input.dataset.valid = false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      errorEle.classList.add("d-none");
      input.dataset.valid = true;
    }
}

function resetForm() {
  registerForm.reset();
  
  registerInputs.forEach(function (input) {
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    let errorEle = document.querySelector(`p.alert[data-error-name="${input.name}"]`);
    errorEle.classList.add('d-none');
  });

  registerForm.setAttribute('data-type', 'add');
  let btn = registerForm.querySelector('button');
  btn.innerHTML = 'Add';
  btn.className = 'btn btn-success w-100';
}

function updateLocalStorage() {
  localStorage.setItem('students' , JSON.stringify(students));
}

function showStudents(data) {
  tableBody.innerHTML = ` <td id="tableAlert" class="table-warning text-center" colspan="7">There are no data</td>`;
  data.forEach(function (student) {
    showStudent(student);
  });
  
  isNoData(data);
}

function getStudentIndex(id) {
  return students.findIndex( (student) => student.id == id);
}

function deleteStudent(id, that) {
  
  if (!confirm("Are you sure?")) {
    return;
  }

  let studentIndex = getStudentIndex(id);
  trEle = that.closest('tr');
  
  students.splice(studentIndex, 1);
  
  trEle.remove();
  
  updateLocalStorage();
  
  isNoData(students);
}

function isNoData (data) {
  let tableAlert = document.querySelector("#tableAlert");
  if (data.length == 0) {
    tableAlert.classList.remove('d-none');
  } else {
    tableAlert.classList.add('d-none');
  }
}

function insertStudentIntoForm (id) {
  resetForm();
  let editsStudent = students.find(function(student) {
    return student.id == id;
  });
  formBtn = registerForm.querySelector("button");

  for (let input of registerInputs) {
    input.value = editsStudent[input.name];
  }

  formBtn.textContent = "Edit";
  formBtn.classList.add('btn-info', 'text-light');
  formBtn.classList.remove('btn-success');
  
  registerForm.setAttribute('data-type', 'edit');
  registerForm.setAttribute('data-student-id', id);
}

function editStudent () {
  let studentId = registerForm.dataset.studentId,
    student = getStudent(studentId),
    studentIndex = getStudentIndex(studentId),
    trEle = tableBody.querySelector(`tr[data-student-id="${student.id}"]`);

    students[studentIndex] = student;

    trEle.innerHTML = ` <th>${student.id}</th>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.phone}</td>
    <td>
    <div class="buttons">
    <button class="btn btn-info text-light me-2" onclick="insertStudentIntoForm(${student.id})">Edit</button>
    <button class="btn btn-danger" onclick = "deleteStudent(${student.id}, this)">Delete</button>
    </div>
    </td>`;

  updateLocalStorage();

  resetForm();
}

function search(searchValue) {
  let filteredStudents = students.filter(function (student) {
    return student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
          student.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          student.age.toLowerCase().includes(searchValue.toLowerCase()) ||
          student.phone.toLowerCase().includes(searchValue.toLowerCase());

  });

  showStudents(filteredStudents);
}