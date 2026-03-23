import { cardStyles } from "@/constants/cardStyles";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PrefCardProps {
  onSelect: (tipo: 'quero' | 'evito' | null) => void;
  title: string;
}

export const PrefCard = ({ title, onSelect }: PrefCardProps) => {
  const [selecao, setSelecao] = useState<'quero' | 'evito' | null>(null);

  const handlePress = (tipo: 'quero' | 'evito') => {
    const novoValor = selecao === tipo ? null : tipo;
    setSelecao(novoValor);
    onSelect(novoValor);
  };

  return (
    <View style={cardStyles.card}>
      <Text style={cardStyles.label}>{title}</Text>

      <View style={cardStyles.buttonContainer}>
        {/* Botão QUERO */}
        <TouchableOpacity
          onPress={() => handlePress('quero')}
          style={[
            cardStyles.btnBase,
            selecao === 'quero' && cardStyles.btnQueroActive
          ]}
        >
          <Text style={[
            cardStyles.btnText,
            selecao === 'quero' && cardStyles.textQueroActive
          ]}>Quero</Text>
        </TouchableOpacity>

        {/* Botão EVITO */}
        <TouchableOpacity
          onPress={() => handlePress('evito')}
          style={[
            cardStyles.btnBase,
            selecao === 'evito' && cardStyles.btnEvitoActive
          ]}
        >
          <Text style={[
            cardStyles.btnText,
            selecao === 'evito' && cardStyles.textEvitoActive
          ]}>Evito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};