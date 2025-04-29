'use client';

import { Menu } from '@headlessui/react';
import { FaArrowDown, FaCircle } from 'react-icons/fa';
import { BlockPicker } from 'react-color';
import React from 'react';

const GOOGLE_COLORS = [
  '#7986cb', // Lavender
  '#33b679', // Sage
  '#8e24aa', // Grape
  '#e67c73', // Flamingo
  '#f6c026', // Banana
  '#f5511d', // Tangerine
  '#039be5', // Peacock
  '#616161', // Graphite
  '#3f51b5', // Blueberry
  '#0b8043', // Basil
  '#d60000', // Tomato
  '#cc33cc', // Amethyst
  '#ac725e', // Cocoa
  '#9FC6E7', // Sky Blue
  '#46d6db', // Sea Blue
];


const ColorInput = ({
  value = '#7986cb',
  onChange,
}: {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleColorChange = (colorResult: { hex: string }) => {
    onChange({
      target: {
        name: 'color',
        value: colorResult.hex,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center gap-2 rounded-sm px-2 py-1 border border-gray-300 shadow bg-white">
        <FaCircle className="h-6 w-6" style={{ color: value }} />
        <FaArrowDown className="h-4 w-4 text-gray-500" />
      </Menu.Button>
      <Menu.Items
        className="absolute z-30 left-1/2 -translate-x-1/2 rounded-sm bg-white p-2 shadow border border-gray-300"
      >
        <BlockPicker
          colors={GOOGLE_COLORS}
          color={value}
          onChangeComplete={handleColorChange}
          triangle="hide"
          styles={{
            default: {
              card: {
                boxShadow: 'none',
                background: 'transparent',
              },
            },
          }}
        />
      </Menu.Items>
    </Menu>
  );
};

export default ColorInput;
