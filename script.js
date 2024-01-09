const select = document.querySelector("select");
const col1 = document.querySelector(".col1");
const col2 = document.querySelector(".col2");

fetch("http://localhost:8000/products")
  .then((res) => res.json())
  .then((json) => renderProducts(json));

const renderProducts = (retete) => {
  for (let index = 0; index < retete.length; index++) {
    const option = document.createElement("option");
    option.setAttribute("value", index);
    option.innerHTML = retete[index].title;
    option.addEventListener("click", () => {
      col1.innerHTML = " ";
      col2.innerHTML = " ";
      const reteta = retete[option.getAttribute("value")];
      console.log(reteta);
      const image = document.createElement("img");
      image.src = reteta.image;
      col1.appendChild(image);
      const titluReteta = document.createElement("h3");
      titluReteta.innerHTML = reteta.title;
      col2.appendChild(titluReteta);
      const autorReteta = document.createElement("span");
      autorReteta.innerHTML = reteta.autor;
      col2.appendChild(autorReteta);
      const infoReteta = document.createElement("p");
      infoReteta.innerHTML = reteta.reteta;
      col2.appendChild(infoReteta);
      const timp = document.createElement("span");
      timp.innerHTML = "Timp: " + reteta.timp;
      col2.appendChild(timp);
    });

    select.appendChild(option);
  }
};

const reteta = {
  Title: "a ",
  Time: " a",
  Image: "a ",
  Receipe: " a",
};

//https://www.freecodecamp.org/news/json-server-for-frontend-development/
