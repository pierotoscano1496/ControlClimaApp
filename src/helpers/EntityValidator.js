import ValidationModelException from "../models/exceptions/ValidationModelException";

function validateEntity(entity, keys) {
    if (entity) {
        if (Object.keys.length > 0) {
            let validation = true;
            let keyNoValidated = null;
            keys.every(key => {
                if (key in entity) {
                    if (!entity[key]) {
                        keyNoValidated = key;
                        validation = false;
                        return false;
                    }
                    return true;
                }
                keyNoValidated = key;
                validation = false;
                return false;
            });
            return { validation, keyNoValidated };
        } else {
            return { validation: false, keyNoValidated: null };
        }
    } else {
        return { validation: false, keyNoValidated: null };;
    }
}

export const validateClima = (clima) => {
    const requiredKeys = ["fechaRegistro", "temperatura", "intensidadLuz", "intensidadViento"];
    const validator = validateEntity(clima, requiredKeys);
    if (!validator.validation) {
        let messageError = '';
        if (validator.keyNoValidated) {
            switch (validator.keyNoValidated) {
                case "id":
                    messageError = "El id es requerido";
                    break;
                case "fechaRegistro":
                    messageError = "La fecha de registro es requerida";
                    break;
                case "temperatura":
                    messageError = "La temperatura es requerida";
                    break;
                case "intensidadLuz":
                    messageError = "La intensidad de luz es requerida";
                    break;
                case "intensidadViento":
                    messageError = "La intensidad de viento es requerida";
                    break;
            }
        } else {
            messageError = "Los datos del clima son requeridos";
        }

        throw new ValidationModelException(messageError);
    }
    return validator.validation;
};

export const validateUbicacion = (ubicacion) => {
    const requiredKeys = ["id", "latitud", "longitud"];
    const validator = validateEntity(ubicacion, requiredKeys);
    if (!validator.validation) {
        let messageError = '';
        if (validator.keyNoValidated) {
            switch (validator.keyNoValidated) {
                case "id":
                    messageError = "El id es requerido";
                    break;
                case "latitud":
                    messageError = "La latitud es requerida";
                    break;
                case "longitud":
                    messageError = "La longitud es requerida";
                    break;
            }
        } else {
            messageError = "Los datos de la ubicación son requeridos";
        }

        throw new ValidationModelException(messageError);
    }
    return validator.validation;
};

export const validateUsuario = (usuario) => {
    const requiredKeys = ["id", "codigo", "nombres", "apellidos", "correo", "contrasena", "fechaNacimiento"];
    const validator = validateEntity(usuario, requiredKeys);
    if (!validator.validation) {
        let messageError = '';
        if (validator.keyNoValidated) {
            switch (validator.keyNoValidated) {
                case "id":
                    messageError = "El id es requerido";
                    break;
                case "codigo":
                    messageError = "El código es requerido";
                    break;
                case "nombres":
                    messageError = "Los nombres son requerida";
                    break;
                case "apellidos":
                    messageError = "Los apellidos son requerida";
                    break;
                case "correo":
                    messageError = "El correo es requerido";
                    break;
                case "contrasena":
                    messageError = "La contraseña es requerida";
                    break;
                case "fechaNacimiento":
                    messageError = "La fecha de nacimiento es requerida";
                    break;
            }
        } else {
            messageError = "Los datos del usuario son requeridos";
        }

        throw new ValidationModelException(messageError);
    }
    return validator.validation;
};