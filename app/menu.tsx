import { ItemCard } from "@/components/Card/";
import { styles } from "@/constants/styles";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { bebidas } from "../components/Card/cardapio/bebidas";
import { burguers } from "../components/Card/cardapio/burguers";
import { sobremesas } from "../components/Card/cardapio/sobremesas";

export default function Menu() {
  const { tipo } = useLocalSearchParams();

  return (
    <>
      <View style={{ flex: 1 }}>

        {/* SCROLL */}

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text style={styles.titleCard}>
            Burgers
          </Text>

          {burguers.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}

          <Text style={styles.titleCard}>
            Bebidas
          </Text>

          {bebidas.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}

          <Text style={styles.titleCard}>
            Sobremesas
          </Text>

          {sobremesas.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}

        </ScrollView>

        {/* BOTÕES */}
        <View style={styles.navbar}>

          <TouchableOpacity
            style={[styles.botao, { flex: 1 }]}
            onPress={() => 
              router.push({
                pathname: '/consulta',
                params: { tipo }
              })}
          >
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoSecundario, { flex: 1 }]}
            onPress={() =>
              router.push({
                pathname: '/carrinho',
                params: { tipo }
              })
            }
          >
            <Text style={styles.textoBotao}>Carrinho</Text>
          </TouchableOpacity>

        </View>

      </View>
    </>
  );
}