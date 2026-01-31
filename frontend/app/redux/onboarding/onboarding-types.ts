export enum ONBOARDING_ACTION {
    UPDATE_PERSONAL_DATA = 'UPDATE_PERSONAL_DATA',
    UPDATE_ACADEMIC_DATA = 'UPDATE_ACADEMIC_DATA',
    UPDATE_PROFESSIONAL_DATA = 'UPDATE_PROFESSIONAL_DATA',
    UPDATE_SOCIAL_DATA = 'UPDATE_SOCIAL_DATA',
    UPDATE_GOALS_DATA = 'UPDATE_GOALS_DATA',
    RESET = 'RESET'
}

// State types
export interface PersonalData {
    name?: string;
    preferredName?: string;
    pronouns?: string;
    birthdate?: string;
}

export interface AcademicData {
    graduationYear?: string;
    major?: string;
    minor?: string;
    courses?: string[];
}

export interface ProfessionalData {
    interests?: string[];
    resumeURL?: string;
}

export interface SocialData {
    linkedinURL?: string;
    githubURL?: string;
    clubs?: string[];
}

export interface GoalsData {
    bio?: string;
    lookingFor?: string[];
}

export interface OnboardingState {
    personal: PersonalData;
    academic: AcademicData;
    professional: ProfessionalData;
    social: SocialData;
    goals: GoalsData;
}

// Action types
export type OnboardingAction =
    | { type: ONBOARDING_ACTION.UPDATE_PERSONAL_DATA; payload: PersonalData }
    | { type: ONBOARDING_ACTION.UPDATE_ACADEMIC_DATA; payload: AcademicData }
    | { type: ONBOARDING_ACTION.UPDATE_PROFESSIONAL_DATA; payload: ProfessionalData }
    | { type: ONBOARDING_ACTION.UPDATE_SOCIAL_DATA; payload: SocialData }
    | { type: ONBOARDING_ACTION.UPDATE_GOALS_DATA; payload: GoalsData }
    | { type: ONBOARDING_ACTION.RESET };
