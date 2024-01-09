const createInputs = document.querySelectorAll(".create-input");
const updateInputs = document.querySelectorAll(".update-input");
const createButton = document.querySelector(".create-button");
const deleteSelect = document.querySelector(".select-delete");
const deleteButton = document.querySelector(".delete-button");
const updateSelect = document.querySelector(".select-update");
const updateButton = document.querySelector(".update-button");
const updateImg = document.querySelector(".update-img");
const createImg = document.querySelector(".create-img");
const imageToUpdate = document.querySelector(".image-to-update");

let createForm = {
  title: "",
  autor: "",
  reteta: "",
  timp: 0,
  image: "",
};
let updateForm = {
  title: "",
  autor: "",
  reteta: "",
  timp: 0,
  image: "",
};

let id = 0;
let updateId = 0;
let base64Create = "";
let base64Update = "";

const createOptions = (data) => {
  for (let i = 0; i < data.length; i++) {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = data[i].id;
    option1.innerHTML = data[i].title;
    option2.value = data[i].id;
    option2.innerHTML = data[i].title;
    deleteSelect.appendChild(option1);
    updateSelect.appendChild(option2);

    option1.addEventListener("click", () => {
      id = data[i].id;
    });

    option2.addEventListener("click", () => {
      for (let j = 0; j < data.length; j++) {
        if (data[j].id === data[i].id) {
          updateInputs[0].value = data[j].title;
          updateInputs[1].value = data[j].autor;
          updateInputs[2].value = data[j].reteta;
          updateInputs[3].value = data[j].timp;
          imageToUpdate.style.display = "flex";
          imageToUpdate.src = data[j].image;
          updateId = data[j].id;
        }
      }
    });
  }
};

createButton.addEventListener("click", () => {
  //Populam obiectul de create cu valorile din input.
  for (let i = 0; i < createInputs.length; i++) {
    if (createInputs[i].name === "title") {
      createForm.title = createInputs[i].value;
    }
    if (createInputs[i].name === "autor") {
      createForm.autor = createInputs[i].value;
    }
    if (createInputs[i].name === "reteta") {
      createForm.reteta = createInputs[i].value;
    }
    if (createInputs[i].name === "timp") {
      createForm.timp = createInputs[i].value;
    }
  }
  createForm.image = base64Create;
  //POST request (este folosit ca sa creezi obiecte noi in API)
  fetch("http://localhost:8000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createForm),
  });
});

updateButton.addEventListener("click", () => {
  updateForm.title = updateInputs[0].value;
  updateForm.autor = updateInputs[1].value;
  updateForm.reteta = updateInputs[2].value;
  updateForm.timp = updateInputs[3].value;
  updateForm.image = base64Update;
  //UPDATE request
  fetch(`http://localhost:8000/products/${updateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateForm),
  });
});

createImg.addEventListener("change", () => {
  const file = createImg.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      base64Create = e.target.result;
    };
    console.log(base64Create);
    reader.readAsDataURL(file);
  }
});

updateImg.addEventListener("change", () => {
  const file = updateImg.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      base64Update = e.target.result;
      imageToUpdate.src = base64Update;
    };

    reader.readAsDataURL(file);
  }
});

//GET request (aduce datele din db)
fetch("http://localhost:8000/products")
  .then((res) => res.json())
  .then((json) => createOptions(json));

//DELETE request
deleteButton.addEventListener("click", () => {
  fetch(`http://localhost:8000/products/${id}`, {
    method: "DELETE",
  });
});

//Sa creem in admin la CREATE un input nou numit autor.
