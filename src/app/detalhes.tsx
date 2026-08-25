import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Filme, useCart } from '../contexts/CartContext';

export default function DetalhesScreen() {
  const params = useLocalSearchParams<Record<keyof Filme, string>>();
  const { adicionarItem, estaNoCarrinho } = useCart();
  const filme: Filme = {
    id: params.id,
    titulo: params.titulo,
    ano: params.ano,
    genero: params.genero,
    descricao: params.descricao,
  };
  const adicionado = estaNoCarrinho(filme.id);

  function adicionarAoCarrinho() {
    adicionarItem(filme);
    Alert.alert('Pronto!', `${filme.titulo} foi adicionado ao carrinho.`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{filme.titulo}</Text>
      <Text style={styles.detalhe}><Text style={styles.negrito}>Ano: </Text>{filme.ano}</Text>
      <Text style={styles.detalhe}><Text style={styles.negrito}>Gênero: </Text>{filme.genero}</Text>
      <Text style={styles.descricao}>{filme.descricao}</Text>

      <TouchableOpacity style={[styles.botao, adicionado && styles.botaoDesabilitado]} onPress={adicionarAoCarrinho} disabled={adicionado}>
        <Text style={styles.textoBotao}>{adicionado ? 'Já está no carrinho' : 'Adicionar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoSecundario} onPress={() => router.push('/carrinho')}>
        <Text style={styles.textoBotaoSecundario}>Ver carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 30, fontWeight: 'bold', marginBottom: 25 },
  detalhe: { fontSize: 18, marginBottom: 15 },
  negrito: { fontWeight: 'bold' },
  descricao: { fontSize: 18, lineHeight: 28, marginTop: 10, marginBottom: 30 },
  botao: { backgroundColor: '#16a34a', padding: 15, borderRadius: 8, alignItems: 'center' },
  botaoDesabilitado: { backgroundColor: '#94a3b8' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoSecundario: { marginTop: 12, borderWidth: 1, borderColor: '#1d4ed8', padding: 14, borderRadius: 8, alignItems: 'center' },
  textoBotaoSecundario: { color: '#1d4ed8', fontSize: 16, fontWeight: 'bold' },
});
