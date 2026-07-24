export type InputType = 'text' | 'email' | 'password' | 'otp';
export type TextInputMode = 'text' | 'email' | 'numeric' | 'search' | 'tel' | 'url';

export const DEFAULT_OTP_LENGTH = 4;
export const MAX_OTP_LENGTH = 12;

export function normalizeOtpLength(value: unknown): number {
  const length = Number(value);

  return Number.isInteger(length) && length > 0
    ? Math.min(length, MAX_OTP_LENGTH)
    : DEFAULT_OTP_LENGTH;
}

export const FIELD_CLASSES =
  'flex min-h-11 items-center gap-3 rounded-full border bg-transparent px-4 transition-colors focus-within:border-[#FF4100]';

export const OTP_INPUT_CLASSES =
  'h-10 w-12 border-0 border-b-2 bg-transparent text-center text-lg font-semibold text-[#FF4100] caret-[#FF4100] outline-none transition-colors focus:border-[#FF4100] disabled:cursor-not-allowed';

export const NATIVE_INPUT_CLASSES =
  'min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm text-inherit outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed';

export const PASSWORD_TOGGLE_CLASSES =
  'grid size-7 shrink-0 place-items-center rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-[#FF4100] disabled:cursor-not-allowed';
