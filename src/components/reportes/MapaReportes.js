import React, { useState } from "react";
import MapaUbicaciones from "../general/MapaUbicaciones";

export default MapaReportes = ({ navigation }) => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    const enviarUbicacion = (ubicacion) => {
        navigation.navigate("ConsultaReportes", { ubicacion });
    };

    return (
        <MapaUbicaciones onMarkerPressFunction={enviarUbicacion} />
    )
}