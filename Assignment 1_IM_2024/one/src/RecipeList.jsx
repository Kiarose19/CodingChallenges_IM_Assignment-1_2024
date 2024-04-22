import React from "react";
import Recipe from "./Recipe";

/* the RecipeList component renders a list of recipes. 
It iterates over the recipes array and renders a <Recipe> component 
for each recipe in the array */
function RecipeList({recipes, toggleFavourite}) {
    return (
        <div className="recipe-List">
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} toggleFavourite={toggleFavourite}/>
          ))}
        </div>
    );
}

export default RecipeList;