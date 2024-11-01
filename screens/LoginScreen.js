import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Token JWT:', data.token);
        // Armazenar token e role no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', username.startsWith('admin_') ? 'admin' : 'user'); // Definindo a role com base no nome de usuário
        localStorage.setItem('username', username); // Armazenando o username no localStorage
        navigation.navigate('GraphScreen', { token: data.token, username }); // Passando o username para a GraphScreen
      } else {
        setErrorMessage(data.message || 'Erro no login');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar-se ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />

      {/* Botão de Registro */}
      <View style={styles.registerButton}>
        <Button title="Registrar" onPress={() => navigation.navigate('RegisterScreen')} />
      </View>

      {/* Botão de Recuperação de Senha */}
      <View style={styles.recoverButton}>
        <Button title="Recuperar Senha" onPress={() => navigation.navigate('RecoverScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
  error: { color: 'red' },
  registerButton: { marginTop: 10 }, // Estilo para adicionar espaço entre os botões
  recoverButton: { marginTop: 10 }, // Estilo para adicionar espaço entre os botões
});
