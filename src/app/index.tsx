import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';

const filmes = [
  {
    id: '1',
    titulo: 'Interestelar',
    ano: '2014',
    genero: 'Ficção científica',
    descricao:
      'Uma equipe de astronautas viaja pelo espaço em busca de um novo lar para a humanidade.',
  },
  {
    id: '2',
    titulo: 'Vingadores: Ultimato',
    ano: '2019',
    genero: 'Ação',
    descricao:
      'Os Vingadores precisam enfrentar as consequências da batalha contra Thanos.',
  },
  {
    id: '3',
    titulo: 'Toy Story',
    ano: '1995',
    genero: 'Animação',
    descricao:
      'Brinquedos ganham vida quando seus donos não estão por perto.',
  },
  {
    id: '4',
    titulo: 'Batman: O Cavaleiro das Trevas',
    ano: '2008',
    genero: 'Ação',
    descricao:
      'Batman enfrenta um perigoso criminoso conhecido como Coringa.',
  },
  {
    id: '5',
    titulo: 'Homem-Aranha: Sem Volta para Casa',
    ano: '2021',
    genero: 'Aventura',
    descricao:
      'Peter Parker precisa lidar com as consequências de sua identidade ter sido revelada.',
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎬 Lista de Filmes</Text>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: '/detalhes' as any,
                params: {
                  id: item.id,
                  titulo: item.titulo,
                  ano: item.ano,
                  genero: item.genero,
                  descricao: item.descricao,
                },
              })
            }
          >
            <Text style={styles.itemTitulo}>{item.titulo}</Text>

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
    padding: 50,
    backgroundColor: '#f5f5f5',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
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
});