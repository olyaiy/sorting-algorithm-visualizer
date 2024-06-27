import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

export const Slider = (props) => (
  <SliderPrimitive.Root
    className="relative flex items-center w-full h-5"
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full bg-gray-200 rounded-full">
      <SliderPrimitive.Range className="absolute h-full bg-blue-500 rounded-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-5 h-5 bg-blue-500 rounded-full" />
  </SliderPrimitive.Root>
);