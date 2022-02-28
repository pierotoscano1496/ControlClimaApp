const urlRest = "http://localhost:8080/api/";

const RestEndpoints = {
    Climas: {
        obtener: `${urlRest}/clima/buscarClima`,
        obtenerDetalle: `${urlRest}/clima/detalle`,
    }
};

export { RestEndpoints };