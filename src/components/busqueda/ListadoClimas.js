import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { formatDate } from "../../helpers/DateTimeformat";

export default ListadoClimas = ({ route, navigation }) => {
    let climasBuscados = route.params.climas;
    let ubicacionSelected = route.params.ubicacion;

    const [climas, setClimas] = useState([]);
    const [ubicacion, setUbicacion] = useState(null);

    useEffect(() => {
        setClimas(climasBuscados);
        setUbicacion(ubicacionSelected);
    }, [climasBuscados]);

    const verClimaDetalle = (idClima) => {
        const climaSelected = climas.find((clima) => clima.id === idClima);
        Alert.alert('Datos del clima', `Fecha de registro: ${formatDate(climaSelected.fechaRegistro)}
        \nUbicación: ${climaSelected.ubicacion.nombre ? climaSelected.ubicacion.nombre : 'Sin nombre'}
        \nTemperatura: ${climaSelected.temperatura} °C
        \nIntensidad de luz: ${climaSelected.intensidadLuz} lx
        \nIntensidad de viento: ${climaSelected.intensidadViento} m/s
        ${climaSelected.intensidadCaudal ? `\nIntensidad de caudal: ${climaSelected.intensidadCaudal} m/s` : ''}`);
    };

    const Item = (props) => {
        let cardColor = '';
        if (props.temperatura <= 0) {
            cardColor = '#D6EAF8';
        } else if (props.temperatura > 0 && props.temperatura <= 10) {
            cardColor = '#D5F5E3';
        } else if (props.temperatura > 10 && props.temperatura <= 20) {
            cardColor = '#E5E8E8';
        } else if (props.temperatura > 20 && props.temperatura <= 30) {
            cardColor = '#FCF3CF';
        } else if (props.temperatura > 30) {
            cardColor = '#F6DDCC';
        }

        return (
            <Card containerStyle={{
                backgroundColor: cardColor,
                borderWidth: 2,
                borderColor: '#ABB2B9',
                borderRadius: 10,
            }}>
                <Text style={{ color: '#273746' }}>N° {props.index + 1}</Text>
                <Text style={{ color: '#273746' }}>Registrado el {formatDate(props.fechaRegistro)}</Text>
                <Button title="Ver" onPress={() => verClimaDetalle(props.idClima)} />
            </Card>
        );
    };

    const renderItem = ({ item, index }) => {
        return <Item index={index} idClima={item.id} fechaRegistro={item.fechaRegistro} temperatura={item.temperatura} />
    };

    return (
        <View style={style.container}>
            <Text style={{ ...style.bold, ...style.fontMedium }}>{ubicacion ? `Climas de ${ubicacion.nombre}` : `Listado de climas`}</Text>

            {climas.length > 0 && (
                <FlatList
                    data={climas}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        margin: 10,
    },
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
    contentItem: {
        backgroundColor: '#99ccff',
        borderWidth: 2,
        borderColor: '#99ccff',
        borderRadius: 10,
    }
});