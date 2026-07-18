export type OnboardingStepId = 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'activity';

export interface OnboardingStepData {
  id: OnboardingStepId;
  title: string;
  subtitle: string;
  actionLabel: string;
}

export interface OnboardingChoice {
  label: string;
}

export const ONBOARDING_STEPS: OnboardingStepData[] = [
  {
    id: 'gender',
    title: 'TELL US ABOUT YOURSELF!',
    subtitle: 'We Need To Know Your Gender',
    actionLabel: 'Next',
  },
  {
    id: 'age',
    title: 'How Old Are You?',
    subtitle: 'This Helps Us Create Your Personalized Plan',
    actionLabel: 'Next',
  },
  {
    id: 'weight',
    title: 'What Is Your Weight?',
    subtitle: 'This Helps Us Create Your Personalized Plan',
    actionLabel: 'Done',
  },
  {
    id: 'height',
    title: 'What Is Your Height?',
    subtitle: 'This Helps Us Create Your Personalized Plan',
    actionLabel: 'Next',
  },
  {
    id: 'goal',
    title: 'What Is Your Goal?',
    subtitle: 'This Helps Us Create Your Personalized Plan',
    actionLabel: 'Next',
  },
  {
    id: 'activity',
    title: 'Your Regular Physical Activity Level?',
    subtitle: 'This Helps Us Create Your Personalized Plan',
    actionLabel: 'Next',
  },
];

export const GOAL_OPTIONS: OnboardingChoice[] = [
  { label: 'Gain Weight' },
  { label: 'Lose Weight' },
  { label: 'Get Fitter' },
  { label: 'Gain More Flexible' },
  { label: 'Learn The Basic' },
];

export const ACTIVITY_OPTIONS: OnboardingChoice[] = [
  { label: 'Rookie' },
  { label: 'Beginner' },
  { label: 'Intermediate' },
  { label: 'Advance' },
  { label: 'True Beast' },
];
