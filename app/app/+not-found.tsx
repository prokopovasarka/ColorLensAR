import { Text, View, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <View style={styles.container}>
            <Text style={styles.text}>This page does not exist!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
