// Fallback for using Ionicons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

/**
 * Add your SF Symbols to Ionicons mappings here.
 * - see Ionicons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<string, ComponentProps<typeof Ionicons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'paper-plane',
  paperplane: 'paper-plane-outline',
  'chevron.left': 'chevron-back',
  'chevron.left.forwardslash.chevron.right': 'code-slash',
  'chevron.right': 'chevron-forward',
  'dumbbell.fill': 'barbell',
  dumbbell: 'barbell-outline',
  'grid.fill': 'grid',
  grid: 'grid-outline',
  'square.grid.2x2': 'grid',
  'fork.knife': 'restaurant',
  'figure.run.fill': 'walk',
  'figure.run': 'walk-outline',
  'key.fill': 'key',
  'envelope.fill': 'mail',
  'lock.fill': 'lock-closed',
  'star.fill': 'star',
  'clock.fill': 'time',
  'chart.bar.fill': 'bar-chart',
  'bubble.left': 'chatbubble-outline',
  'bubble.left.fill': 'chatbubble',
  'square.and.arrow.up': 'share-outline',
  'square.and.arrow.up.fill': 'share',
  'trophy.fill': 'trophy',
  'person.fill': 'person',
  'person.2.fill': 'people',
  'person.circle.fill': 'person-circle',
  calendar: 'calendar-outline',
  'crown.fill': 'trophy',
  'dollarsign.circle.fill': 'cash',
  'arrow.up.circle.fill': 'arrow-up-circle',
  'arrow.right': 'arrow-forward',
  'checkmark.circle.fill': 'checkmark-circle',
  'checkmark.circle': 'checkmark-circle-outline',
  'bag.fill': 'bag',
  'person.badge.plus.fill': 'person-add',
  'rectangle.portrait.and.arrow.right': 'log-out-outline',
  bicycle: 'bicycle',
  'figure.strengthtraining.traditional': 'body',
  // Ícones adicionais para paridade Android
  ellipsis: 'ellipsis-horizontal',
  'flame.fill': 'flame',
  sparkles: 'sparkles',
  'camera.fill': 'camera',
  photo: 'image',
  'heart.fill': 'heart',
  heart: 'heart-outline',
  'exclamationmark.triangle.fill': 'warning',
  'list.bullet.rectangle.fill': 'list',
  repeat: 'repeat',
  'arrow.clockwise': 'refresh',
  timer: 'timer',
  'lightbulb.fill': 'bulb',
  '1.circle.fill': 'ellipse',
  '2.circle.fill': 'ellipse',
  '3.circle.fill': 'ellipse',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Ionicons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Ionicons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string | SymbolViewProps['name'];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight; // Used on iOS only
}) {
  const iconName = MAPPING[name as string] || 'help-circle-outline';
  return <Ionicons color={color} size={size} name={iconName} style={style} />;
}
