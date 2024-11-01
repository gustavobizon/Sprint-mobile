import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const RecoverScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [dogName, setDogName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordRecovered, setIsPasswordRecovered] = useState(false); // Estado para controlar a recuperação

    const handleRecoverPassword = async () => {
        try {
            const response = await fetch('http://localhost:3000/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, dogName }),
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage(`Usuário verificado com sucesso!`); // Mensagem de sucesso
                setIsPasswordRecovered(true); // Ativar campo para nova senha
            } else {
                setErrorMessage(data.message); // Mensagem de erro
            }
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao recuperar a senha.');
        }
    };

    const handleChangePassword = async () => {
        try {
            const response = await fetch('http://localhost:3000/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage(`Senha alterada com sucesso!`); // Mensagem de sucesso
                // Redirecionar ou limpar os campos
                setUsername('');
                setDogName('');
                setNewPassword('');
                setIsPasswordRecovered(false); // Resetando o estado
            } else {
                setErrorMessage(data.message); // Mensagem de erro
            }
        } catch (error) {
            setErrorMessage('Erro ao mudar a senha.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Recuperar Senha</Text>
            {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

            {!isPasswordRecovered ? (
                <>
                    <TextInput
                        placeholder="Nome de usuário"
                        value={username}
                        onChangeText={setUsername}
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                    />
                    <TextInput
                        placeholder="Nome que daria a um cachorro"
                        value={dogName}
                        onChangeText={setDogName}
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                    />
                    <Button title="Recuperar Senha" onPress={handleRecoverPassword} />
                </>
            ) : (
                <>
                    <TextInput
                        placeholder="Nova Senha"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 }}
                    />
                    <Button title="Trocar Senha" onPress={handleChangePassword} />
                </>
            )}
        </View>
    );
};

export default RecoverScreen;
