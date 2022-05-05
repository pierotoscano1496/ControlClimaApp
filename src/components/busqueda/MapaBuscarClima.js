import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import UbicacionService from "../../services/UbicacionService";
import MapaUbicaciones from "../general/MapaUbicaciones";

export default MapaBuscarClima = ({ navigation }) => {
    const onMarkerPress = (ubicacion) => {
        navigation.navigate("MainNavigator", {
            screen: "Buscar climas",
            params: { ubicacion }
        });
    };

    return (
        <MapaUbicaciones onMarkerPressFunction={onMarkerPress} />
    );
};