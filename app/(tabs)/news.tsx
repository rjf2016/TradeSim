import React from 'react';
import { ThemedText, ThemedView } from '@/components/base';

export default function News() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedText>News Page</ThemedText>
    </ThemedView>
  );
}
