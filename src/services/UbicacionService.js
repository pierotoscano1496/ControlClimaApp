import ResourceNotFoundException from '../models/exceptions/ResourceNotFoundException';
import { RestEndpoints } from './Variables'

const obtener = async (id) => {
    const response = await fetch(`${RestEndpoints.Ubicacion.obtener}${id ? id : ''}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 404) {
        throw new ResourceNotFoundException('No se encontraron resultados');
    } else {
        throw new Error('Error al obtener ubicaciones');
    }
};

const UbicacionService = {
    obtener
};

export default UbicacionService;