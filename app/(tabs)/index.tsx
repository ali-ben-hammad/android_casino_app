import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setUser} from './userSlice';
import {router} from "expo-router";


const getRandomFortune = () => Math.floor(Math.random() * 91) + 10;

const diceImages = {
    1: require('../../assets/images/dice-six-faces-one.png'),
    2: require('../../assets/images/dice-six-faces-two.png'),
    3: require('../../assets/images/dice-six-faces-three.png'),
    4: require('../../assets/images/dice-six-faces-four.png'),
    5: require('../../assets/images/dice-six-faces-five.png'),
    6: require('../../assets/images/dice-six-faces-six.png'),

};

const HomeScreen = ({ navigation } : any) => {

    const { name, amount } = useSelector(selectUser);
    const dispatch = useDispatch();

    const [playerFortune, setPlayerFortune] = useState(10);
    const [casinoFortune, setCasinoFortune] = useState(getRandomFortune());
    const [lastDiceResult, setLastDiceResult] = useState({
        diceResult: 0,
        playerWin: false,
    });
    const diceAnimation = useRef(new Animated.Value(0)).current;



    const rollDice = () => {
        const dice = Math.floor(Math.random() * 6) + 1;
        const playerWin = dice === 2 || dice === 3;

        Animated.sequence([
            Animated.timing(diceAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(diceAnimation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (playerWin) {
                const newAmount = amount + 1;

                dispatch(setUser({ name, amount: newAmount }));
                setPlayerFortune(newAmount);
                setCasinoFortune(casinoFortune - 1);
            } else {
                const newAmount = amount - 1;
                dispatch(setUser({ name, amount: newAmount }));
                setPlayerFortune(newAmount);
                setCasinoFortune(casinoFortune + 1);
            }
            setLastDiceResult({ diceResult: dice, playerWin });
        });
    };

    if (playerFortune <= 0) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <Text className="text-2xl font-bold mb-4">Vous avez perdu !</Text>
                <TouchableOpacity onPress={() => {
                    // reset the user state
                    dispatch(setUser({ name: '', amount: 0 }));
                    router.push('login')
                }} className="bg-blue-500 py-2 px-8 rounded-lg">
                    <Text className="text-white text-xl">Rejouer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (casinoFortune <= 0) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <Text className="text-2xl font-bold mb-4">Vous avez gagné !</Text>
                <TouchableOpacity onPress={() => router.push('login')} className="bg-blue-500 py-2 px-8 rounded-lg">
                    <Text className="text-white text-xl">Rejouer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const diceSpin = diceAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handlelogout = () => {
        router.push('login');
    }

    return (
        <View className="flex flex-1 justify-center items-center">
            <Text className="text-2xl font-bold mb-4">Bienvenue au Casino</Text>
            <Text className="text-xl mb-4">Nom du Joueur: {name}</Text>
            <Text className="text-xl mb-4">Fortune du Joueur: {amount}€</Text>
            <Text className="text-xl mb-4">Fortune du Casino: {casinoFortune}€</Text>
            <Animated.View style={{ transform: [{ rotate: diceSpin }] }}>
                {lastDiceResult && (
                    <Image source={diceImages[lastDiceResult.diceResult]} className="w-20 h-20" />
                )}
            </Animated.View>
            <TouchableOpacity onPress={rollDice} className="bg-blue-500 py-2 px-8 rounded-lg mt-4">
                <Text className="text-white text-xl">Lancer le dé</Text>
            </TouchableOpacity>
            {lastDiceResult && (
                <View className="mt-4">
                    <Text className="text-lg">Résultat du dernier lancer: {lastDiceResult.diceResult}</Text>
                    <Text className="text-lg">{lastDiceResult.playerWin ? 'Victoire du Joueur' : 'Victoire du Casino'}</Text>
                </View>
            )}
            <TouchableOpacity onPress={handlelogout} className="bg-blue-500 py-2 px-8 rounded-lg mb-2 mt-4">
                <Text className="text-white text-xl">logout</Text>
            </TouchableOpacity>

        </View>
    );
};

export default HomeScreen;
