import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetalhesScreen() {
  const {
    titulo,
    ano,
    genero,
    descricao,
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <Text style={styles.detalhe}>
        <Text style={styles.negrito}>Ano: </Text>
        {ano}
      </Text>

      <Text style={styles.detalhe}>
        <Text style={styles.negrito}>Gênero: </Text>
        {genero}
      </Text>

      <Text style={styles.descricao}>{descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  detalhe: {
    fontSize: 18,
    marginBottom: 15,
  },

  negrito: {
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 18,
    lineHeight: 28,
    marginTop: 10,
  },
});