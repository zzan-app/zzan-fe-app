import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const Layout = {
  CHIP_HORIZONTAL: 22,
  CHIP_VERTICAL: 10,
  SCREEN_HORIZONTAL: 16,
  INPUT_HORIZONTAL: 6,
  INPUT_VERTICAL: 6,
  INPUT_MARGIN_BOTTOM: 10,
  ITEM_SPACING: 8,
  MESSAGE_SPACING: 12,
  SECTION_SPACING: 16,
  CHIP_RADIUS: 20,
  MESSAGE_RADIUS: 16,
  INPUT_RADIUS: 8,
  BOTTOM_SAFE_AREA_FALLBACK: 24,
} as const;
