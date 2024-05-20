import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";
import {useDispatch} from 'react-redux';
import {setUser} from './userSlice';


const LoginScreen = ({navigation}: any) => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (username.length < 4 || password.length < 4) {
            setError('Username and password must be at least 4 characters long.');
            return;
        }
        const users = await AsyncStorage.getItem('users');
        if (!users) {
            setError('No users found. Please sign up.');
        } else {
            const existingUsers = JSON.parse(users);
            const matchingUser = existingUsers.find(user => user.name === username && user.password === password);
            if (matchingUser) {
                dispatch(setUser(matchingUser));
                setError('');
                router.push('/');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        }
    };

    const handleSignUp = async () => {
        if (username.length < 4 || password.length < 4) {
            setError('Username and password must be at least 4 characters long.');
            return;
        }
        const user = {
            name: username,
            password: password,
            amount: 15
        };
        const users = await AsyncStorage.getItem('users');
        if (!users) {
            await AsyncStorage.setItem('users', JSON.stringify([user]));
        } else {
            const existingUsers = JSON.parse(users);
            existingUsers.push(user);
            await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
        }
        dispatch(setUser(user));
        setError('');
        router.push('/');
    };


    return (
        <View className="flex flex-1 justify-center items-center p-4">
            <Text className="text-2xl font-bold mb-6">Ruine de Joueur</Text>
            {error ? (
                <Text className="text-red-500 mb-4">{error}</Text>
            ) : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                className="mb-4 px-4 py-2 border rounded"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="mb-4 px-4 py-2 border rounded"
            />
            <TouchableOpacity onPress={handleLogin} className="bg-blue-500 py-2 px-8 rounded-lg mb-2">
                <Text className="text-white text-xl">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} className="bg-green-500 py-2 px-8 rounded-lg">
                <Text className="text-white text-xl">Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
    },
});

export default LoginScreen;
