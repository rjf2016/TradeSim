import {
  Text as RNText,
  type TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import { Colors } from '@/constants/Colors';

export type TextProps = RNTextProps & {
  type?:
    | 'body'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'headline'
    | 'subhead'
    | 'caption'
    | 'link';
  variant?: 'default' | 'secondary';
};

export function ThemedText({
  type = 'body',
  variant = 'default',
  style,
  ...props
}: TextProps) {
  const color = variant === 'secondary' ? Colors.secondary : Colors.text;

  return <RNText style={[{ color }, styles[type], style]} {...props} />;
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 21,
  },
  h1: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 27,
    lineHeight: 33,
  },
  h3: {
    fontSize: 21,
    lineHeight: 26,
  },
  h4: {
    fontSize: 19,
    lineHeight: 24,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'semibold',
  },
  subhead: {
    fontSize: 15,
    lineHeight: 20,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: 'blue',
  },
});
