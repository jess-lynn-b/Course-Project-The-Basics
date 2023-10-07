import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import { recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<recipe>();

 recipes: recipe[] = [
    new recipe ('Nutella Waffel','Perfect Breakfast Item', 'https://i.insider.com/5a7b433046a28862018b46ce?width=1080&format=jpeg'),

    new recipe ('Joys More is More Smores','Smores fresh out of the oven', 'https://jamonkey.com/wp-content/uploads/2015/03/Inside-Out-Joys-Smores.jpg')
  ];

  constructor () {}

  ngOnInit () {

  }

  onRecipeSelected(recipe: recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}

