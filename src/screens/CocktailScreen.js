import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Spinner, CocktailList, withCocktailService } from '../components';

class CocktailScreen extends Component{
    state = {
        filters: [],
        limit: null,
        loading: true
    }

    componentDidMount() {
        this.loadFilters();
    }

    loadFilters() {
        const { getFilters, route, navigation, filters } = this.props;
        
        getFilters().then(({drinks}) => {
            this.setState({
                filters: filters ? filters : drinks,
                loading: false
            });
        })
    }

    render() {
        const { loading, filters } = this.state;

        if(loading) return <Spinner/>;

        return (
            <View style={styles.container}>
                <FlatList
                    extraData={filters}
                    data={filters}
                    renderItem={({ item }) => (
                        <CocktailList filter={item.strCategory}/>
                    )}
                    keyExtractor={(item) => item.strCategory + Math.floor(Math.random()*100)}
                />
            </View>
        )
    }
}

const mapMethodsToProps = (cocktailService) => {
    return {
        getFilters: cocktailService.getFilters
    }
}

export default withCocktailService(mapMethodsToProps)(CocktailScreen);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },  
    heading: {
        marginVertical: 20,
        fontSize: 14
    },
    text: {
        color: '#7E7E7E'
    },
});