import { useState } from "react";
import recipesData from "./recipesData";
import RecipeList from "./RecipeList";

/*variables will be used to manage and update the application's data and UI based on user interactions, 
such as searching for recipes, toggling the display of favorite recipes, 
and filtering recipes based on specific criteria. */
function App() {
  const [recipes, setRecipes] = useState(recipesData);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavourites, setShowFavourites] = useState(false);
  const [filterBy, setFilterBy] = useState('All');

  //the handleSearch function is triggered when the user enters text into a searchbar.
  /*It updates the searchTerm state variable to reflect the user input 
  and applies filtering logic to the list of recipes based on the search term 
  and current filter criterion.*/
  const handleSearch = (event) => {
    setSearchTerm (event.target.value);
    filterRecipes (event.target.value, filterBy);
  };

  // handleFilterChange function is triggered when the user selects a new filter option.
  /*updates the filterBy state variable to reflect the user's selection 
  and applies filtering logic to the list of recipes based on 
  both the current search term and the new filter criterion. */
  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
    filterRecipes(searchTerm, event.target.value);
  };

  const toggleFavourites = () => {
    setShowFavourites(!showFavourites);
    if (!showFavourites) {
      setFilteredRecipes(recipes.filter(recipe => recipe.favourite));
    }else{
      filterRecipes(searchTerm, filterBy);
    }
  };

  //toggleFavourite function toggles the favourite status of a recipe identified by its id.
  /*updates the recipes state with the modified list of recipes and triggers 
  a filtering operation to update the filteredRecipes based on the 
  current search term and filter */
  const toggleFavourite = (id) => {
    const updatedRecipes = recipes.map(recipe =>
      recipe.id === id ? { ...recipe, favourite: !recipe.favourite } : recipe
    );
    setRecipes(updatedRecipes);
    filterRecipes(searchTerm, filterBy); 
  };

  //filterRecipes function filters the recipes array based on a search term 
  //It returns a new array (filtered) containing recipes whose names or ingredients match the search term
  const filterRecipes = (term) => {
    const filtered = recipes.filter(
      (recipe) => 
      recipe.name.toLowerCase().includes(term.toLowerCase()) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(term.toLowerCase()))
    );


    const filterRecipes = (term, filter) => {
      let filtered = recipesData.filter(
        (recipe) => 
        recipe.name.toLowerCase().includes(term.toLowerCase()) ||
        recipe.ingredients.some((ingredient)=> ingredient.toLowerCase().includes(term.toLowerCase())) 
      );

      if (filter !== 'All') {
        filtered = filtered.filter((recipe) => recipe.restriction.includes(filter));
      }

      if (showFavourites) {
        filtered = filtered.filter(recipe => recipe.favourite);
      }
    }

    setFilteredRecipes(filtered);
  };

  /*code generates a dropdown list (<select>) with multiple options representing 
  different filtering criteria */
  return(
    <div className="App">
      <h1>Recipe App</h1>
      <input
      type="text"
      placeholder="Search recipes..."
      value={searchTerm}
      onChange={handleSearch}
       />

<select value={filterBy} onChange={handleFilterChange}>
      <option value={"All"}>All</option>
      <option value={"Vegetarian"}>Vegetarian</option>
      <option value={"Vegan"}>Vegan</option>
      <option value={"Non-vegetarian"}>Non-vegetarian</option>
    </select>

       <button onClick={toggleFavourites}>
         {showFavourites ? 'Show All Recipes': 'Show Favourites Only'}
       </button>

       <RecipeList recipes={filteredRecipes} toggleFavourite={toggleFavourite}/>

     
    </div>
  );
}

export default App;

//References


//https://www.w3schools.com/REACT/react_usestate.asp
//https://www.w3schools.com/REACT/DEFAULT.ASP
//https://react.dev/learn
//https://react.dev/learn#conditional-rendering
//https://react.dev/learn#displaying-data
//https://react.dev/learn#responding-to-events
//https://stackoverflow.com/questions/67962575/how-would-you-store-a-recipe-inside-a-json
//https://reactjsexample.com/tag/recipe/
//https://codesandbox.io/p/sandbox/build-a-recipe-app-with-react-wjyt6?file=%2Fsrc%2FApp.js
//https://www.amity.co/tutorials/building-a-todo-list-app-with-reactjs