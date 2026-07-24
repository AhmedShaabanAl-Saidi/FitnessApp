export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'solid' | 'outline' | 'ghost';

export const BASE_CLASSES =
  'relative inline-flex items-center gap-2 whitespace-nowrap border font-semibold tracking-wide transition-all duration-300 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4100] motion-reduce:transition-none';

export const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

export const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: 'border-transparent bg-[#FF4100] text-white hover:bg-orange-700',
  outline:
    'border-[#FF4100] bg-transparent text-[#FF4100] hover:bg-[#FF4100] hover:text-white',
  ghost: 'border-transparent bg-transparent text-[#FF4100] hover:bg-gray-100',
};
