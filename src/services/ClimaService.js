import { RestEndpoints } from './Variables';
import { validateClima } from '../helpers/EntityValidator';
import { formatDatePrimitive } from '../helpers/DateTimeformat';

const obtenerPorUsuario = async (idUsuario) => {
    const response = await fetch(`${RestEndpoints.Clima.obtenerPorUsuario}${idUsuario}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw new Error('Error al obtener climas');
};

const obtenerPorFormulario = async (idUsuario, fechaInicio, fechaFin, idUbicacion) => {
    if (idUsuario && fechaInicio && fechaFin) {
        const response = await fetch(`${RestEndpoints.Clima.consultaFormulario}${idUsuario}/${formatDatePrimitive(fechaInicio)}/${formatDatePrimitive(fechaFin)}/${idUbicacion ? idUbicacion : ''}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            let errorMessage = '';
            switch (response.status) {
                case 404:
                    errorMessage = 'No se encontraron resultados';
                    break;
                case 500:
                    errorMessage = 'Error al obtener climas';
                    break;
                default:
                    errorMessage = 'Error desconocido';
                    break;
            }
            throw new Error(errorMessage);
        }
    } else {
        throw new Error('Fechas no definidas');
    }
};

const reporte = async (idUbicacion, fechaInicio, fechaFin) => {
    const response = await fetch(`${RestEndpoints.Clima.reporte}${idUbicacion}/${formatDatePrimitive(fechaInicio)}/${formatDatePrimitive(fechaFin)}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        let errorMessage = "";
        switch (response.status) {
            case 404:
                errorMessage = "No se encontraron resultados";
                break;
            case 500:
                errorMessage = "Error al obtener climas";
                break;
        }
        throw new Error(errorMessage);
    }
};

const registrar = async (clima) => {
    if (validateClima(clima)) {
        console.log(clima);
        const response = await fetch(RestEndpoints.Clima.main, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clima)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al registrar clima');
        }
    }
};

const ClimaService = {
    obtenerPorUsuario,
    obtenerPorFormulario,
    reporte,
    registrar
};

export default ClimaService;