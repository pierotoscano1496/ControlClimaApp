import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome";
import { formatDate } from "../../helpers/DateTimeformat";
import ClimaService from "../../services/ClimaService";
import { ScrollView } from "react-native-gesture-handler";

export default ConsultaReportesClima = ({ route, navigation }) => {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let ubicacionSelected = route.params.ubicacion;

    const [ubicacion, setUbicacion] = useState(null);
    const [clima, setClima] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(today);
    const [fechaFin, setFechaFin] = useState(tomorrow);
    const [loading, setLoading] = useState(false);
    const [showDatePickerInicio, setShowDatePickerInicio] = useState(false);
    const [showDatePickerFin, setShowDatePickerFin] = useState(false);
    const [isDateRamgeOk, setIsDateRamgeOk] = useState(true);

    useEffect(() => {
        setUbicacion(ubicacionSelected);
    }, [ubicacionSelected]);

    const goToMaps = () => {
        navigation.navigate("MapaReportes");
    };

    const consultarReporteClima = async () => {
        try {
            const medidas = await ClimaService.reporte(ubicacion.id, fechaInicio, fechaFin);
            const reporteClima = {
                ubicacion,
                medidas
            };
            navigation.navigate("ReportesClima", { reporteClima });
        } catch (error) {
            Alert.alert(
                "Error",
                error.message,
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        }
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.formControlGroup}>
                        <Text style={styles.formControlFieldName}>Fecha de inicio: {formatDate(fechaInicio)}</Text>
                        <Button
                            buttonStyle={{
                                borderRadius: 50,
                                backgroundColor: "#3498DB"
                            }}
                            icon={
                                <Icon name="calendar" size={24} color="#fff" />
                            }
                            iconRight
                            onPress={() => setShowDatePickerInicio(true)} />
                    </View>
                    <View style={styles.formControlGroup}>
                        <Text style={styles.formControlFieldName}>Fecha de fin: {formatDate(fechaFin)}</Text>
                        <Button
                            style={styles.formControlField}
                            buttonStyle={{
                                borderRadius: 50,
                                backgroundColor: "#3498DB"
                            }}
                            icon={
                                <Icon name="calendar" size={24} color="#fff" />
                            }
                            onPress={() => setShowDatePickerFin(true)} />
                    </View>
                    <Button style={styles.buttonStyle} title={ubicacion ? "Cambiar" : "Escoger ubicación"} onPress={goToMaps} />
                    {ubicacion &&
                        <View style={styles.formControlGroup}>
                            <Text>Lugar: {ubicacion.nombre}</Text>
                        </View>
                    }

                    <View>
                        <Button title="Consultar" onPress={consultarReporteClima} />
                    </View>
                </ScrollView>

            </View>
            {showDatePickerInicio && (
                <DateTimePicker
                    testID="dateTimePickerReportesInicio"
                    value={fechaInicio}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePickerInicio(false);
                        if (selectedDate) {
                            let dateRangeIsOk = true;
                            dateRangeIsOk = selectedDate.getTime() < fechaFin.getTime();
                            if (dateRangeIsOk) {
                                setFechaInicio(selectedDate);
                            } else {
                                Alert.alert("Error", "La fecha final debe ser posterior a la fecha inicial");
                            }
                        }
                    }}
                />
            )}
            {showDatePickerFin && (
                <DateTimePicker
                    testID="dateTimePickerReportesFin"
                    value={fechaFin}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePickerFin(false);
                        if (selectedDate) {
                            let dateRangeIsOk = true;
                            dateRangeIsOk = selectedDate.getTime() > fechaInicio.getTime();
                            if (dateRangeIsOk) {
                                setFechaFin(selectedDate);
                            } else {
                                Alert.alert("Error", "La fecha final debe ser posterior a la fecha inicial");
                            }
                        }
                    }}
                />
            )}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10
    },
    formControlGroup: {
        flex: 2,
        flexDirection: "row",
        padding: 10
    },
    formControlFieldName: {
        flex: 1,
    },
    formControlField: {
        flex: 2,
        padding: 10
    },
    buttonStyle: {
        flex: 2,
        padding: 10,
    }
});