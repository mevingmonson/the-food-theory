// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';


/*** Global State of the app
 * Search object
 * current recipe object
 * Shopping list obj
 * Liked recipe
 */

const state = {};

/*****        Search Controller       *****/

const controlSearch = async () => {
    //1/ Get query from view
    const query = searchView.getInput();
    if (query) {
        //2 New search obj and add to state
        state.search = new Search(query);

        //3 prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            //4 Search for recipes
            await state.search.getResults();

            //5 Render results on UI
            console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result)
        }
        catch (err) {
            alert('Error Processing Search' + err);
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, gotoPage)
    }
});


/****           RECIPE CONTROLLER             ****/

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    // console.log(id);

    if (id) {
        //prepare ui for results
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //create new Recipe obj
        state.recipe = new Recipe(id);
        try {
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe);

        }
        catch (err) {
            alert('Error Processing Recipe' + err);
        }

    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
