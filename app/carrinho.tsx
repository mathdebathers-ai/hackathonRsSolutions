import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/styles';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function Carrinho() {
  const colorScheme = useColorScheme();
  const { tipo } = useLocalSearchParams()

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.titulo}>Seu Carrinho</Text>

      </View>
      <View style={styles.navbar}>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            router.back()
          }
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            router.push({
              pathname: '/modal'
            })
          }
        >
          <Text style={styles.textoBotao}>Comprar</Text>
        </TouchableOpacity>

      </View>

    </>
  );
}
