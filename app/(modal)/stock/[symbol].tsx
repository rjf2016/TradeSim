import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/base';
import { Stocks } from '@/data/stocks';
import React from 'react';
import { Colors } from '@/constants/Colors';
import StockChart from '@/components/Chart/StockChart';
import { Separator } from '@/components/ui/Separator';

export default function Stock() {
  const { symbol } = useLocalSearchParams();
  const stock = Stocks.find((stock) => stock.symbol === symbol);

  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

  return (
    <View style={styles.container}>
      <ThemedText type="h2" style={styles.title}>
        {stock?.symbol}
      </ThemedText>
      <ThemedText type="subhead" variant="secondary">
        {stock?.name}
      </ThemedText>
      <Separator />
      <View style={{ flexDirection: 'row' }}>
        <ThemedText style={{ fontSize: 15 }}>${1008.4}</ThemedText>
        <ThemedText
          style={{ fontSize: 15, color: Colors.success, marginLeft: 10 }}
        >
          +1,980.03%
        </ThemedText>
      </View>
      <ThemedText variant="secondary" style={{ marginBottom: 8, fontSize: 15 }}>
        Past 3 Years
      </ThemedText>
      <StockChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingTop: 40,
  },
  title: {
    fontWeight: 'bold',
  },
});
