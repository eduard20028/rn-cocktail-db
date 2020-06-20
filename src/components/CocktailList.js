import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { withCocktailService } from './HOC';
import Spinner from './Spinner';

class CocktailList extends Component{
    state = {
        cocktails: [],
        loading: true
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        const { getCocktailsByFilter, filter} = this.props;

        getCocktailsByFilter(filter).then(({drinks}) => {
            this.setState({
                cocktails: drinks.slice(0, 4),
                filter,
                loading: false
            })
        })
    }

    render() {
        const {loading, cocktails, filter} = this.state;

        if(loading) return <Spinner/>

        return(
            <View>
                <Text style={styles.filterTitle}>{filter}</Text>
                {
                    cocktails.map(item => (
                        <View style={styles.itemBlock} key={item.idDrink}>
                            <Image style={styles.itemImage} source={{uri: item.strDrinkThumb}}/>
                            <Text style={[styles.itemText, styles.text]}>{item.strDrink}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }
}

const mapMethodsToProps = (cocktailService) => {
    return {
        getCocktailsByFilter: cocktailService.getCocktailsByFilter
    }
}

export default withCocktailService(mapMethodsToProps)(CocktailList);


const styles = StyleSheet.create({
    filterTitle: {
        marginTop: 20,
        color: '#7E7E7E'
    },
    itemText: {
        color: '#7E7E7E',
        marginLeft: 20,
        fontSize: 16
    },
    itemBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        height: 100
    },
    itemImage: {
        width: 100,
        height: 100
    },
});