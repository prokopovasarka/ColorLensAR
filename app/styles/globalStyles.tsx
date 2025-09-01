import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    fontSize: 20,
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e1e2ddd',
  },
  title: {
    fontSize: 20,
    fontStyle: `italic`,
    marginBottom: 50,
    color: '#fff',
    opacity: 0.5,
    textAlign: 'center',
  },
  button: {
    margin: 10,
    paddingVertical: 30,
    borderRadius: 20,  
    paddingHorizontal: width*0.25,
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
  }
});