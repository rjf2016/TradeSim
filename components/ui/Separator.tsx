import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';

type SeparatorProps = {
  style?: StyleProp<ViewStyle>;
};

export function Separator({ style }: SeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
});
