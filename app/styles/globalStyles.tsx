import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    fontSize: 20,
    letterSpacing: 0.5,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e1e2ddd',
  },
  title: {
    fontSize: 20,
    marginBottom: 50,
    color: '#fff',
    textAlign: 'center',
    fontWeight: `700`,
  },
  quote: {
    fontSize: 20,
    fontStyle: `italic`,
    marginBottom: 50,
    color: '#fff',
    opacity: 0.5,
    textAlign: 'center',
  },
  button: {
    margin: 10,
    paddingVertical: 20,
    borderRadius: 20,  
    width: width*0.8,
    backgroundColor: '#1e1e2ddd',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 1,
  },
  helpTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  helpText: {
    color: '#fff',
    fontSize: 13,
    letterSpacing: 1,
  }
});