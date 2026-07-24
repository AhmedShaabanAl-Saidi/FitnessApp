export type OnboardingStepId = 'gender' | 'age' | 'weight' | 'height' | 'goal' | 'activity';

export interface OnboardingStepData {
  id: OnboardingStepId;
  titleKey: string;
  subtitleKey: string;
  actionLabelKey: string;
}

export interface OnboardingChoice {
  id: string;
  labelKey: string;
}

export const ONBOARDING_STEPS: OnboardingStepData[] = [
  {
    id: 'gender',
    titleKey: 'AUTH.ONBOARDING.GENDER.TITLE',
    subtitleKey: 'AUTH.ONBOARDING.GENDER.SUBTITLE',
    actionLabelKey: 'AUTH.COMMON.NEXT',
  },
  {
    id: 'age',
    titleKey: 'AUTH.ONBOARDING.AGE.TITLE',
    subtitleKey: 'AUTH.ONBOARDING.PLAN_SUBTITLE',
    actionLabelKey: 'AUTH.COMMON.NEXT',
  },
  {
    id: 'weight',
    titleKey: 'AUTH.ONBOARDING.WEIGHT.TITLE',
    subtitleKey: 'AUTH.ONBOARDING.PLAN_SUBTITLE',
    actionLabelKey: 'AUTH.COMMON.DONE',
  },
  {
    id: 'height',
    titleKey: 'AUTH.ONBOARDING.HEIGHT.TITLE',
    subtitleKey: 'AUTH.ONBOARDING.PLAN_SUBTITLE',
    actionLabelKey: 'AUTH.COMMON.NEXT',
  },
  {
    id: 'goal',
    titleKey: 'AUTH.ONBOARDING.GOAL.TITLE',
    subtitleKey: 'AUTH.ONBOARDING.PLAN_SUBTITLE',
    actionLabelKey: 'AUTH.COMMON.NEXT',
  },
  {
    id: 'activity',
    titleKey: 'AUTH.ONBOARDING.ACTIVITY.TITLE',
    subtitleKey: 'AUTH.ONBOARDING.PLAN_SUBTITLE',
    actionLabelKey: 'AUTH.COMMON.NEXT',
  },
];

export const GOAL_OPTIONS: OnboardingChoice[] = [
  { id: 'gain-weight', labelKey: 'AUTH.ONBOARDING.GOAL.OPTIONS.GAIN_WEIGHT' },
  { id: 'lose-weight', labelKey: 'AUTH.ONBOARDING.GOAL.OPTIONS.LOSE_WEIGHT' },
  { id: 'get-fitter', labelKey: 'AUTH.ONBOARDING.GOAL.OPTIONS.GET_FITTER' },
  { id: 'gain-flexibility', labelKey: 'AUTH.ONBOARDING.GOAL.OPTIONS.GAIN_FLEXIBILITY' },
  { id: 'learn-basics', labelKey: 'AUTH.ONBOARDING.GOAL.OPTIONS.LEARN_BASICS' },
];

export const ACTIVITY_OPTIONS: OnboardingChoice[] = [
  { id: 'rookie', labelKey: 'AUTH.ONBOARDING.ACTIVITY.OPTIONS.ROOKIE' },
  { id: 'beginner', labelKey: 'AUTH.ONBOARDING.ACTIVITY.OPTIONS.BEGINNER' },
  { id: 'intermediate', labelKey: 'AUTH.ONBOARDING.ACTIVITY.OPTIONS.INTERMEDIATE' },
  { id: 'advanced', labelKey: 'AUTH.ONBOARDING.ACTIVITY.OPTIONS.ADVANCED' },
  { id: 'true-beast', labelKey: 'AUTH.ONBOARDING.ACTIVITY.OPTIONS.TRUE_BEAST' },
];
