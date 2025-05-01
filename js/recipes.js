const BASE_URL = "https://dummyjson.com/";

function hideLoading() {
  document.querySelector(".loading").style.display = "none";
}

function showSkeletons(count = 15) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    container.appendChild(skeleton);
  }
}

function renderProductData(data) {
  const container = document.querySelector(".container");
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>ID: ${item.id}</p>
        <a class="btn" href="#">View Recipe</a>
      </div>
    `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function fetchData(endpoint) {
  showSkeletons(); 
  fetch(`${BASE_URL}${endpoint}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      hideLoading(); 
      renderProductData(data.recipes); 
    })
    .catch((err) => {
      hideLoading();
      console.log(err);
    });
}

window.addEventListener("load", () => {
  fetchData("recipes");
});
