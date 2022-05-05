const urlRest = "https://4a4d-190-237-204-45.ngrok.io/api/";

const RestEndpoints = {
    Usuario: {
        login: `${urlRest}usuario/login`,
    },
    Clima: {
        main: `${urlRest}clima`,
        obtenerPorUsuario: `${urlRest}clima/usuario/`,
        obtenerPorUbicacion: `${urlRest}clima/ubicacion/`,
        obtenerDetalle: `${urlRest}clima/detalle`,
        consultaFormulario: `${urlRest}clima/consulta/`,
        reporte: `${urlRest}clima/reporte/`,
    },
    Ubicacion: {
        main: `${urlRest}ubicacion`,
        obtener: `${urlRest}ubicacion/`
    },
    Sensor: {
        obtenerPorUbicacion: `${urlRest}sensor/datos-clima/`,
    }
};

export { RestEndpoints };