import { Box, Button, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

interface ButtonGroupProps {
    label?: string
    value?: string
    options?: string[]
    size?: 'small' | 'medium' | 'large'
    onClick: (option: string) => void
}

export default function ButtonGroup({
    label,
    options = [],
    value,
    size = 'large',
    onClick,
}: ButtonGroupProps) {
    const theme = useTheme()
    const [selectedButton, setSelectedButton] = useState<number | null>(null)

    const handleButtonClick = (index: number) => {
        selectedButton
        setSelectedButton(index)
        onClick(options[index])
    }

    return (
        <>
            {label && (
                <Typography
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: '13px',
                        fontWeight: 600,
                        marginTop: 2,
                        marginBottom: 1,
                    }}
                >
                    <span style={{ color: theme.palette.warning.main }}>* </span>
                    {label}
                </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 2 }}>
                {options.map((label, index) => (
                    <Button
                        key={index}
                        variant='contained'
                        color={value === label ? 'primary' : 'secondary'}
                        onClick={() => handleButtonClick(index)}
                        size={size}
                        sx={{
                            textTransform: 'none',
                            boxShadow: 'none',
                            borderRadius: '16px',
                            fontSize: '18px',
                            fontWeight: 600,
                            height: '68px',
                            minWidth: '270px',
                            color:
                                value === label
                                    ? theme.palette.secondary.main
                                    : theme.palette.primary.main,
                        }}
                    >
                        {label}
                    </Button> 
                ))}
            </Box>
        </>
    )
}
