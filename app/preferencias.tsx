import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PrefCard } from '@/components/Card/pref';
import { styles } from '../constants/styles';

export default function Preferencias() {
  const { tipo } = useLocalSearchParams();

  const [escolhas, setEscolhas] = useState<Record<string, 'quero' | 'evito' | null>>({});

  const preferencias = [
    "Carne", "Frango", "Bacon", "Calabresa", "Ovo", "Queijo", "Cheddar",
    "Hambúrguer Vegetal", "Vegetariano", "Vegano", "Alface", "Tomate",
    "Molho Especial", "Barbecue", "Maionese", "Doce", "Chocolate",
    "Leite Condensado", "Sorvete", "Frutas", "Refrigerante", "Suco Natural",
    "Bebida Gelada", "Álcool", "Cerveja", "Vinho", "Drink", "Artesanal",
    "Duplo", "Tradicional"
  ];

  const handleEscolha = (item: string, valor: 'quero' | 'evito' | null) => {
    setEscolhas(prev => ({
      ...prev,
      [item]: valor
    }));
  };

  const handleProximo = () => {
    router.push({
      pathname: '/resultado',
      params: {
        tipo,
        selecionados: JSON.stringify(escolhas)
      }
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        <Text style={styles.titulo}>
          O que você gostaria de ter em seu prato?
        </Text>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }} 
          showsVerticalScrollIndicator={false}
        >
          {preferencias.map((pref) => (
            <PrefCard
              key={pref}
              title={pref}
              onSelect={(valor) => handleEscolha(pref, valor)}
            />
          ))}
        </ScrollView>

        <View style={footerStyle.container}>
          <TouchableOpacity
            style={[styles.botao, { flex: 1, backgroundColor: '#ccc' }]}
            onPress={() => router.push({
              pathname: '/consulta',
              params: { tipo }
            })}
          >
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, { flex: 1 }]}
            onPress={handleProximo}
          >
            <Text style={styles.textoBotao}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const footerStyle = {
  container: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row" as const,
    gap: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: '#eee'
  }
};