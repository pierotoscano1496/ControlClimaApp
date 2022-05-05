import BadGatewayException from "../models/exceptions/BadGatewayException";
import { RestEndpoints } from "./Variables";

const consultarParametrosClimaUbicacion = async (idUbicacion) => {
    const response = await fetch(`${RestEndpoints.Sensor.obtenerPorUbicacion}${idUbicacion}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 502) {
        throw BadGatewayException('Error del servidor IoT');
    } else {
        throw Error('Error al obtener parametros clima');
    }
};

const SensorService = {
    consultarParametrosClimaUbicacion
};

export default SensorService;