import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dogName, setDogName] = useState('');
  const [role, setRole] = useState('user'); // Estado para a role
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (role === 'admin' && !username.startsWith('admin_')) {
      setErrorMessage('Você não pode ser admin');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, dogName, role }), // Incluindo a role
      });
      
      const data = await response.json();
      console.log(data); // Adicionado para debugar a resposta do servidor

      if (response.ok) {
        navigation.navigate('LoginScreen');
      } else {
        setErrorMessage(data.message || 'Erro no registro');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar-se ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registrar</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Nome que daria para um cachorro"
        value={dogName}
        onChangeText={setDogName}
      />
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Usuário" value="user" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
  error: { color: 'red' },
  picker: { height: 50, width: '100%', marginBottom: 20 },
});
