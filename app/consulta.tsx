import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/styles';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function Consulta() {
  const colorScheme = useColorScheme();
  const { tipo } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>

        <Text style={styles.titulo}>
          Gostaria de usar uma IA para filtrar seus pratos?
        </Text>

        <View style={styles.horizontal}>

          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              router.push({
                pathname: '/preferencias',
                params: { tipo }
              })
            }
          >
            <Text style={styles.textoBotao}>Usar IA!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() =>
              router.push({
                pathname: '/menu',
                params: { tipo }
              })
            }
          >
            <Text style={styles.textoBotao}>Pedir normalmente</Text>
          </TouchableOpacity>


        </View>

      </View>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[styles.botao, { flex: 1 }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}