import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from '../components/auth/Login';
import BuscarClima from "../components/busqueda/BuscarClima";
import BuscarUbicacionMapa from "../components/busqueda/BuscarUbicacionMapa";

const Stack = createNativeStackNavigator();

export default MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="BuscarClima" component={BuscarClima} initialParams={{ ubicacion: null }} />
                <Stack.Screen name="BuscarUbicacionMapa" component={BuscarUbicacionMapa} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}