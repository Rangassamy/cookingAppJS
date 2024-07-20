const recipeName = document.getElementById("recipeName");
const recipeCategorie = document.getElementById("recipeCategorie");
const recipeInstrusctions = document.getElementById("recipeInstructions");
const ingredients = document.querySelectorAll(".ingredients");
const submitButton = document.getElementById("recipeSubmit");
const recipesContainer = document.getElementById("recipesRender");
const recipe = document.querySelectorAll(".recipe");

class Recipe {
  constructor(name, categorie, instructions, ingredients) {
    this.name = name;
    this.categorie = categorie;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}

submitButton.addEventListener("click", () => {
  const ingredientsArray = [];

  ingredients.forEach((ingredient) => {
    if (ingredient.value !== "") {
      ingredientsArray.push(ingredient.value);
    }
  });

  const recipe = new Recipe(
    recipeName.value,
    recipeCategorie.value,
    recipeInstrusctions.value,
    ingredientsArray
  );

  recipesContainer.innerHTML += ` 
  <li class="recipe"">
   <h2>${recipe.name}</h2>
   <h3>${recipe.categorie}</h3>
   <button id="ingredients">Ingredients</button>
   <button id="Instructions">Intructions</button>
  </li>
  `;

  recipeName.value = "";
  recipeCategorie.value = "";
  recipeInstrusctions.value = "";
});
