import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default BuscarUbicacionMapa = ({ navigation }) => {
    const [ubicacionSelected, setUbicacionSelected] = useState(null);
    const [ubicaciones, setUbicaciones] = useState([]);

    useEffect(() => {
        const obtenerUbicaciones = [
            {
                id: 1,
                latitud: -11.6663125,
                longitud: -76.7872284,
                nombre: "Lugar ABC",
            },
            {
                id: 2,
                latitud: -11.6711035,
                longitud: -76.7913596,
                nombre: "Lugar XYZ",
            },
            {
                id: 3,
                latitud: -11.6618010,
                longitud: -76.7913596,
                nombre: "Campesinito",
            }
        ];

        setUbicaciones(obtenerUbicaciones);
    }, []);

    const onMarkerPress = (ubicacion) => {
        setUbicacionSelected(ubicacion);
        navigation.navigate("BuscarClima", { ubicacion });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Ubicacion</Text>
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
                {ubicaciones.map(ubicacion => {
                    return (
                        <Marker
                            key={ubicacion.id}
                            coordinate={{
                                latitude: ubicacion.latitud,
                                longitude: ubicacion.longitud
                            }}
                            onPress={() => onMarkerPress(ubicacion)}>
                            <View style={styles.marker}>
                                <Text>{ubicacion.nombre}</Text>
                            </View>
                        </Marker>
                    )
                })}
            </MapView>
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