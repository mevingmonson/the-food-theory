// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';


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
        //4 Search for recipes
        await state.search.getResults();

        //5 Render results on UI
        console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result)

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

const R = new Recipe(47746);
R.getRecipe();
console.log(R);