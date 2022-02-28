
import React, { createContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default Login = ({ navigation }) => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const userContext = createContext();

    const login = () => {
        navigation.navigate('BuscarClima');
        /* setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    credential,
                    password,
                    secretWord
                })
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setUser(data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } */
    }

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

    /* return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.error}>{error}</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={credential}
                    onChangeText={setCredential}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Palabra secreta"
                    value={key}
                    onChangeText={setKey}
                />
                <Button title="Ingresar" style onPress={login} />
            </View>
        </View>
    ); */
    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder="Correo o código"
                value={credential}
                onChangeText={setCredential}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                placeholder="Palabra secreta"
                value={key}
                onChangeText={setKey}
            />
            <Button title="Ingresar" onPress={login}></Button>
        </View>
    )
}