import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { Filme, useCart } from '../contexts/CartContext';

export default function HomeScreen() {

  const { itens } = useCart();
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function buscarFilmes() {

    try {
      setCarregando(true);
      setErro(null);

      const resposta = await fetch(
        'https://api.tvmaze.com/shows'
      );
      if (!resposta.ok) {
        throw new Error('Erro ao buscar filmes');
      }

      const dados = await resposta.json();
      const filmesFormatados: Filme[] = dados.map((item: any) => ({
        id: String(item.id),

        titulo: item.name,

        ano: item.premiered
          ? item.premiered.substring(0, 4)
          : 'Sem ano',

        genero: item.genres.length > 0
          ? item.genres.join(', ')
          : 'Sem gênero',

        descricao: item.summary
          ? item.summary.replace(/<[^>]*>/g, '')
          : 'Sem descrição',
      }));
      setFilmes(filmesFormatados);
    } catch (error) {
      console.log(error)
      setErro('Não foi possível carregar os filmes.');

    } finally {
      setCarregando(false);

    }

  }

  useEffect(() => {
    buscarFilmes();

  }, []);

  function abrirDetalhes(item: Filme) {

    router.push({
      pathname: '/detalhes',
      params: item,
    });

  }
  if (carregando) {

    return (
      <View style={styles.centro}>
        <ActivityIndicator
          size="large"
        />
        <Text style={styles.mensagem}>
          Carregando filmes...
        </Text>

      </View>
    );
  }

  if (erro) {

    return (
      <View style={styles.centro}>

        <Text style={styles.erro}>
          {erro}
        </Text>
        <TouchableOpacity
          style={styles.botaoRecarregar}
          onPress={buscarFilmes}
        >
          <Text style={styles.textoBotaoRecarregar}>
            Recarregar
          </Text>

        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>

        <Text style={styles.titulo}>
          🎬 Lista de Filmes
        </Text>
        <View style={styles.botoesCabecalho}>
          <TouchableOpacity
            style={styles.botaoRecarregar}
            onPress={buscarFilmes}
          >
            <Text style={styles.textoBotaoRecarregar}>
              Recarregar
            </Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoCarrinho}
            onPress={() => router.push('/carrinho')}
          >
            <Text style={styles.textoBotaoCarrinho}>
              Carrinho ({itens.length})
            </Text>

          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.item}
            onPress={() => abrirDetalhes(item)}
          >
            <Text style={styles.itemTitulo}>
              {item.titulo}
            </Text>

            <Text style={styles.itemInfo}>
              {item.ano} • {item.genero}
            </Text>

          </TouchableOpacity>
        )}
      />
    </View>
  );

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  cabecalho: {
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  botoesCabecalho: {
    flexDirection: 'row',
    gap: 10,
  },

  botaoCarrinho: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  textoBotaoCarrinho: {
    color: '#fff',
    fontWeight: 'bold',
  },

  botaoRecarregar: {
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  textoBotaoRecarregar: {
    color: '#fff',
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },

  itemTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  itemInfo: {
    marginTop: 5,
    color: '#666',
    fontSize: 15,
  },

  mensagem: {
    marginTop: 15,
    fontSize: 16,
  },

  erro: {
    fontSize: 17,
    marginBottom: 15,
  },

});