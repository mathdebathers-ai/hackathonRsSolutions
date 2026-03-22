import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PrefCard } from '@/components/Card/pref';
import { styles } from '../constants/styles';

export default function Preferencias() {
  const { tipo } = useLocalSearchParams();
  const [escolhas, setEscolhas] = useState<Record<string, 'quero' | 'evito' | null>>({});

  const preferencias = ["Carne", "Bacon", "Queijo", "Vegano", "Alface", "Tomate", "Cheddar"]; // Adicione o restante aqui

  const handleProximo = () => {
    router.push({
      pathname: '/resultado',
      params: { tipo, selecionados: JSON.stringify(escolhas) }
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.titulo}>O que você prefere?</Text>
      <ScrollView>
        {preferencias.map((pref) => (
          <PrefCard key={pref} title={pref} onSelect={(v) => setEscolhas(p => ({ ...p, [pref]: v }))} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.botao} onPress={handleProximo}>
        <Text style={styles.textoBotao}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
}