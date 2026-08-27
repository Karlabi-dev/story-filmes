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

export default function LoginScreen() {
  const { entrar } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");

      return;
    }

    try {
      setCarregando(true);
      await entrar(email.trim(), senha);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎬 Story Filmes</Text>
      <Text style={styles.subtitulo}>Entre na sua conta</Text>

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

      <TouchableOpacity
        style={styles.botao}
        onPress={fazerLogin}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.textoLink}>Não possui conta? Cadastre-se</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 18,
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
    backgroundColor: "#1d4ed8",
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
