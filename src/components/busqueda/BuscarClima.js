import React, { createContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, Animated, Easing, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import { formatDate } from "../../helpers/DateTimeformat";
import { obtenerClimasPorFechas } from '../../services/ClimaService';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome";

export default BuscarClima = ({ route, navigation }) => {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let ubicacionSelected = route.params.ubicacion;

    const [fechaInicio, setFechaInicio] = useState(today);
    const [fechaFin, setFechaFin] = useState(tomorrow);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tipoFecha, setTipoFecha] = useState(1); // Tipo 1: Fecha Inicio, Tipo 2: Fecha Fin
    const [isLoading, setLoading] = useState(false);
    const [ubicacion, setUbicacion] = useState(null);

    useEffect(() => {
        console.log("Use efect ran");
        setUbicacion(ubicacionSelected);
    }, [ubicacionSelected]);

    const openDatePicker = (tipoFecha) => {
        setShowDatePicker(true);
        setTipoFecha(tipoFecha);
    };

    const formDatePicker = (tipoFecha) => {
        const fecha = tipoFecha === 1 ? fechaInicio : fechaFin;

        return (
            <View style={styles.formDatePicker}>
                <Text style={{ flex: 3, ...styles.fontMedium, ...styles.bold }}>{formatDate(fecha)}</Text>
                <Button
                    buttonStyle={{
                        borderRadius: 50,
                        backgroundColor: 'rgba(127, 220, 103, 1)'
                    }}
                    style={{}}
                    icon={
                        <Icon
                            name="calendar"
                            size={24}
                            color="#fff"
                        />}
                    iconRight
                    onPress={() => openDatePicker(tipoFecha)} />

            </View>
        );
    };

    const selectFecha = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');

        if (selectedDate) {
            // Comparar fechas
            let dateRangeIsOk = true;
            switch (tipoFecha) {
                case 1:
                    if (selectedDate.getTime() > fechaFin.getTime()) {
                        dateRangeIsOk = false;
                    }
                    break;
                case 2:
                    if (selectedDate.getTime() < fechaInicio.getTime()) {
                        dateRangeIsOk = false;
                    }
                    break;
            }

            if (dateRangeIsOk) {
                switch (tipoFecha) {
                    case 1:
                        setFechaInicio(selectedDate);
                        break;
                    case 2:
                        setFechaFin(selectedDate);
                        break;
                }
            } else {
                Alert.alert("Error", "La fecha final debe ser posterior a la fecha inicial");
            }
        }
    };

    const mostrarMapa = () => {
        navigation.navigate("BuscarUbicacionMapa");
    };

    const buscarClimas = async () => {
        /* if (fechaInicio && fechaFin) {
            //Buscar climas
            setLoading(true);
            const climasBuscados = await obtenerClimasPorFechas(fechaInicio, fechaFin);
            navigation.navigate("ClimasBuscados", {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            });
        } else {
            Alert.alert("Error", "Debe ingresar las fechas de inicio y fin");
        } */
        if (ubicacion) {
            let newUbicacion = { ...ubicacion };
            newUbicacion.nombre = "Nuevo nombre";
            console.log(newUbicacion);
            setUbicacion(newUbicacion);
            Alert.alert("Mensaje", "Buscando climas en " + ubicacion.nombre);
        } else {
            Alert.alert("Mensaje", "Buscando climas en todos");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.formContent}>
                    {formDatePicker(1)}
                    {formDatePicker(2)}
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={tipoFecha === 1 ? fechaInicio : fechaFin}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={selectFecha}
                        />
                    )}
                </View>
                {ubicacion &&
                    <View style={{ ...styles.formContent, ...styles.ubicacionInfo }}>
                        <Text style={styles.fontMedium}>{`Ubicación: ${ubicacion.nombre}`}</Text>
                        <Button
                            buttonStyle={styles.button}
                            title="Quitar" onPress={() => setUbicacion(null)} />
                    </View>}
                <View style={styles.formContent}>
                    <Button
                        buttonStyle={styles.button}
                        title="Buscar por mapa" onPress={mostrarMapa} />
                </View>
                <View style={styles.formContent}>
                    <Button
                        buttonStyle={styles.button}
                        title="Buscar" onPress={buscarClimas} />
                </View>

            </ScrollView>
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
    bold: {
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        margin: 10,
    },
    formContent: {
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        borderRadius: 10
    },
    ubicacionInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formDatePicker: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
    },
    formDatePickerField: {
        flex: 2,
    },
    scrollView: {
        marginHorizontal: 10,
    },
    scrollContainer: {
        height: '100%'
    },
    map: {
        width: '100%',
        height: '100%',
        //...StyleSheet.absoluteFillObject
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