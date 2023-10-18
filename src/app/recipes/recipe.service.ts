import {  Injectable } from "@angular/core";
import { recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping.list.service";
@Injectable()
export class RecipeService{

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
    'https://lifeshehas.com/wp-content/uploads/2015/11/inside-out-inspired-recipe-joymore-is-more-smores-insideoutevent.png',
    [
      new Ingredient ('Box fudge brownie mix',1),
      new Ingredient ('large marshmellows', 1),
      new Ingredient ('hot fudge sauce', .5),
      new Ingredient ('graham crackers', 8)
    ])
  ];
  constructor (private slService: ShoppingListService){}

  getRecipes (){
    return this.recipes.slice();
  }
  getRecipe (index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
