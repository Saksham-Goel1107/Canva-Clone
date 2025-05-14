import { ChromePicker, CirclePicker } from 'react-color';

import { colors } from '@/features/editor/types';
import { rgbaObjectToString } from '@/features/editor/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={color}
        onChange={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);

          onChange(formattedColor);
        }}
        className="rounded-lg border"
      />

      <CirclePicker
        color={color}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);

          onChange(formattedColor);
        }}
      />
    </div>
  );
};
