export default class CocktailService{
    _apiBase = 'https://www.thecocktaildb.com/api/json/v1/1';

    getResource = async (url) => {
        const res =  await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch url ${url} received ${res.status}`)
        }       
        return res.json();
    }
        
    getCocktailsByFilter = async (filter) => {
        const res = await this.getResource(`/filter.php?c=${filter}`);
        return res;
    }

    getFilters = async() => {
        const res = await this.getResource('/list.php?c=list');
        return res;
    }

    getCocktailsByMultiFilter = async(...filters) => {
        let res;
        filters.forEach(async filter => {
            let listOfDrinks = await this.getCocktailsByFilter(filter);
            listOfDrinks.then(list => {
                res.push(list);
            })
        })
        return res;
    }
}
