import React, { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function CadastroScreen() {
  const { cadastrar } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerCadastro() {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos.");

      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não são iguais.");

      return;
    }

    if (senha.length < 6) {
      Alert.alert("Atenção", "A senha deve possuir pelo menos 6 caracteres.");

      return;
    }

    try {
      setCarregando(true);

      await cadastrar(email.trim(), senha);

      Alert.alert("Pronto!", "Sua conta foi criada.");
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível criar a conta.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>

      <Text style={styles.subtitulo}>Crie sua conta no Story Filmes</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={fazerCadastro}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => router.back()}>
        <Text style={styles.textoLink}>Já possui conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f5f5f5",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 17,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  botao: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  link: {
    marginTop: 20,
    alignItems: "center",
  },

  textoLink: {
    color: "#1d4ed8",
    fontSize: 16,
  },
});
