import React from 'react';
import { ThemedText, ThemedView } from '@/components/base';

export default function Explore() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedText>Explore Page</ThemedText>
    </ThemedView>
  );
}
