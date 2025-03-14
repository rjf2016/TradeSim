import { StyleProp, ViewStyle } from 'react-native';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { Colors } from '@/constants/Colors';

export function IconSymbol({
  name,
  size = 24,
  color = Colors.text,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  color: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      name={name}
      resizeMode="scaleAspectFit"
      tintColor={color}
      weight={weight}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
