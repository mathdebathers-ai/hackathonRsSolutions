import { router, Stack } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/styles';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.titulo}>Seja bem vindo ao nosso Estabelecimento!</Text>
        <Text style={styles.subtitulo}>
          Deseja consumir em viagem ou no local?
        </Text>

        <View style={styles.horizontal}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/consulta?tipo=viagem')}
          >
            <Text style={styles.textoBotao}>Viagem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() => router.push('/consulta?tipo=local')}
          >
            <Text style={styles.textoBotao}>Local</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}