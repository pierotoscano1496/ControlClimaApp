
import React, { createContext, useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuarioService from '../../services/UsuarioService';

export default Login = ({ navigation }) => {
    const [credencial, setCredencial] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useContext(() => {
        checkUsuarioLogueado();
    });

    const checkUsuarioLogueado = async () => {
        const usuarioLogueado = await AsyncStorage.getItem("usuarioLogueado");
        if (usuarioLogueado) {
            setUser(JSON.parse(usuarioLogueado));
            navigation.navigate('MainNavigator');
        }
    };

    const login = async () => {
        setLoading(true);
        try {
            const userCredentials = {
                credencial: credencial,
                password: password
            };
            const user = await UsuarioService.login(userCredentials);
            setErrorMessage(null);
            setUser(user);
            await AsyncStorage.setItem('usuarioLogueado', JSON.stringify(user));
            navigation.navigate('MainNavigator');
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ddd',
            padding: 10,
            width: '100%',
            marginBottom: 10
        },
        buttonContainer: {
            backgroundColor: '#33C9FF',
            margin: 20
        }
    });

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder="Correo o código"
                value={credencial}
                onChangeText={setCredencial}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
            <Button title="Ingresar" onPress={login}></Button>
        </View>
    )
}