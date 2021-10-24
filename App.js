import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Home from './screens/Home';
import Positions from './screens/Positions';
import { colors } from './config';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar></StatusBar>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primaryDark
                },
                headerTintColor: 'white'
            }}>
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}></Stack.Screen>
                <Stack.Screen options={{ title: 'Zapis pozycji' }} name="Points" component={Positions}></Stack.Screen>
                <Stack.Screen options={{ title: 'Lokalizacja na mapie' }} name="Map" component={Map}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
