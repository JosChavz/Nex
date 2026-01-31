"use client";

import {Box, Paper} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState, useReducer } from "react";
import PersonalPage from "@/app/components/onboarding/01-personal-page";
import AcademicPage from "@/app/components/onboarding/02-academic-page";
import ProfessionalPage from "@/app/components/onboarding/03-professional-page";
import SocialPage from "@/app/components/onboarding/04-social-page";
import GoalsPage from "@/app/components/onboarding/05-goals-page";
import { onboardingReducer, initialOnboardingState } from "@/app/redux/onboarding/onboarding-reducer";
import { onboardingActions } from "@/app/redux/onboarding/onboarding-actions";

const stepsArr = [
    'Personal',
    'Academic',
    'Professional',
    'Social',
    'Goals'
];
const stepsObj = stepsArr.map((step, index) => ({ id: index + 1, label: step }));

export default function OnboardingClientPage() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, stepsArr.length - 1));
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        try {
            // API call will be implemented next
            const response = await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            });

            if (response.ok) {
                // Redirect to dashboard after successful submission
                window.location.href = '/dashboard';
            } else {
                console.error('Failed to save onboarding data');
                alert('Failed to save. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting onboarding:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {stepsObj.map(({id, label}) => (
                        <Step key={id}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Shows the current step page */}
            <Paper square elevation={0} sx={{ p: 3, mb: 4 }}>
                {activeStep === 0 && (
                    <PersonalPage
                        data={state.personal}
                        onUpdate={(data) => dispatch(onboardingActions.updatePersonal(data))}
                        onNext={handleNext}
                    />
                )}
                {activeStep === 1 && (
                    <AcademicPage
                        data={state.academic}
                        onUpdate={(data) => dispatch(onboardingActions.updateAcademic(data))}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {activeStep === 2 && (
                    <ProfessionalPage
                        data={state.professional}
                        onUpdate={(data) => dispatch(onboardingActions.updateProfessional(data))}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {activeStep === 3 && (
                    <SocialPage
                        data={state.social}
                        onUpdate={(data) => dispatch(onboardingActions.updateSocial(data))}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {activeStep === 4 && (
                    <GoalsPage
                        data={state.goals}
                        onUpdate={(data) => dispatch(onboardingActions.updateGoals(data))}
                        onSubmit={handleFinalSubmit}
                        onBack={handleBack}
                        isSubmitting={isSubmitting}
                    />
                )}
            </Paper>
        </>
    );
}
