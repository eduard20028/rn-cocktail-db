import React, {Component} from 'react';
import { StyleSheet, Text, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import { Spinner, withCocktailService, FilterItem } from '../components';

class FilterScreen extends Component{
  state = {
    filters: null,
    toggleSelect: new Map(),
    selected: null,
    loading: true
  }
 
  componentDidMount() {
    this.loadFilters();
  }

  setInitialFilters() {
    const { toggleSelect, filters, selected } = this.state;
    const { route } = this.props;
    if(!route.params) return;

    const newToggleSelect = new Map(toggleSelect);

    console.log(selected);
    
    filters.forEach((item, id) => {
      let selectedItemId = selected.findIndex(el => item.strCategory === el.strCategory);
      if(selectedItemId !== -1) newToggleSelect.set(id, true);
    })
    console.log(toggleSelect);
    this.setState({
      toggleSelect: newToggleSelect,
      loading: false
    });
  }

  loadFilters() {
    const { getFilters, route } = this.props;
    getFilters().then(({drinks}) => {
      this.setState({
        filters: drinks,
      //  selected: route.params ? route.params.filters : [...drinks],
        selected: [{strCategory: "Milk / Float / Shake" }, {strCategory: "Homemade Liqueur"}],
        loading: false
      }, this.setInitialFilters);
    })
  }

  onToggleSelect = (id) => {
    const { toggleSelect } = this.state;
    const newToggleSelect = new Map(toggleSelect);
    newToggleSelect.set(id, toggleSelect.get(id));

    this.setState({
      toggleSelect: newToggleSelect
    });
  }

  applyFilters = () => {
    const { toggleSelect, filters, selected } = this.state;


    console.log('Toggle', toggleSelect)
    console.log(filters);

    for(let [key, value] of toggleSelect.entries()) {
      let selectedItemId = selected.findIndex(el => filters[key].strCategory === el.strCategory);
      console.log(selectedItemId);
      if(!value && selectedItemId !== -1) {
        selected.splice(selectedItemId, 1)
      } else if(value && selectedItemId === -1) {
        selected.push(filters[key]);
      }
    }
    console.log(selected);
    this.props.navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Drinks',
          params: {
            filters: selected
          },
        },
      ],
    })
  }

  render() {
    const { filters, loading, selected, toggleSelect } = this.state;

    if(loading) return <Spinner/>;

    return(
      <ScrollView style={styles.container}>
        <FlatList
          extraData={filters}
          data={filters}
          renderItem={({item, index}) => 
            <FilterItem 
              filter={item} 
              onToggleSelect={this.onToggleSelect} 
              toggleSelect={!!toggleSelect.get(index)}
              id={index}
            />
          }
          keyExtractor={(item) => item.strCategory}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor='#C8C8C8'
          onPress={this.applyFilters}
        >
            <Text style={styles.buttonText}>Apply</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const mapMethodsToProps = (cocktailService) => {
    return {
        getFilters: cocktailService.getFilters
    }
}

export default withCocktailService(mapMethodsToProps)(FilterScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30
  },
  button: {
    marginVertical: 15,
    backgroundColor: '#272727'
  },
  buttonText: {
    paddingVertical: 17,
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});


// class FilterScreen extends Component{

//   componentDidMount() {
//     this.loadFilters();
//     this.setInitialFilters();
//   }

  