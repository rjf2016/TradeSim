import React from 'react';
import { ThemedText, ThemedView } from '@/components/base';

export default function Profile() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedText>Profile Page</ThemedText>
    </ThemedView>
  );
}
