import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useState } from "react";
import ConsultaReportesClima from "./ConsultaReportesClima";
import MapaReportes from "./MapaReportes";
import ReportesClima from "./ReportesClima";

const Stack = createNativeStackNavigator();

export default ReportesClimaNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ConsultaReportes">
            <Stack.Screen name="ConsultaReportes" component={ConsultaReportesClima} initialParams={{ ubicacion: null }} />
            <Stack.Screen name="ReportesClima" component={ReportesClima} />
            <Stack.Screen name="MapaReportes" component={MapaReportes} />
        </Stack.Navigator>
    );
};