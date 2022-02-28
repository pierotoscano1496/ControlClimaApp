import { RestEndpoints } from './Variables'

const obtenerClimasPorFechas = async (fechaInicio, fechaFin) => {
    const response = await fetch(`${RestEndpoints.Climas.obtener}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    const data = await response.json();
    return data;
};

export { obtenerClimasPorFechas };