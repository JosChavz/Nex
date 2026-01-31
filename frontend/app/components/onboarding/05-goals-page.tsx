import { TextField, Button, Box, Typography, Chip, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import { GoalsData } from "@/app/redux/onboarding/onboarding-types";

interface GoalsPageProps {
    data: GoalsData;
    onUpdate: (data: GoalsData) => void;
    onSubmit: () => void;
    onBack: () => void;
    isSubmitting?: boolean;
}

const lookingForOptions = [
    'Project Collaborators',
    'Study Partners',
    'Mentorship',
    'Networking',
    'Research Opportunities',
    'Internship Leads',
    'Career Advice',
    'Skill Sharing'
];

export default function GoalsPage({ data, onUpdate, onSubmit, onBack, isSubmitting }: GoalsPageProps) {
    const [formData, setFormData] = useState<GoalsData>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = { ...formData, bio: e.target.value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleLookingForChange = (_: any, value: string[]) => {
        const updated = { ...formData, lookingFor: value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" gutterBottom>Goals & Bio</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Tell us what you're looking for
            </Typography>

            <TextField
                label="Bio (optional)"
                value={formData.bio || ''}
                onChange={handleBioChange}
                fullWidth
                multiline
                rows={4}
                placeholder="Tell us about yourself, your interests, and what you're working on..."
                helperText="This will be visible on your profile"
            />

            <Autocomplete
                multiple
                options={lookingForOptions}
                value={formData.lookingFor || []}
                onChange={handleLookingForChange}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} key={index} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="What are you looking for? (optional)"
                        placeholder="Select options"
                        helperText="Help us connect you with the right people"
                    />
                )}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={onBack} variant="outlined" disabled={isSubmitting}>Back</Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
                </Button>
            </Box>
        </Box>
    );
}
