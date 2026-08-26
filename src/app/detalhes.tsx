import React, {
  useCallback,
  useState
} from 'react';

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  router,
  useFocusEffect,
  useLocalSearchParams
} from 'expo-router';

import { Filme } from '../contexts/CartContext';

import {
  adicionarFilme,
  filmeJaExiste
} from '../services/firestore';


export default function DetalhesScreen() {

  const params =
    useLocalSearchParams<Record<keyof Filme, string>>();


  const filme: Filme = {
    id: params.id,
    titulo: params.titulo,
    ano: params.ano,
    genero: params.genero,
    descricao: params.descricao,
  };


  // false = não está na lista
  // true = já está na lista
  const [adicionado, setAdicionado] =
    useState(false);


  // Usado enquanto estamos verificando o Firestore
  const [verificando, setVerificando] =
    useState(true);


  // Usado enquanto estamos adicionando
  const [salvando, setSalvando] =
    useState(false);


  // Verifica no Firestore se o filme já existe
  async function verificarFilme() {

    try {

      setVerificando(true);


      const existe =
        await filmeJaExiste(filme.id);


      setAdicionado(existe);


    } catch (error) {

      console.log(
        'Erro ao verificar filme:',
        error
      );


    } finally {

      setVerificando(false);

    }

  }


  // Executa toda vez que voltamos para essa tela
  useFocusEffect(

    useCallback(() => {

      verificarFilme();

    }, [filme.id])

  );


  async function salvarFilme() {

    // Segurança extra:
    // se já estiver adicionado, não faz nada
    if (adicionado) {
      return;
    }


    try {

      setSalvando(true);


      await adicionarFilme(filme);


      // Depois de adicionar,
      // muda o estado imediatamente
      setAdicionado(true);


      Alert.alert(
        'Pronto!',
        `${filme.titulo} foi adicionado à sua lista.`
      );


    } catch (error) {

      console.log(error);


      Alert.alert(
        'Erro',
        'Não foi possível adicionar o filme.'
      );


    } finally {

      setSalvando(false);

    }

  }


  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        {filme.titulo}
      </Text>


      <Text style={styles.detalhe}>

        <Text style={styles.negrito}>
          Ano:{' '}
        </Text>

        {filme.ano}

      </Text>


      <Text style={styles.detalhe}>

        <Text style={styles.negrito}>
          Gênero:{' '}
        </Text>

        {filme.genero}

      </Text>


      <Text style={styles.descricao}>
        {filme.descricao}
      </Text>


      {/* BOTÃO ADICIONAR */}

      <TouchableOpacity

        style={[
          styles.botao,

          adicionado &&
            styles.botaoAdicionado
        ]}

        onPress={salvarFilme}

        disabled={
          adicionado ||
          salvando ||
          verificando
        }
      >

        {salvando || verificando ? (

          <ActivityIndicator
            color="#fff"
          />

        ) : (

          <Text style={styles.textoBotao}>

            {adicionado
              ? 'Filme adicionado'
              : 'Adicionar à minha lista'}

          </Text>

        )}

      </TouchableOpacity>


      {/* BOTÃO VER LISTA */}

      <TouchableOpacity

        style={styles.botaoSecundario}

        onPress={() =>
          router.push('/carrinho')
        }
      >

        <Text
          style={styles.textoBotaoSecundario}
        >
          Ver minha lista
        </Text>

      </TouchableOpacity>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25
  },

  detalhe: {
    fontSize: 18,
    marginBottom: 15
  },

  negrito: {
    fontWeight: 'bold'
  },

  descricao: {
    fontSize: 18,
    lineHeight: 28,
    marginTop: 10,
    marginBottom: 30
  },


  // VERDE
  botao: {
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },


  // CINZA
  botaoAdicionado: {
    backgroundColor: '#94a3b8'
  },


  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },


  botaoSecundario: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#1d4ed8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },


  textoBotaoSecundario: {
    color: '#1d4ed8',
    fontSize: 16,
    fontWeight: 'bold'
  }

});