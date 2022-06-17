import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import Record from './src/components/Record';
import Search from './src/components/Search';
import Sampler from './src/components/Sampler';
import store from './store';
import Library from './src/components/Library';

const Tab = createBottomTabNavigator();
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarShowLabel: false,
              headerShown: false,
              tabBarStyle: { backgroundColor: '#B5BDA5' },
              tabBarIcon: ({ focused }) => {
                let color = focused ? '#011303' : '#8B9D6C'
                const icons = {
                  Search: 'search-outline',
                  Sampler: 'play-circle-outline',
                  Record: 'recording-outline',
                  Library: 'library-outline'
                };
                return (
                  <Ionicons
                    name={icons[route.name]}
                    color={color}
                    size={35}
                  />
                );
              },
            })}
          >
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
            <Tab.Screen
              name='Library'
              component={Library}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider >
  )
}

export default App;