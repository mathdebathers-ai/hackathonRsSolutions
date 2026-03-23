import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5c5c5', // fundo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  horizontal: {
    flexDirection: 'row',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#242424',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 30,
  },

  botao: {
    flex: 1,
    backgroundColor: '#334155',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoSecundario: {
    flex: 1,
    backgroundColor: '#334155',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },


  //MODAL
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // fundo escuro transparente
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '85%',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',

    // sombra Android
    elevation: 10,

    // sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
  },

  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1
  },

  titleCard: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center"
  },


});