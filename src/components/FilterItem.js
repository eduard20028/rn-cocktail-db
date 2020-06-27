import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

const FilterItem = ({ filter, id, onToggleSelect, toggleSelect }) => {
    return(
            <TouchableHighlight 
              style={styles.filter}
              underlayColor='#C8C8C8'
              onPress={() => onToggleSelect(id)}
            >
                <View style={styles.filterContainer}>
                  <Text style={styles.text}>{filter.strCategory}</Text>
                  <Image style={{ opacity: toggleSelect ? 1 : 0 }} source={require('../images/check-mark.png')}/>
                </View>
            </TouchableHighlight>
    )
}

export default FilterItem;

const styles = StyleSheet.create({
  filter: {
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 20
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },  
  text: {
    fontSize: 16
  },
});