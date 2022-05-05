import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import UbicacionService from "../../services/UbicacionService";

export default MapUbicacion = (props) => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscarUbicaciones = async () => {
        setLoading(true);
        try {
            setUbicaciones(await UbicacionService.obtener());
        } catch (error) {
            Alert.alert("Error", error.message);
        }
        setLoading(false);
    };

    const addUbicacion = () => {
        const ubicacionNueva = {
            id: 8,
            latitud: -11.6627020,
            longitud: -76.7914606,
            nombre: "Nuevo lugar",
        };

        setUbicaciones([...ubicaciones, ubicacionNueva]);
    };

    useEffect(() => {
        buscarUbicaciones();
    }, []);

    return (ubicaciones.length > 0 &&
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione una Ubicacion</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -11.6663125,
                    longitude: -76.7872284,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                camera={{
                    center: {
                        latitude: -11.6663125,
                        longitude: -76.7872284,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 0,
                    zoom: 18,
                }}>
                {ubicaciones && ubicaciones.map(ubicacion => {
                    return (
                        <Marker
                            key={ubicacion.id}
                            coordinate={{
                                latitude: ubicacion.latitud,
                                longitude: ubicacion.longitud
                            }}
                            onPress={() => props.onMarkerPressFunction(ubicacion)}>
                            <View style={styles.marker}>
                                <Text>{ubicacion.nombre}</Text>
                            </View>
                        </Marker>
                    )
                })}
            </MapView>
            <Button onPress={addUbicacion} style={{ flex: 1 }}>Añadir ubicacion</Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    map: {
        flex: 1
    },
    marker: {
        backgroundColor: '#ff0000',
        padding: 5,
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});