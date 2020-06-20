import React, {Component} from 'react';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image, TouchableHighlight} from 'react-native';

import { CocktailScreen, FilterScreen } from './src/screens';
import { CocktailServiceContext, CocktailService } from './src/service';

const cocktailService = new CocktailService();
const Stack = createStackNavigator();

export default class App extends Component{
    
      state = {
        filters: ''
      }
      
    setFilters = (value) => {
      this.setState({
        filters: value
      })
    }

    render() {
      return (
        <CocktailServiceContext.Provider value={cocktailService}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name='Drinks' 
                component={({navigation, route}) => <CocktailScreen route={route} navigation={navigation} filters={this.state.filters}/>}
                options={({ navigation }) => ({
                  headerRight: () => (
                     <TouchableHighlight 
                     style={[styles.headerRightBtn, styles.headerBtn]}
                     onPress={() => navigation.navigate('Filters')}
                     underlayColor='#C8C8C8'>
                       <Image source={require('./src/images/cocktail.png')}/>
                     </TouchableHighlight>
                  ),
                  headerLeft: null,
                  headerTitleStyle: styles.text,
                  headerStyle: styles.header
                })}
              />
              <Stack.Screen 
                name='Filters' 
                component={({ navigation }) => <FilterScreen navigation={navigation} setFilters={this.setFilters} filters={this.state.filters}/>}
                options={({ navigation }) => ({
                  headerLeft: () => (
                    <TouchableHighlight 
                    style={[styles.headerLeftBtn, styles.headerBtn]}
                    onPress={() => navigation.push('Drinks')}
                    underlayColor='#C8C8C8'>
                      <Image source={require('./src/images/arrow-left.png')}/>
                    </TouchableHighlight>
                  ),
                  headerTitleStyle: styles.text,
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })
                }
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CocktailServiceContext.Provider>
      );
    }
}

const styles = StyleSheet.create({
  headerRightBtn: {
    marginRight: 20,
  },
  headerLeftBtn: {
    marginLeft: 20
  },
  headerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  text: {
    fontSize: 24
  }
})
