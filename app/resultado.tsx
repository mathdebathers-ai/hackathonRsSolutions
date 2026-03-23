import { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { enviarParaIA } from "../api/api";
import { ItemCard } from "@/components/Card";
import { styles } from '../constants/styles';

// Importando as 3 listas de cardápio
import { burguers } from "../components/Card/cardapio/burguers";
import { bebidas } from "../components/Card/cardapio/bebidas";
import { sobremesas } from "../components/Card/cardapio/sobremesas";

export default function Resultado() {
  const { selecionados, tipo } = useLocalSearchParams();
  const [recomendados, setRecomendados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const filtrarTudo = async () => {
      try {
        const escolhas = JSON.parse((selecionados as string) || "{}");
        const quero = Object.keys(escolhas).filter(k => escolhas[k] === 'quero');
        const evito = Object.keys(escolhas).filter(k => escolhas[k] === 'evito');
        
        const promptTexto = `Quero: ${quero.join(", ")}. Evito: ${evito.join(", ")}.`;

        // Junta tudo em uma única lista para a IA processar de uma vez
        const superLista = [...burguers, ...bebidas, ...sobremesas];

        const data = await enviarParaIA(promptTexto, superLista);
        
        if (data?.recomendados) {
          const filtrados = data.recomendados.map((rec: any) => {
            const itemOriginal = superLista.find(i => i.id === rec.id);
            return itemOriginal ? { ...itemOriginal, justificativa: rec.justificativa } : null;
          }).filter((i: any) => i !== null);
          
          setRecomendados(filtrados);
        }
      } catch (err) {
        console.error("Erro na filtragem:", err);
      } finally {
        setCarregando(false);
      }
    };
    filtrarTudo();
  }, [selecionados]);

  const renderCategoria = (titulo: string, tipoFiltro: string) => {
    const itens = recomendados.filter(item => item.tipo === tipoFiltro);
    if (itens.length === 0) return null;

    return (
      <View style={{ marginBottom: 30 }}>
        <View style={resStyles.headerCategoria}>
          <Text style={resStyles.tituloCategoria}>{titulo}</Text>
        </View>
        {itens.map((item) => (
          <View key={`${item.tipo}-${item.id}`} style={{ marginBottom: 20 }}>
            <Text style={resStyles.justificativa}>✨ {item.justificativa}</Text>
            <ItemCard {...item} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', marginTop: 40 }}>
        {carregando ? "Filtrando o Cardápio..." : "Sua Seleção Personalizada"}
      </Text>

      {carregando && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={{ textAlign: 'center', marginTop: 10 }}>O Chef Gemini está escolhendo...</Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {!carregando && (
          <>
            {renderCategoria("🍔 Hambúrgueres", "Burguer")}
            {renderCategoria("🥤 Bebidas", "Bebida")}
            {renderCategoria("🍰 Sobremesas", "Sobremesa")}
          </>
        )}

        {!carregando && recomendados.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
            Nenhum item do cardápio corresponde aos filtros selecionados.
          </Text>
        )}
      </ScrollView>

      {!carregando && (
        <View style={resStyles.footer}>
          <TouchableOpacity
            style={[styles.botao, { flex: 1, backgroundColor: '#ccc' }]}
            onPress={() => router.push({ pathname: '/preferencias', params: { tipo } })}
          >
            <Text style={styles.textoBotao}>Refazer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, { flex: 1 }]}
            onPress={() => router.push({ pathname: '/carrinho' })}
          >
            <Text style={styles.textoBotao}>Carrinho</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const resStyles = StyleSheet.create({
  headerCategoria: {
    borderBottomWidth: 2,
    borderColor: '#eee',
    marginBottom: 15,
    paddingBottom: 5
  },
  tituloCategoria: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32'
  },
  justificativa: {
    color: '#666',
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 4,
    marginLeft: 10
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#eee'
  }
});