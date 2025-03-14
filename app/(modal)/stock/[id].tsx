import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/base';
import { Stocks } from '@/data/stocks';

export default function Stock() {
  const { id } = useLocalSearchParams();
  const stock = Stocks.find((stock) => stock.id === id);

  return (
    <View style={styles.container}>
      {stock ? (
        <View>
          <ThemedText type="h2" style={styles.title}>
            {stock.symbol}
          </ThemedText>
          <ThemedText type="subhead" variant="secondary">
            {stock.name}
          </ThemedText>
        </View>
      ) : (
        <View>
          <Text>{id}</Text>
          <Text>Stock not found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontWeight: 'bold',
  },
});
