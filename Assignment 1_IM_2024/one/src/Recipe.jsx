import React from "react";

/* the Recipe component renders a single recipe and provides a callback function,
 handleFavouriteToggle, to handle toggling the favorite status of that recipe 
 when the user interacts with the corresponding UI element */
function Recipe({recipe, toggleFavourite}) {
    const handleFavouriteToggle = () => {
        toggleFavourite(recipe.id);
    };

    //code renders a recipe with its details, including name, category,
    // dietary restrictions, ingredients list, and a button to toggle its favorite status.
    return(
        <div className="recipe">
          <h2>{recipe.name}</h2>
          <p>{recipe.category}</p>
          <p>{recipe.restriction.join(',')}</p>
          <h3>Ingredients:</h3>

          <ul>
            {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <button onClick={handleFavouriteToggle}>
        {recipe.favourite ? 'Remove from Favourites' : 'Add to Favourites'}
      </button>

        </div>
    );
}

export default Recipe;