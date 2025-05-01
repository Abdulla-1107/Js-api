const form = document.getElementById("car-form");
const container = document.querySelector(".container");

function getCarsFromStorage() {
  return JSON.parse(localStorage.getItem("cars")) || [];
}

function saveCarToStorage(car) {
  const cars = getCarsFromStorage();
  cars.push(car);
  localStorage.setItem("cars", JSON.stringify(cars));
}

function renderCars() {
  container.innerHTML = "";
  const cars = getCarsFromStorage();

  cars.forEach((car, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${car.name}</h3>
      <p>Brand: ${car.brand}</p>
      <p>Price: $${car.price}</p>
      <p>Color: ${car.color}</p>
      <p>Status: ${car.isNew ? "New" : "Used"}</p>
    `;
    container.appendChild(card);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const car = {
    name: form.name.value,
    brand: form.brand.value,
    price: +form.price.value,
    color: form.color.value,
    isNew: form.isNew.checked,
  };

  saveCarToStorage(car);
  renderCars();
  form.reset();
});

window.addEventListener("load", renderCars);
