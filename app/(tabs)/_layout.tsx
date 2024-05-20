import { Provider } from 'react-redux';
import {store} from './userSlice'; // import your store configuration here

import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            {/* Wrap your component with the Provider component */}
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="login"
                    options={{
                        title: 'Login',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                name={focused ? 'person-circle' : 'person-circle-outline'}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </Provider>
    );
}
