import { NormalSizes, SimpleColors } from '../../utils/prop-types';
import { NextUIThemes, NextUIThemesPalette } from '../../theme/index';
import { addColorAlpha, getNormalColor, hexToRgb } from '../../utils/color';

export type InputSize = {
  heightRatio: string;
  fontSize: string;
};

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: InputSize } = {
    mini: {
      heightRatio: '1.2',
      fontSize: '.75rem',
    },
    small: {
      heightRatio: '1.5',
      fontSize: '.75rem',
    },
    medium: {
      heightRatio: '1.687',
      fontSize: '.875rem',
    },
    large: {
      heightRatio: '1.875',
      fontSize: '1rem',
    },
    xlarge: {
      heightRatio: '2.25',
      fontSize: '1.25rem',
    },
  };
  if (!size) return sizes.medium;
  return sizes[size];
};

export type InputColor = {
  bgColor: string;
  color: string;
  placeholderColor: string;
  helperColor: string;
  borderColor: string;
  hoverBorder: string;
  shadowColor: string;
};

export const getShadowColor = (
  palette: NextUIThemesPalette,
  color?: SimpleColors
) => {
  try {
    const hexColor = getNormalColor(color, palette, palette.accents_4);
    const [r, g, b] = hexToRgb(hexColor);
    return `0 5px 20px -5px rgb(${r} ${g} ${b}/ 40%);`;
  } catch (err) {
    return 'none';
  }
};

export const getColors = (
  theme: NextUIThemes,
  color?: SimpleColors,
  status?: SimpleColors
): InputColor => {
  const palette = theme.palette;
  const isDark = theme.type === 'dark';
  const normalColor = getNormalColor(color, palette);

  const baseProps = {
    color: palette.text,
    bgColor: isDark ? palette.accents_1 : palette.accents_2,
    placeholderColor: isDark ? palette.accents_6 : palette.accents_3,
    borderColor: palette.accents_2,
    shadowColor: theme.expressiveness.shadowSmall,
  };

  if (status === 'default' && color) {
    return color === 'default'
      ? {
          ...baseProps,
          helperColor: palette.text,
          hoverBorder: palette.foreground,
        }
      : {
          ...baseProps,
          helperColor: normalColor,
          hoverBorder: normalColor,
        };
  }
  const statusColor = getNormalColor(status, palette);
  return {
    ...baseProps,
    helperColor: normalColor,
    hoverBorder: normalColor,
    color: statusColor,
    placeholderColor: addColorAlpha(statusColor, 0.5),
    bgColor: addColorAlpha(statusColor, 0.2),
    shadowColor: getShadowColor(palette, status),
  };
};