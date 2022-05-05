import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { formatDate, formatTime } from "../../helpers/DateTimeformat";

const CardReporte = (props) => {

    return (
        <View style={styles.mainCard}>
            <Text style={styles.cardMainTitle}>{props.medida.medida}:</Text>
            <View style={styles.cardContent}>
                <View style={styles.cardContentRow}>
                    <Text style={styles.cardSubTitle}>Promedio: </Text>
                    <Text style={styles.cardText}>{props.medida.promedio} {props.medida.unidadMedida}</Text>
                </View>

                <View style={styles.cardContentRow}>
                    <Text style={styles.cardSubTitle}>Mediana: </Text>
                    <Text style={styles.cardText}>{props.medida.mediana} {props.medida.unidadMedida}</Text>
                </View>

                <View style={styles.cardContentRow}>
                    <Text style={styles.cardSubTitle}>Moda: </Text>
                    <Text style={styles.cardText}>{props.medida.moda} {props.medida.unidadMedida}</Text>
                </View>

                <View style={styles.minCard}>
                    <Text style={styles.cardSubTitle}>Maxima: {props.medida.max} {props.medida.unidadMedida}</Text>
                    <Text style={styles.cardText}>Del día {formatDate(props.medida.fechaMax)} a las {formatTime(props.medida.fechaMax)} </Text>
                </View>
                <View style={styles.minCard}>
                    <Text style={styles.cardSubTitle}>Mínima: {props.medida.min} {props.medida.unidadMedida}</Text>
                    <Text style={styles.cardText}>Del día {formatDate(props.medida.fechaMin)} a las {formatTime(props.medida.fechaMin)} </Text>
                </View>
            </View>
        </View>
    );
};

export default ReportesClima = ({ route, navigation }) => {
    let reporteClima = route.params.reporteClima;

    const [reporte, setReporte] = useState(null);

    useEffect(() => {
        setReporte(reporteClima);
    }, [reporteClima]);

    return reporte && (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>{reporte.ubicacion.nombre}</Text>
            {reporte.medidas.length > 0 ? (
                <FlatList
                    style={{
                        marginBottom: 30,
                    }}
                    data={reporte.medidas}
                    renderItem={({ item }) => <CardReporte medida={item} />}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        justifyContent: "center",
    },
    mainCard: {
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    cardMainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardSubTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardText: {
        fontSize: 16,
    },
    cardContent: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#85C1E9'
    }
});