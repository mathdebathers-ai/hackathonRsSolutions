import { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { enviarParaIA } from "../api/api";
import { ItemCard } from "@/components/Card";

// Importando as 3 listas de cardápio
import { burguers } from "../components/Card/cardapio/burguers";
import { bebidas } from "../components/Card/cardapio/bebidas";
import { sobremesas } from "../components/Card/cardapio/sobremesas";

export default function Resultado() {
  const { selecionados } = useLocalSearchParams();
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

  // Função para renderizar cada categoria separadamente
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
      <Stack.Screen options={{ title: "Opções Filtradas" }} />
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
        {carregando ? "Filtrando o Cardápio..." : "Sua Seleção Personalizada"}
      </Text>

      {carregando && <ActivityIndicator size="large" color="#2E7D32" />}

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
  }
});