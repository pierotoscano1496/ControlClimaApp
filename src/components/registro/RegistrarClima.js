import React, { useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import ValidationModelException from "../../models/exceptions/ValidationModelException";
import ClimaService from "../../services/ClimaService";
import SensorService from "../../services/SensorService";
import UsuarioService from "../../services/UsuarioService";

export default RegistrarClima = ({ route, navigation }) => {
    const [ubicacion, setUbicacion] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [clima, setClima] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    let ubicacionSelected = route.params.ubicacion;

    useEffect(() => {
        checkUsuarioLogueado();
        if (ubicacionSelected) {
            setUbicacion(ubicacionSelected);
            getClimaUbicacion();
        }
    }, [ubicacionSelected]);

    const checkUsuarioLogueado = async () => {
        const usuarioLogueado = await UsuarioService.getUsuarioLogueado();
        if (usuarioLogueado) {
            console.log(usuarioLogueado);
            setUsuario(usuarioLogueado);
        }
    };

    const goToMaps = () => {
        navigation.getParent().navigate("MapaRegistrarClima");
    };

    const getClimaUbicacion = async () => {
        try {
            console.log("Obteniendo clima de la ubicacion seleccionada");
            const climaSensor = await SensorService.consultarParametrosClimaUbicacion(ubicacionSelected.id);
            climaSensor.usuario = usuario;
            setClima(climaSensor);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const registrarClima = async () => {
        try {
            setLoading(true);
            const climaRegistrado = await ClimaService.registrar(clima);
            setLoading(false);
            Alert.alert("Mensaje", "Éxito al registrar el clima");
            navigation.navigate("Buscar climas");
        } catch (error) {
            if (error instanceof ValidationModelException) {
                setErrorMessage(error.message);
            }
            else {
                Alert.alert("Error", "No se pudo registrar el clima");
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formControlContent}>
                <Text style={{ flex: 1 }}>Lugar: {ubicacion ? ubicacion.nombre : 'Sin nombre'} </Text>
                <Button style={{ flex: 1 }} onPress={goToMaps} title="Buscar" />
            </View>

            {clima && (
                <View>
                    <Text style={styles.title}>Datos capturados</Text>
                    <Text>Temperatura: {clima.temperatura} °C</Text>
                    <Text>Luminosidad: {clima.intensidadLuz} lx</Text>
                    <Text>Intensidad de viendo: {clima.intensidadViento} m/s</Text>
                    {clima.intensidadCaudal &&
                        <Text>Intensidad de caudal: {clima.intensidadCaudal} m/s</Text>
                    }
                </View>
            )}
            <Button disabled={!clima} onPress={registrarClima} title="Registrar" />

            {errorMessage && (
                <View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    fontSmall: {
        fontSize: 12,
    },
    fontMedium: {
        fontSize: 18,
    },
    fontLarge: {
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold'
    },
    container: {
        paddingTop: StatusBar.currentHeight,
        margin: 10,
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap"
    },
    formContent: {
        paddingTop: 20,
        paddingBottom: 20
    },
    button: {
        borderRadius: 10
    },
    ubicacionInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formControlContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 10
    }
});