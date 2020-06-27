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

    getCocktailsByMultiFilter = async (filters, limit) => {
        let res = [];
        for(let i = 0; i < filters.length; i++) { 
            await this.getCocktailsByFilter(filters[i].strCategory).then(({drinks}) => res.push({
                drinks: drinks.slice(0, limit),
                filter: filters[i].strCategory
            }));
        }
        return res;
    }

    getFilters = async() => {
        const res = await this.getResource('/list.php?c=list');
        return res;
    }
}