import React, {Component} from 'react';
import { StyleSheet, Text, FlatList, ScrollView, TouchableHighlight, TouchableHighlightBase } from 'react-native';
import { Spinner, withCocktailService, FilterItem } from '../components';

class FilterScreen extends Component{
  state = {
    filters: null,
    selected: null,
    loading: true
  }
 
  componentDidMount() {
    this.loadFilters();
  }

  loadFilters() {
    const { getFilters, filters } = this.props;
    getFilters().then(({drinks}) => {
      this.setState({
        filters: drinks,
        selected: filters ? filters : drinks,
        loading: false
      });
    })
  }

  onToggleSelect = (id) => {
    const {filters, selected} = this.state;
    const selectedId = selected.findIndex(el => filters[id].strCategory === el.strCategory);
    let newSelected;
    if (selectedId !== -1) {
      newSelected = selected.filter((el, index) => selectedId !== index);
      this.setState({
        selected: newSelected
      })
    } else {
      newSelected = [...selected, filters.find((el, index) => index === id)];
      this.setState({
        selected: newSelected
      })
    }
  }

  applyFilters = () => {
    const { selected } = this.state;
    const { setFilters, navigation } = this.props;
    setFilters(selected);
    navigation.push('Drinks');
  }

  render() {
    const { filters, loading, selected } = this.state;

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
              toggleSelect={selected.find(el => item.strCategory === el.strCategory)}
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