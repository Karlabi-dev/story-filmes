import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  alterarStatusFilme,
  FilmeFirestore,
  observarFilmes,
  removerFilme,
} from "../services/firestore";

const STATUS = ["Vou assistir", "Assistindo", "Terminado"];

export default function CarrinhoScreen() {
  const [filmes, setFilmes] = useState<FilmeFirestore[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [menuAberto, setMenuAberto] = useState<string | null>(null);

  useEffect(() => {
    const pararDeObservar = observarFilmes((dados) => {
      setFilmes(dados);

      setCarregando(false);
    });

    return () => {
      pararDeObservar();
    };
  }, []);

  async function escolherStatus(id: string, novoStatus: string) {
    try {
      setMenuAberto(null);

      await alterarStatusFilme(id, novoStatus);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível alterar o status.");
    }
  }

  async function remover(id: string) {
    try {
      await removerFilme(id);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro", "Não foi possível remover o filme.");
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />

        <Text style={styles.mensagem}>Carregando minha lista...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎬 Minha Lista</Text>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id!}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum filme na lista.</Text>
        }
        renderItem={({ item }) => {
          const aberto = menuAberto === item.id;

          return (
            <View style={styles.item}>
              <Text style={styles.itemTitulo}>{item.titulo}</Text>

              <Text style={styles.itemInfo}>
                {item.ano} • {item.genero}
              </Text>

              <Text style={styles.label}>Status</Text>
              <TouchableOpacity
                style={styles.combo}
                onPress={() => {
                  if (aberto) {
                    setMenuAberto(null);
                  } else {
                    setMenuAberto(item.id!);
                  }
                }}
              >
                <Text style={styles.comboTexto}>{item.status}</Text>

                <Text>{aberto ? "▲" : "▼"}</Text>
              </TouchableOpacity>
              {aberto && (
                <View style={styles.opcoes}>
                  {STATUS.map((status) => (
                    <TouchableOpacity
                      key={status}
                      style={styles.opcao}
                      onPress={() => escolherStatus(item.id!, status)}
                    >
                      <Text style={styles.opcaoTexto}>{status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TouchableOpacity
                style={styles.botaoRemover}
                onPress={() => remover(item.id!)}
              >
                <Text style={styles.textoRemover}>Remover da lista</Text>
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
    backgroundColor: "#f5f5f5",
  },

  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  vazio: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 17,
    marginTop: 40,
  },

  item: {
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },

  itemTitulo: {
    fontSize: 19,
    fontWeight: "bold",
  },

  itemInfo: {
    color: "#666",
    marginTop: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 6,
  },

  combo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  comboTexto: {
    fontSize: 16,
  },

  opcoes: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden",
  },

  opcao: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  opcaoTexto: {
    fontSize: 16,
  },

  botaoRemover: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 18,
  },

  textoRemover: {
    color: "#fff",
    fontWeight: "bold",
  },

  mensagem: {
    marginTop: 15,
    fontSize: 16,
  },
});
