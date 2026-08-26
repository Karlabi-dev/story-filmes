import React from 'react';

import {
  ActivityIndicator,
  View
} from 'react-native';

import {
  Redirect,
  Stack,
  useSegments
} from 'expo-router';

import {
  AuthProvider,
  useAuth
} from '../contexts/AuthContext';


function Navegacao() {

  const {
    usuario,
    carregando
  } = useAuth();


  const segments = useSegments();


  if (carregando) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >

        <ActivityIndicator size="large" />

      </View>

    );

  }


  const estaNaAutenticacao =
    segments[0] === 'login' ||
    segments[0] === 'cadastro';


  if (!usuario && !estaNaAutenticacao) {

    return (
      <Redirect href="/login" />
    );

  }


  if (usuario && estaNaAutenticacao) {

    return (
      <Redirect href="/" />
    );

  }


  return (

    <Stack>

      <Stack.Screen
        name="index"
        options={{
          title: 'Filmes'
        }}
      />

      <Stack.Screen
        name="detalhes"
        options={{
          title: 'Detalhes'
        }}
      />

      <Stack.Screen
        name="carrinho"
        options={{
          title: 'Minha Lista'
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false
        }}
      />

      <Stack.Screen
        name="cadastro"
        options={{
          title: 'Cadastro'
        }}
      />

    </Stack>

  );

}


export default function RootLayout() {

  return (

    <AuthProvider>

      <Navegacao />

    </AuthProvider>

  );

}