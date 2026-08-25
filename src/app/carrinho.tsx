import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useCart } from '../contexts/CartContext';

export default function CarrinhoScreen() {
  const { itens, removerItem } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛒 Meu Carrinho</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum filme foi adicionado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.informacoes}>
              <Text style={styles.itemTitulo}>{item.titulo}</Text>
              <Text style={styles.itemInfo}>{item.ano} • {item.genero}</Text>
            </View>
            <TouchableOpacity style={styles.botaoRemover} onPress={() => removerItem(item.id)}>
              <Text style={styles.textoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  vazio: { textAlign: 'center', color: '#64748b', fontSize: 17, marginTop: 40 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 10, elevation: 2 },
  informacoes: { flex: 1, marginRight: 12 },
  itemTitulo: { fontSize: 18, fontWeight: 'bold' },
  itemInfo: { color: '#666', marginTop: 5 },
  botaoRemover: { backgroundColor: '#dc2626', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  textoRemover: { color: '#fff', fontWeight: 'bold' },
});
