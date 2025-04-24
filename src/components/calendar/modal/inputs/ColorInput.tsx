import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorInput = ({
  value = '#3788d8',
  onChange,
}: {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color: string) => {
    const syntheticEvent = {
      target: {
        name: 'color',
        value: color,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <div className="relative flex items-center space-x-2">
      <label htmlFor="color" className="block text-sm font-medium text-gray-700">
        Color
      </label>
      <div 
        className="h-5 w-5 cursor-pointer rounded-sm"
        style={{ backgroundColor: value }}
        onClick={() => setShowPicker(!showPicker)}
      />
      {showPicker && (
        <div className="absolute top-full left-0 z-50 mt-2">
          <div 
            className="fixed inset-0" 
            onClick={() => setShowPicker(false)} 
          />
          <div className="relative">
            <HexColorPicker 
              color={value} 
              onChange={handleColorChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorInput;
