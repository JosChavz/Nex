import {
    ONBOARDING_ACTION,
    PersonalData,
    AcademicData,
    ProfessionalData,
    SocialData,
    GoalsData,
    OnboardingAction
} from "./onboarding-types";

export const onboardingActions = {
    updatePersonal: (data: PersonalData): OnboardingAction => ({
        type: ONBOARDING_ACTION.UPDATE_PERSONAL_DATA,
        payload: data
    }),

    updateAcademic: (data: AcademicData): OnboardingAction => ({
        type: ONBOARDING_ACTION.UPDATE_ACADEMIC_DATA,
        payload: data
    }),

    updateProfessional: (data: ProfessionalData): OnboardingAction => ({
        type: ONBOARDING_ACTION.UPDATE_PROFESSIONAL_DATA,
        payload: data
    }),

    updateSocial: (data: SocialData): OnboardingAction => ({
        type: ONBOARDING_ACTION.UPDATE_SOCIAL_DATA,
        payload: data
    }),

    updateGoals: (data: GoalsData): OnboardingAction => ({
        type: ONBOARDING_ACTION.UPDATE_GOALS_DATA,
        payload: data
    }),

    reset: (): OnboardingAction => ({
        type: ONBOARDING_ACTION.RESET
    })
};
