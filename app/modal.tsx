import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/styles';

export default function ModalScreen() {
  return (
    <View style={styles.overlay}>

      <View style={styles.modal}>

        <Text style={styles.titulo}>Pedido pronto!</Text>
        <Text style={styles.subtitulo}>
          Seu pedido foi processado com sucesso.
        </Text>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Voltar ao início</Text>
          </TouchableOpacity>
        </Link>

      </View>

    </View>
  );
}