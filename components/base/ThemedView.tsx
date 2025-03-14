import { View as RNView, ViewProps as RNViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

type ViewProps = RNViewProps & {
  isSafe?: boolean;
};

export function ThemedView({ style, isSafe, ...props }: ViewProps) {
  const { bottom, top, left, right } = useSafeAreaInsets();

  return (
    <RNView
      style={[
        {
          backgroundColor: Colors.background,
          ...(isSafe && {
            paddingTop: top,
            paddingBottom: bottom,
            paddingLeft: left,
            paddingRight: right,
          }),
        },
        style,
      ]}
      {...props}
    />
  );
}
