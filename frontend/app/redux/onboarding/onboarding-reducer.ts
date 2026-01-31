import { ONBOARDING_ACTION, OnboardingState, OnboardingAction } from "./onboarding-types";

export const initialOnboardingState: OnboardingState = {
    personal: {},
    academic: {},
    professional: {},
    social: {},
    goals: {}
};

export function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
    switch (action.type) {
        case ONBOARDING_ACTION.UPDATE_PERSONAL_DATA:
            return {
                ...state,
                personal: { ...state.personal, ...action.payload }
            };
        case ONBOARDING_ACTION.UPDATE_ACADEMIC_DATA:
            return {
                ...state,
                academic: { ...state.academic, ...action.payload }
            };
        case ONBOARDING_ACTION.UPDATE_PROFESSIONAL_DATA:
            return {
                ...state,
                professional: { ...state.professional, ...action.payload }
            };
        case ONBOARDING_ACTION.UPDATE_SOCIAL_DATA:
            return {
                ...state,
                social: { ...state.social, ...action.payload }
            };
        case ONBOARDING_ACTION.UPDATE_GOALS_DATA:
            return {
                ...state,
                goals: { ...state.goals, ...action.payload }
            };
        case ONBOARDING_ACTION.RESET:
            return initialOnboardingState;
        default:
            return state;
    }
}
