import {  Injectable } from "@angular/core";
import { recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping.list.service";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService{
  recipesChanged = new Subject<recipe[]>();

  private recipes: recipe[] = [
    new recipe ('Hocus Pocus book brownies',
    'Book brownies from Hocus Pocus',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvbIL1CxU3jnIIyMIprU6IJfPJJeR_JNFWuQ&usqp=CAU',
    [
      new Ingredient('Box brownie mix',1),
      new Ingredient ('Black icing', 1),
      new Ingredient ('EyeBall edibiles', 10)
    ]),

    new recipe ('Joys More is More Smores',
    'Smores fresh out of the oven',
    'data:image/jpeg;base64,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',
    [
      new Ingredient ('Box fudge brownie mix',1),
      new Ingredient ('large marshmellows', 1),
      new Ingredient ('hot fudge sauce', .5),
      new Ingredient ('graham crackers', 8)
    ])
  ];
  private recipe: recipe[] = [];
  constructor (private slService: ShoppingListService){}

  setRecipes(recipes: recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes (){
    return this.recipes.slice();
  }
  getRecipe (index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
  addRecipe (recipe: recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: recipe){
this.recipes[index]= newRecipe;
this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
