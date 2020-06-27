import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const CocktailList = ({data}) => {
    const { drinks, filter } = data;

    return(
        <View>
            <Text style={styles.filterTitle}>{filter}</Text>
            {
                drinks.map(item => (
                    <View style={styles.itemBlock} key={item.idDrink}>
                        <Image style={styles.itemImage} source={{uri: item.strDrinkThumb}}/>
                        <Text style={[styles.itemText, styles.text]}>{item.strDrink}</Text>
                    </View>
                ))
            }
        </View>
    )
}

export default CocktailList;

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