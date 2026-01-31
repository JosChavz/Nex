import { TextField, Button, Box, Typography, Chip, Autocomplete, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ProfessionalData } from "@/app/redux/onboarding/onboarding-types";

interface ProfessionalPageProps {
    data: ProfessionalData;
    onUpdate: (data: ProfessionalData) => void;
    onNext: () => void;
    onBack: () => void;
}

const interestOptions = [
    'Web Development',
    'Mobile Development',
    'Game Development',
    'Data Science',
    'Machine Learning',
    'Research',
    'Electrical Engineering',
    'Hardware',
    'DevOps',
    'Cybersecurity',
    'UI/UX Design',
    'Cloud Computing'
];

export default function ProfessionalPage({ data, onUpdate, onNext, onBack }: ProfessionalPageProps) {
    const [formData, setFormData] = useState<ProfessionalData>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = { ...formData, resumeURL: e.target.value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleInterestToggle = (interest: string) => {
        const current = formData.interests || [];
        const updated = {
            ...formData,
            interests: current.includes(interest)
                ? current.filter(i => i !== interest)
                : [...current, interest]
        };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" gutterBottom>Professional Interests</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                What areas are you interested in?
            </Typography>

            <FormControl component="fieldset">
                <FormLabel component="legend">Select your interests</FormLabel>
                <FormGroup>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                        {interestOptions.map((interest) => (
                            <FormControlLabel
                                key={interest}
                                control={
                                    <Checkbox
                                        checked={formData.interests?.includes(interest) || false}
                                        onChange={() => handleInterestToggle(interest)}
                                    />
                                }
                                label={interest}
                            />
                        ))}
                    </Box>
                </FormGroup>
            </FormControl>

            <TextField
                label="Resume URL (optional)"
                value={formData.resumeURL || ''}
                onChange={handleResumeChange}
                fullWidth
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                helperText="Share a link to your resume if you'd like"
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={onBack} variant="outlined">Back</Button>
                <Button type="submit" variant="contained">Next</Button>
            </Box>
        </Box>
    );
}
