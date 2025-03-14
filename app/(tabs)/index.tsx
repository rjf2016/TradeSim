import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText, ThemedView } from '@/components/base';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Investments, Watchlist } from '@/data/stocks';
import { StockItem } from '@/components/StockItem';

export default function Index() {
  return (
    <ThemedView isSafe style={styles.container}>
      <ScrollView
        style={styles.scrollable}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <ThemedText type="subhead" variant="secondary">
            Portolio Balance
          </ThemedText>
          <ThemedText type="h1">$1804.38</ThemedText>
          <ThemedText type="subhead" style={styles.heroCaption}>
            <IconSymbol name="triangle.fill" size={8} color={Colors.success} />{' '}
            $102.45 (6.75%)
          </ThemedText>
        </View>

        {/* My Stocks */}
        <View style={styles.content}>
          <ThemedText type="h4" style={{ fontWeight: 'bold' }}>
            Investments
          </ThemedText>
          <FlatList
            data={Investments}
            keyExtractor={(item) => item.symbol}
            scrollEnabled={false}
            style={{ marginBottom: 28 }}
            renderItem={({ item }) => <StockItem {...item} />}
          />

          {/* Watchlist */}
          <ThemedText type="h4" style={{ fontWeight: 'bold' }}>
            Watchlist
          </ThemedText>
          <FlatList
            data={Watchlist}
            keyExtractor={(item) => item.symbol}
            scrollEnabled={false}
            renderItem={({ item }) => <StockItem {...item} />}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollable: {
    flex: 1,
    paddingHorizontal: 14,
  },
  hero: {
    justifyContent: 'center',
    paddingTop: 20,
    rowGap: 1,
  },
  heroCaption: {
    color: Colors.success,
  },
  content: {
    // flex: 1,
    paddingTop: 28,
  },
});
