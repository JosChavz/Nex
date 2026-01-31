import { TextField, Button, Box, Typography, Chip, Autocomplete } from "@mui/material";
import React, { useState, useEffect } from "react";
import { SocialData } from "@/app/redux/onboarding/onboarding-types";

interface SocialPageProps {
    data: SocialData;
    onUpdate: (data: SocialData) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function SocialPage({ data, onUpdate, onNext, onBack }: SocialPageProps) {
    const [formData, setFormData] = useState<SocialData>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (field: keyof SocialData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = { ...formData, [field]: e.target.value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleClubsChange = (_: any, value: string[]) => {
        const updated = { ...formData, clubs: value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" gutterBottom>Social & Professional Links</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Connect with the community
            </Typography>

            <TextField
                label="LinkedIn URL (optional)"
                value={formData.linkedinURL || ''}
                onChange={handleChange('linkedinURL')}
                fullWidth
                placeholder="https://linkedin.com/in/yourprofile"
            />

            <TextField
                label="GitHub URL (optional)"
                value={formData.githubURL || ''}
                onChange={handleChange('githubURL')}
                fullWidth
                placeholder="https://github.com/yourusername"
            />

            <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.clubs || []}
                onChange={handleClubsChange}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} key={index} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Clubs & Organizations (optional)"
                        placeholder="Type and press Enter"
                        helperText="Add any clubs or organizations you're part of"
                    />
                )}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={onBack} variant="outlined">Back</Button>
                <Button type="submit" variant="contained">Next</Button>
            </Box>
        </Box>
    );
}
