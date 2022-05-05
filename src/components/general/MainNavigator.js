import React, { createContext, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BuscarClima from "../busqueda/BuscarClima";
import ListadoClimas from "../busqueda/ListadoClimas";
import RegistrarClima from "../registro/RegistrarClima";
import ConsultaReportesClima from "../reportes/ConsultaReportesClima";
import ReportesClimaNavigator from "../reportes/ReportesClimaNavigator";

const Drawer = createDrawerNavigator();

export default MainNavigator = ({ navigation }) => {
    return (
        <Drawer.Navigator initialRouteName="BuscarClima">
            <Drawer.Screen name="Buscar climas" component={BuscarClima} initialParams={{ ubicacion: null }} />
            {/* <Drawer.Screen name="BuscarUbicacionMapa" component={BuscarUbicacionMapa} /> */}
            <Drawer.Screen name="Listado de climas" component={ListadoClimas} initialParams={{ climas: [], ubicacion: null }} />
            <Drawer.Screen name="Registrar clima" component={RegistrarClima} initialParams={{ ubicacion: null }} />
            <Drawer.Screen name="Reportes de climas" component={ReportesClimaNavigator} />
        </Drawer.Navigator>
    );
};