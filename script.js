const getRecipie = async () => {
  let responce = await fetch("https://dummyjson.com/recipes");

  //   console.log(result);
  return await responce.json();
};

const cardMaker = async () => {
  //   console.log(result);

  let recipe = await getRecipie();
  let cards = document.getElementById("cards");
  recipe.recipes.forEach(
    (data) =>
      (cards.innerHTML += `
  <div class="recipiecard">
    <img src="${data.image}" alt="" class="recipieImage" style="width:100%;">
    <h3>${data.name}</h3>
    <button onclick="window.location.href='recipiedetailspage.html?id=${data.id}'">
      Read more
    </button>
  </div>
`),
  );
};

const recipeDetails = async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  //   getting recipies
  let recipe = await getRecipie();

  const image = document.getElementById("image");
  const recipieName = document.getElementById("recipieName");
  const cuisine = document.getElementById("cuisine");
  const difficulty = document.getElementById("difficulty");
  const prepTimeMinutes = document.getElementById("prepTimeMinutes");
  const cookTimeMinutes = document.getElementById("cookTimeMinutes");
  const ingredientsList = document.getElementById("ingredientsList");
  const instructionsList = document.getElementById("instructionsList");
  const tags = document.getElementById("tags");

  recipe.recipes.find((data) => {
    if (data.id == id) {
      console.log(data);

      image.setAttribute("src", `${data.image}`);
      recipieName.textContent = `${data.name}`;
      cuisine.textContent = `${data.cuisine}`;
      difficulty.textContent = `${data.difficulty}`;
      prepTimeMinutes.textContent = `${data.prepTimeMinutes}`;
      cookTimeMinutes.textContent = `${data.cookTimeMinutes}`;
      data.ingredients.forEach(
        (inc) => (ingredientsList.innerHTML += `<li>${inc}</li>`),
      );
      data.instructions.forEach(
        (data) => (instructionsList.innerHTML += `<li>${data}</li>`),
      );
      data.tags.forEach((data) => (tags.innerHTML += `<p>${data}</p>`));
    }
  });
};

if (window.location.pathname.includes("index.html")) {
  cardMaker();
} else if (window.location.pathname.includes("recipiedetailspage.html")) {
  recipeDetails();
}

// window.location.href=`page.html?id={3}`

// const params = new URLSearchParams(window.location.search)
// const id = params .get('id')
