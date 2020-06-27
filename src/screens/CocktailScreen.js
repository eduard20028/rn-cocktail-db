import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { Spinner, CocktailList, withCocktailService } from '../components';

const { height } = Dimensions.get('window');

class CocktailScreen extends Component{
    state = {
        filters: [],
        data: [],
        dataLimit: null,
        loading: true
    }

    componentDidMount() {
        this.loadFilters();
    }

    loadFilters() {
        const { getFilters, filters } = this.props;
        
        getFilters().then(({drinks}) => {
            this.setState({
                filters: filters ? filters : drinks
            }, this.loadData);
        })
    }

    loadData() {
        const { filters } = this.state;
        const { getCocktailsByMultiFilter } = this.props;
        const listItemLimit = 4;
        getCocktailsByMultiFilter(filters, listItemLimit).then(data => {
            this.setState({
                data: data,
                dataLimit: data.length > 1 ? 2 : data.length,
                loading: false
            })
        });
    }

    handleLoadMore = () => {
        const { data, dataLimit } = this.state;
        this.setState({
            dataLimit: dataLimit + 2 < data.length ? dataLimit + 2 : data.length
        })
    }

    render() {
        const { loading, data, dataLimit } = this.state;
        
        if(loading) return <Spinner/>;
        if(!data.length) return (
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.textWarning]}>To see some info - choose at least 1 filter.</Text>
            </View>
        )

        return (
            <View style={styles.container}>
                <FlatList
                    extraData={data}
                    data={data.slice(0, dataLimit)}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                    renderItem={({item}) => <CocktailList data={item}/>}
                    keyExtractor={({filter}) => filter}
                />
            </View>
        )
    }
}

const mapMethodsToProps = (cocktailService) => {
    return {
        getFilters: cocktailService.getFilters,
        getCocktailsByMultiFilter: cocktailService.getCocktailsByMultiFilter
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
    textContainer: {
        height: height / 2,
        justifyContent: 'flex-end'
    },
    textWarning: {
        fontSize: 24,
        textAlign: 'center'
    },  
    text: {
        color: '#7E7E7E'
    },
});