import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText, ThemedView } from '@/components/base';
import { Colors } from '@/constants/Colors';

type StockItemProps = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

export function StockItem({
  id,
  symbol,
  name,
  price,
  change,
  changePercent,
}: StockItemProps) {
  const router = useRouter();
  const isPositive = change >= 0;
  const priceChange = `${isPositive ? '+' : ''}${change.toFixed(2)}`;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: `/(modal)/stock/[symbol]`, params: { symbol } })
      }
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.symbolContainer}>
          <ThemedText style={styles.symbol}>{symbol}</ThemedText>
          <ThemedText style={styles.name}>{name}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.priceContainer}>
          <ThemedText style={styles.price}>{price.toFixed(2)}</ThemedText>
          <ThemedView
            style={[
              styles.changeBadge,
              { backgroundColor: isPositive ? Colors.success : Colors.error },
            ]}
          >
            <ThemedText style={styles.changeThemedText}>
              {priceChange}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  symbolContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 2,
  },
  symbol: {
    fontWeight: 'bold',
  },
  name: {
    color: Colors.secondary,

    alignSelf: 'flex-end',
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 2,
  },
  price: {
    fontWeight: 'bold',
    letterSpacing: 0.65,
  },
  changeBadge: {
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 4,
    minWidth: 60,
    alignItems: 'flex-end',
  },
  changeThemedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
});
