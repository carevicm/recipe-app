import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Cheeseburger',
  //     'A cheeseburger is a hamburger topped with cheese.',
  //     'https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Patty', 1),
  //       new Ingredient('Cheese', 3),
  //       new Ingredient('Lettuce', 1),
  //       new Ingredient('Tomato', 1),
  //       new Ingredient('Bacon', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Hambuger',
  //     'A hamburger consisting of one or more cooked patties of ground beef.',
  //     'https://img.freepik.com/free-photo/burger-hamburger-cheeseburger_505751-3695.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Patty', 1),
  //       new Ingredient('Lettuce', 1),
  //       new Ingredient('Tomato', 1),
  //       new Ingredient('Onion', 1),
  //       new Ingredient('Pickles', 3),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
