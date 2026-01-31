import { TextField, Button, Box, Typography, Chip, Autocomplete } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AcademicData } from "@/app/redux/onboarding/onboarding-types";

interface AcademicPageProps {
    data: AcademicData;
    onUpdate: (data: AcademicData) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function AcademicPage({ data, onUpdate, onNext, onBack }: AcademicPageProps) {
    const [formData, setFormData] = useState<AcademicData>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (field: keyof AcademicData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = { ...formData, [field]: e.target.value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleCoursesChange = (_: any, value: string[]) => {
        const updated = { ...formData, courses: value };
        setFormData(updated);
        onUpdate(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Typography variant="h5" gutterBottom>Academic Information</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Share your academic background
            </Typography>

            {/* TODO: Make sure that the graduation year is a valid year */}
            <TextField
                label="Graduation Year"
                value={formData.graduationYear || ''}
                onChange={handleChange('graduationYear')}
                required
                fullWidth
                placeholder="e.g., 2026"
                type="number"
                slotProps={{
                    htmlInput: { min: 1800, max: new Date().getFullYear() + 10 }
                }}
            />

            <TextField
                label="Major"
                value={formData.major || ''}
                onChange={handleChange('major')}
                required
                fullWidth
            />

            <TextField
                label="Minor (optional)"
                value={formData.minor || ''}
                onChange={handleChange('minor')}
                fullWidth
            />

            <Autocomplete
                multiple
                freeSolo
                options={[
                    "CSE186",
                    "CSE187",
                ]}
                value={formData.courses || []}
                onChange={handleCoursesChange}
                renderValue={(value, getItemProps) =>
                    value.map((option, index) => (
                        <Chip label={option} {...getItemProps({index})} key={index}/>
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Courses (optional)"
                        placeholder="Type and press Enter"
                        helperText="Add courses you've taken"
                    />
                )}
            />

            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                <Button onClick={onBack} variant="outlined">Back</Button>
                <Button type="submit" variant="contained">Next</Button>
            </Box>
        </Box>
    );
}
