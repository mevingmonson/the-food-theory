// Global app controller
import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';


/*** Global State of the app
 * Search object
 * current recipe object
 * Shopping list obj
 * Liked recipe
 */

const state = {};

//Search Controller
const controlSearch = async () => {
    //1/ Get query from view
    const query = searchView.getInput();


    if (query) {
        //2 New search obj and add to state
        state.search = new Search(query);

        //3 prepare ui for results
        searchView.clearInput();
        searchView.clearResults();

        //4 Search for recipes
        await state.search.getResults();

        //5 Render results on UI
        console.log(state.search.result);
        searchView.renderResults(state.search.result)

    }
}




elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


