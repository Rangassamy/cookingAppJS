const recipeName = document.getElementById("recipeName");
const recipeCategorie = document.getElementById("recipeCategorie");
const recipeInstrusctions = document.getElementById("recipeInstructions");
const ingredients = document.querySelectorAll(".ingredients");
const submitButton = document.getElementById("recipeSubmit");
const recipesContainer = document.getElementById("recipesRender");
let recipesArray = [];

// Classe pour représenter une recette
class Recipe {
  constructor(name, categorie, instructions, ingredients) {
    this.name = name;
    this.categorie = categorie;
    this.instructions = instructions;
    this.ingredients = ingredients;
  }
}

// Ajouter une recette et mettre à jour le localStorage
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

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  recipesRender(recipes);

  // Réinitialiser les champs de saisie
  recipeName.value = "";
  recipeCategorie.value = "";
  recipeInstrusctions.value = "";
  ingredients.forEach((ingredient) => {
    ingredient.value = "";
  });
});

// Récupérer les recettes du localStorage au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
  getRecipesFromLocal();
});

// Fonction pour récupérer les données du localStorage
const getRecipesFromLocal = () => {
  recipesArray = JSON.parse(localStorage.getItem("recipes")) || [];
  recipesRender(recipesArray);
};

// Fonction pour afficher les recettes
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
    showIngredients(recipe.ingredients);
  }

  if (event.target.classList.contains("instructionsBtn")) {
    const index = event.target.closest(".recipe").getAttribute("data-index");
    const recipe = recipesArray[index];
    showInstructions(recipe.instructions);
  }
});

const showIngredients = (ingredients) => {
  const overlay = document.createElement("div");
  overlay.classList.add("ingredients-container", "overlay");
  overlay.innerHTML = `
    <button class="close-btn">Close</button>
    <h2>Ingredients</h2>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
  `;
  document.body.appendChild(overlay);
};

const showInstructions = (instructions) => {
  const overlay = document.createElement("div");
  overlay.classList.add("instructions-container", "overlay");
  overlay.innerHTML = `
    <button class="close-btn">Close</button>
    <h2>Instructions</h2>
    <ul>
      <li>${instructions}</li>
    </ul>
  `;
  document.body.appendChild(overlay);
};

// Écouter les clics sur le bouton de fermeture pour les conteneurs d'ingrédients et d'instructions
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn")) {
    e.target
      .closest(".ingredients-container, .instructions-container")
      .remove();
  }
});
