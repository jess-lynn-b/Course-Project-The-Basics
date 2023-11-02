import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<recipe[]>{
  constructor(private dataStorageService: DataStorageService , private recipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes();

    if( recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }

  }
}
