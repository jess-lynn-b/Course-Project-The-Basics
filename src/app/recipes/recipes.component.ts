import {
  Component,
  OnInit,
 } from '@angular/core';
import { recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: recipe;

  constructor(private recipeService: RecipeService){ }

  ngOnInit() {
    this.recipeService.recipeSelected
      .subscribe();
      (recipe: recipe) => {
        this.selectedRecipe = recipe;
      }
  }
}
