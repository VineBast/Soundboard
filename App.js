import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Record from './src/components/Record';
import Search from './src/components/Search';
import Sampler from './src/components/Sampler';
import store from './store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
            name='Search'
            component={Search}
            />
            <Tab.Screen 
            name='Sampler'
            component={Sampler}
            />
            <Tab.Screen 
            name='Record'
            component={Record}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;