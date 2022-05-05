import React from "react";
import SensorService from "../../services/SensorService";
import MapaUbicaciones from "../general/MapaUbicaciones";

export default MapaRegistrarClima = ({ navigation }) => {

    const onMarkerPress = (ubicacion) => {
        navigation.navigate("MainNavigator", {
            screen: "Registrar clima",
            params: { ubicacion }
        });
    };

    return (
        <MapaUbicaciones onMarkerPressFunction={onMarkerPress} />
    );
};