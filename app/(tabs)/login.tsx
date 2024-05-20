import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function  LoginScreen({ navigation }: any){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (username :string, password: string) => {
        try {
            const user = await AsyncStorage.getItem(username);
            if (user !== null && JSON.parse(user).password === password) {
                // Authentication successful
            } else {
                // Authentication failed
            }
        } catch (error) {
            console.error(error);
        }
        router.push('/');
    };

    return (
        <View className="flex-1 justify-center items-center bg-gray-100 p-4">
            <Text className="text-4xl font-bold mb-8">Ruine de Joueur</Text>
            <TextInput
                className="w-full border rounded-lg py-4 px-6 mb-4 text-xl"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                className="w-full border rounded-lg py-4 px-6 mb-8 text-xl"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                className="rounded-full bg-blue-500 py-4 px-8 hover:bg-blue-600 active:bg-blue-700"
                onPress={()=>handleLogin(username, password)}
                activeOpacity={0.8}
            >
                <Text className="text-white font-bold text-xl tracking-wide">
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};
