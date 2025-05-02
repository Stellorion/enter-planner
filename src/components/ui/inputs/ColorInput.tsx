'use client';

import { Menu, Transition } from '@headlessui/react';
import { FaArrowDown, FaCircle } from 'react-icons/fa';
import { BlockPicker } from 'react-color';
import { Fragment } from 'react';

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
    <Menu as="div" className="relative flex items-center gap-2 text-left">
      <span className='text-gray-700 text-md'>Color: </span>
      <Menu.Button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1">
        <FaCircle className="h-6 w-6" style={{ color: value }} />
        <FaArrowDown className="h-4 w-4 text-gray-500" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-full z-30 top-10 -translate-x-2/3 rounded-md border border-gray-300 bg-white p-2">
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
      </Transition>
    </Menu>
  );
};

export default ColorInput;
