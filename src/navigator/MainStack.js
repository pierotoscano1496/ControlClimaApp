import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigator from "../components/general/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Login from '../components/auth/Login';
import BuscarClima from "../components/busqueda/BuscarClima";
import ListadoClimas from "../components/busqueda/ListadoClimas";
import MapaBuscarClima from "../components/busqueda/MapaBuscarClima";
import MapaRegistrarClima from "../components/registro/MapaRegistrarClima";
import MapaReportes from "../components/reportes/MapaReportes";

const Stack = createNativeStackNavigator();

export default MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="MapaBuscarClima" component={MapaBuscarClima} />
                <Stack.Screen name="MapaRegistrarClima" component={MapaRegistrarClima} />
                {/* <Stack.Screen name="BuscarClima" component={BuscarClima} initialParams={{ ubicacion: null }} />
            <Stack.Screen name="BuscarUbicacionMapa" component={BuscarUbicacionMapa} />
            <Stack.Screen name="ListadoClimas" component={ListadoClimas} initialParams={{ climas: [], ubicacion: null }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};