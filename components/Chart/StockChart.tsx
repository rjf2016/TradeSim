import React from 'react';
import { CartesianChart, useChartPressState } from 'victory-native';
import {
  Circle,
  Line as SkiaLine,
  Text as SkiaText,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { StyleSheet, type TextStyle, View } from 'react-native';
import { format } from 'date-fns';
import {
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import inter from '../../assets/fonts/RobotoMono-Regular.ttf';
import { AnimatedText } from '@/components/base/AnimatedText';
import { Colors } from '@/constants/Colors';
import data from '@/data/3-year-stock.json';
import { StockArea } from './StockArea';

const DATA = data.map((d) => ({ ...d, date: new Date(d.date).valueOf() }));
const initChartPressState = { x: 0, y: { high: 0 } };

export default function StockPriceScreen() {
  const font = useFont(inter, 12);
  const textColor = Colors.text;
  const { state: firstTouch, isActive: isFirstPressActive } =
    useChartPressState(initChartPressState);
  const { state: secondTouch, isActive: isSecondPressActive } =
    useChartPressState(initChartPressState);

  // On activation of gesture, play haptic feedback
  React.useEffect(() => {
    if (isFirstPressActive) Haptics.selectionAsync().catch(() => null);
  }, [isFirstPressActive]);
  React.useEffect(() => {
    if (isSecondPressActive) Haptics.selectionAsync().catch(() => null);
  }, [isSecondPressActive]);

  // Active date display
  const activeDate = useDerivedValue(() => {
    if (!isFirstPressActive) return ``;

    // One-touch only
    if (!isSecondPressActive) return formatDate(firstTouch.x.value.value);
    // Two-touch
    const early =
      firstTouch.x.value.value < secondTouch.x.value.value
        ? firstTouch
        : secondTouch;
    const late = early === firstTouch ? secondTouch : firstTouch;
    return `${formatDate(early.x.value.value)} - ${formatDate(
      late.x.value.value
    )}`;
  });

  // Active high display
  const activeHigh = useDerivedValue(() => {
    if (!isFirstPressActive) return '—';

    // One-touch
    if (!isSecondPressActive)
      return '$' + firstTouch.y.high.value.value.toFixed(2);

    // Two-touch
    const early =
      firstTouch.x.value.value < secondTouch.x.value.value
        ? firstTouch
        : secondTouch;
    const late = early === firstTouch ? secondTouch : firstTouch;

    return `$${early.y.high.value.value.toFixed(
      2
    )} – $${late.y.high.value.value.toFixed(2)}`;
  });

  // Determine if the selected range has a positive delta, which will be used to conditionally pick colors.
  const isDeltaPositive = useDerivedValue(() => {
    if (!isSecondPressActive) return true;

    const early =
      firstTouch.x.value.value < secondTouch.x.value.value
        ? firstTouch
        : secondTouch;
    const late = early === firstTouch ? secondTouch : firstTouch;
    return early.y.high.value.value < late.y.high.value.value;
  });

  // Color the active high display based on the delta
  const activeHighStyle = useAnimatedStyle<TextStyle>(() => {
    const s: TextStyle = {
      fontSize: 24,
      fontWeight: 'bold',
      color: textColor,
      width: '100%',
      textAlign: 'center',
    };

    // One-touch
    if (!isSecondPressActive) return s;
    s.color = isDeltaPositive.value ? Colors.success : Colors.error;

    return s;
  });

  // Indicator color based on delta
  const indicatorColor = useDerivedValue<string>(() => {
    if (!(isFirstPressActive && isSecondPressActive)) return Colors.tint;
    return isDeltaPositive.value ? Colors.success : Colors.error;
  });

  return (
    <View style={styles.scrollView}>
      <View style={{ flex: 2, maxHeight: 500, marginBottom: 20 }}>
        <CartesianChart
          data={DATA}
          xKey="date"
          yKeys={['high']}
          chartPressState={[firstTouch, secondTouch]}
          axisOptions={{
            font,
            tickCount: 5,
            labelOffset: { x: 12, y: 8 },
            labelPosition: { x: 'outset', y: 'inset' },
            axisSide: { x: 'bottom', y: 'left' },
            formatXLabel: (ms) => format(new Date(ms), 'MM/yy'),
            formatYLabel: (v) => `$${v}`,
            lineColor: Colors.border,
            labelColor: textColor,
          }}
          renderOutside={({ chartBounds }) => (
            <>
              {isFirstPressActive && (
                <>
                  <ActiveValueIndicator
                    xPosition={firstTouch.x.position}
                    yPosition={firstTouch.y.high.position}
                    bottom={chartBounds.bottom}
                    top={chartBounds.top}
                    activeValue={firstTouch.y.high.value}
                    textColor={textColor}
                    lineColor={Colors.tint}
                    indicatorColor={indicatorColor}
                  />
                </>
              )}
              {isSecondPressActive && (
                <>
                  <ActiveValueIndicator
                    xPosition={secondTouch.x.position}
                    yPosition={secondTouch.y.high.position}
                    bottom={chartBounds.bottom}
                    top={chartBounds.top}
                    activeValue={secondTouch.y.high.value}
                    textColor={textColor}
                    lineColor={Colors.tint}
                    indicatorColor={indicatorColor}
                    topOffset={16}
                  />
                </>
              )}
            </>
          )}
        >
          {({ chartBounds, points }) => (
            <>
              <StockArea
                points={points.high}
                isWindowActive={isFirstPressActive && isSecondPressActive}
                isDeltaPositive={isDeltaPositive}
                startX={firstTouch.x.position}
                endX={secondTouch.x.position}
                {...chartBounds}
              />
            </>
          )}
        </CartesianChart>
      </View>
      <View style={styles.optionsScrollView}>
        <View
          style={{
            paddingBottom: 16,
            paddingTop: 0,
            alignItems: 'center',
            justifyContent: 'center',
            height: 80,
            width: '100%',
          }}
        >
          <>
            <AnimatedText
              text={activeDate}
              style={{
                fontSize: 16,
                color: textColor,
                width: '100%',
                textAlign: 'center',
              }}
            />
            <AnimatedText text={activeHigh} style={activeHighStyle} />
          </>
        </View>
      </View>
    </View>
  );
}

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  top,
  bottom,
  activeValue,
  textColor,
  lineColor,
  indicatorColor,
  topOffset = 0,
}: {
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
  activeValue: SharedValue<number>;
  bottom: number;
  top: number;
  textColor: string;
  lineColor: string;
  indicatorColor: SharedValue<string>;
  topOffset?: number;
}) => {
  const FONT_SIZE = 16;
  const font = useFont(inter, FONT_SIZE);
  const start = useDerivedValue(() => vec(xPosition.value, bottom));
  const end = useDerivedValue(() =>
    vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset)
  );
  // Text label
  const activeValueDisplay = useDerivedValue(
    () => '$' + activeValue.value.toFixed(2)
  );
  const activeValueWidth = useDerivedValue(
    () =>
      font
        ?.getGlyphWidths?.(font.getGlyphIDs(activeValueDisplay.value))
        .reduce((sum, value) => sum + value, 0) || 0
  );
  const activeValueX = useDerivedValue(
    () => xPosition.value - activeValueWidth.value / 2
  );

  return (
    <>
      <SkiaLine p1={start} p2={end} color={lineColor} strokeWidth={1} />
      <Circle cx={xPosition} cy={yPosition} r={10} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={yPosition}
        r={8}
        color="hsla(0, 0, 100%, 0.25)"
      />
      <SkiaText
        color={textColor}
        font={font}
        text={activeValueDisplay}
        x={activeValueX}
        y={top + FONT_SIZE + topOffset}
      />
    </>
  );
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (ms: number) => {
  'worklet';

  const date = new Date(ms);
  const M = MONTHS[date.getMonth()];
  const D = date.getDate();
  const Y = date.getFullYear();
  return `${M} ${D}, ${Y}`;
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  optionsScrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  options: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
