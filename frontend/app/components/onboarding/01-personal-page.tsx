import { TextField, Button, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PersonalData } from "@/app/redux/onboarding/onboarding-types";

interface PersonalPageProps {
    data: PersonalData;
    onUpdate: (data: PersonalData) => void;
    onNext: () => void;
}

export default function PersonalPage({ data, onUpdate, onNext }: PersonalPageProps) {
    const [formData, setFormData] = useState<PersonalData>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (field: keyof PersonalData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = { ...formData, [field]: e.target.value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" gutterBottom>Personal Information</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Tell us a bit about yourself
            </Typography>

            <TextField
                label="Full Name"
                value={formData.name || ''}
                onChange={handleChange('name')}
                required
                fullWidth
            />

            <TextField
                label="Preferred Name (optional)"
                value={formData.preferredName || ''}
                onChange={handleChange('preferredName')}
                fullWidth
                helperText="What would you like to be called?"
            />

            <TextField
                label="Pronouns (optional)"
                value={formData.pronouns || ''}
                onChange={handleChange('pronouns')}
                fullWidth
                placeholder="e.g., she/her, he/him, they/them"
            />

            <TextField
                label="Birthdate (optional)"
                type="date"
                value={formData.birthdate || ''}
                onChange={handleChange('birthdate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button type="submit" variant="contained">Next</Button>
            </Box>
        </Box>
    );
}
