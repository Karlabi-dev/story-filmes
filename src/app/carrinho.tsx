import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  ItemCarrinho,
  buscarCarrinho,
  removerDoCarrinho,
  alterarStatus
} from '../services/api';


const STATUS = [
  'Vou assistir',
  'Assistindo',
  'Terminado'
];


export default function CarrinhoScreen() {

  const [itens, setItens] =
    useState<ItemCarrinho[]>([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState<string | null>(null);

  // Guarda o ID do filme que está
  // com o combobox aberto
  const [menuAberto, setMenuAberto] =
    useState<number | null>(null);


  async function carregarCarrinho() {

    try {

      setCarregando(true);

      setErro(null);

      const dados = await buscarCarrinho();

      setItens(dados);

    } catch (error) {

      console.log(error);

      setErro(
        'Não foi possível carregar os filmes.'
      );

    } finally {

      setCarregando(false);

    }

  }


  async function escolherStatus(
    id: number,
    novoStatus: string
  ) {

    try {

      // Fecha o combobox
      setMenuAberto(null);

      // Faz o PUT
      await alterarStatus(
        id,
        novoStatus
      );

      // Busca novamente os filmes
      await carregarCarrinho();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível alterar o status.'
      );

    }

  }


  async function remover(id: number) {

    try {

      await removerDoCarrinho(id);

      await carregarCarrinho();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível remover o filme.'
      );

    }

  }


  useEffect(() => {

    carregarCarrinho();

  }, []);


  if (carregando) {

    return (

      <View style={styles.centro}>

        <ActivityIndicator size="large" />

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
          onPress={carregarCarrinho}
        >

          <Text style={styles.textoBotao}>
            Tentar novamente
          </Text>

        </TouchableOpacity>

      </View>

    );

  }


  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        🎬 Minha Lista
      </Text>


      <FlatList

        data={itens}

        keyExtractor={(item) =>
          String(item.id)
        }

        ListEmptyComponent={

          <Text style={styles.vazio}>
            Nenhum filme foi adicionado.
          </Text>

        }

        renderItem={({ item }) => {

          const aberto =
            menuAberto === item.id;


          return (

            <View style={styles.item}>

              <Text style={styles.itemTitulo}>
                {item.titulo}
              </Text>


              <Text style={styles.itemInfo}>
                {item.ano} • {item.genero}
              </Text>


              <Text style={styles.label}>
                Status
              </Text>


              {/* COMBOBOX */}

              <TouchableOpacity

                style={styles.combo}

                onPress={() => {

                  if (aberto) {

                    setMenuAberto(null);

                  } else {

                    setMenuAberto(item.id);

                  }

                }}
              >

                <Text style={styles.comboTexto}>
                  {item.status}
                </Text>

                <Text>
                  {aberto ? '▲' : '▼'}
                </Text>

              </TouchableOpacity>


              {/* OPÇÕES DO COMBOBOX */}

              {aberto && (

                <View style={styles.opcoes}>

                  {STATUS.map((status) => (

                    <TouchableOpacity

                      key={status}

                      style={styles.opcao}

                      onPress={() =>
                        escolherStatus(
                          item.id,
                          status
                        )
                      }
                    >

                      <Text style={styles.opcaoTexto}>
                        {status}
                      </Text>

                    </TouchableOpacity>

                  ))}

                </View>

              )}


              <TouchableOpacity

                style={styles.botaoRemover}

                onPress={() =>
                  remover(item.id)
                }
              >

                <Text style={styles.textoRemover}>
                  Remover da lista
                </Text>

              </TouchableOpacity>

            </View>

          );

        }}

      />

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },

  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },

  vazio: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 17,
    marginTop: 40
  },

  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2
  },

  itemTitulo: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  itemInfo: {
    color: '#666',
    marginTop: 5
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 6
  },

  combo: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  comboTexto: {
    fontSize: 16
  },

  opcoes: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden'
  },

  opcao: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },

  opcaoTexto: {
    fontSize: 16
  },

  botaoRemover: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18
  },

  textoRemover: {
    color: '#fff',
    fontWeight: 'bold'
  },

  mensagem: {
    marginTop: 15,
    fontSize: 16
  },

  erro: {
    fontSize: 17,
    marginBottom: 15
  },

  botaoRecarregar: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },

});