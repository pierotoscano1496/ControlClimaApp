import AsyncStorage from '@react-native-async-storage/async-storage';
import { RestEndpoints } from './Variables'

const login = async (userCredentials) => {
    const response = await fetch(`${RestEndpoints.Usuario.login}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else if (response.status === 401) {
        throw new Error('Usuario o contraseña incorrectos');
    }
    else {
        throw new Error('Error al iniciar sesión');
    }
};

const getUsuarioLogueado = async () => {
    const usuarioLogueado = await AsyncStorage.getItem("usuarioLogueado");
    return JSON.parse(usuarioLogueado);
};

const UsuarioService = {
    login,
    getUsuarioLogueado
};

export default UsuarioService;