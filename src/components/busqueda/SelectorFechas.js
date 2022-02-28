export default SelectorFechas = (props) => {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [fechaInicio, setFechaInicio] = useState(today);
    const [fechaFin, setFechaFin] = useState(tomorrow);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tipoFecha, setTipoFecha] = useState(1); // Tipo 1: Fecha Inicio, Tipo 2: Fecha Fin
    const [isLoading, setLoading] = useState(false);

    const openDatePicker = (tipoFecha) => {
        setShowDatePicker(true);
        setTipoFecha(tipoFecha);
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

    const buscarClimas = async () => {
        if (fechaInicio && fechaFin) {
            //Buscar climas
            setLoading(true);
            const climasBuscados = await obtenerClimasPorFechas(fechaInicio, fechaFin);
            navigation.navigate("ClimasBuscados", {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            });
        } else {
            Alert.alert("Error", "Debe ingresar las fechas de inicio y fin");
        }
    };

    return (
        <View>
            <View>
                <TextInput
                    placeholder="Fecha inicial"
                    value={formatDate(fechaInicio)}
                    pointerEvents="none"
                />
                <Pressable onPress={() => openDatePicker(1)}>
                    <Text>{props.title}</Text>
                </Pressable>
            </View>
            <View>
                <TextInput
                    placeholder="Fecha final"
                    value={formatDate(fechaFin)}
                    pointerEvents="none"
                />
                <Pressable onPress={() => openDatePicker(2)}>
                    <Text>Seleccionar Fecha Fin</Text>
                </Pressable>
            </View>
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
            <Button title="Buscar" onPress={buscarClimas} />
        </View>
    );
}