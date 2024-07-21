const recipeName = document.getElementById("recipeName");
const recipeCategorie = document.getElementById("recipeCategorie");
const recipeInstrusctions = document.getElementById("recipeInstructions");
const ingredients = document.querySelectorAll(".ingredients");
const submitButton = document.getElementById("recipeSubmit");
const recipesContainer = document.getElementById("recipesRender");
const recipe = document.querySelectorAll(".recipe");
let recipesArray;

class Recipe {
  constructor(name, categorie, instructions, ingredients) {
    this.name = name;
    this.categorie = categorie;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}

submitButton.addEventListener("click", () => {
  let ingredientsArray = [];

  ingredients.forEach((ingredient) => {
    if (ingredient.value !== "") {
      ingredientsArray.push(ingredient.value);
    }
  });

  let recipe = new Recipe(
    recipeName.value,
    recipeCategorie.value,
    recipeInstrusctions.value,
    ingredientsArray
  );

  // Récupérer les recettes existantes dans le local storage
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  // Ajouter la nouvelle recette
  recipes.push(recipe);

  // Mettre à jour le local storage
  localStorage.setItem("recipes", JSON.stringify(recipes));

  recipesContainer.innerHTML += ` 
    <li class="recipe"">
     <h2>${recipe.name}</h2>
     <h3>${recipe.categorie}</h3>
     <button class="ingredientsBtn">Ingredients</button>
     <button class="instructionsBtn">Instructions</button>
    </li>
    `;

  // Réinitialiser les champs de saisie
  recipeName.value = "";
  recipeCategorie.value = "";
  recipeInstrusctions.value = "";
  ingredients.forEach((ingredient) => {
    ingredient.value = "";
  });

  // Mettre à jour l'affichage des recettes
  recipesRender(recipes);
});

window.addEventListener("DOMContentLoaded", () => {
  getRecipesFromLocal();
});

//fonction pour récupérer les données
const getRecipesFromLocal = () => {
  recipesArray = JSON.parse(localStorage.getItem("recipes")) || [];
  recipesRender(recipesArray);
};

//fonction d'affichage des recettes
const recipesRender = (recipes) => {
  recipesContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter de nouvelles recettes
  recipes.forEach((recipe, index) => {
    recipesContainer.innerHTML += ` 
      <li class="recipe" data-index="${index}">
        <h2>${recipe.name}</h2>
        <h3>${recipe.categorie}</h3>
        <button class="ingredientsBtn">Ingredients</button>
        <button class="instructionsBtn">Instructions</button>
      </li>
    `;
  });
};

// Utiliser la délégation d'événements pour les boutons des recettes
recipesContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("ingredientsBtn")) {
    const index = event.target.closest(".recipe").getAttribute("data-index");
    const recipe = recipesArray[index];
    alert(`Ingredients: ${recipe.ingredients}`);
    // Afficher les ingrédients ici
  }

  if (event.target.classList.contains("instructionsBtn")) {
    const index = event.target.closest(".recipe").getAttribute("data-index");
    const recipe = recipesArray[index];
    alert(`Instructions: ${recipe.instructions}`);
    // Afficher les instructions ici
  }
});
