class Recipe {
  constructor(title, ingredients, instructions) {
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}

const recipes = [
  new Recipe("Pato pesto", "pate", "cuir dans l'eau chaude"),
  new Recipe("Pate carbo", "pates", "cuir dans l'eau"),
  new Recipe("Pizza", "pizza", "faut faire cuir au four"),
  new Recipe("Colombo", "colombo", "faut faire cuire"),
];
