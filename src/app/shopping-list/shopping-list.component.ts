import { Component } from '@angular/core';
import { ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: ingredients[] = [
    new ingredients ('Apples', 5),
    new ingredients ('Butter', 2),
  ];

  constructor (){ }

 
}
