import { Box, Button, Typography, useTheme } from '@mui/material'

interface NavigationButtonProps {
    icon: React.ReactNode
    label: string
    onClick?: () => void
    disabled?: boolean
    direction: 'prev' | 'next'
}

export default function NavigationButton({
    icon,
    label,
    onClick,
    disabled,
    direction,
}: NavigationButtonProps) {
    const theme = useTheme()

    const iconStyles = {
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '56px',
        width: '56px',
        borderRadius: '50%',
    }

    const buttonStyles = {
        fontWeight: 600,
        fontSize: '15px',
        padding: 0,

        '& .text': {
            fontWeight: 600,
            height: '70px',
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '15px',
        },

        '&:hover .text': {
            backgroundColor: '#11289C1F',
        },

        '&:hover': {
            backgroundColor: 'transparent',
        },
    }

    return (
        <Button
            startIcon={
                direction === 'prev' && <Box sx={{ ...iconStyles, marginRight: '8px' }}>{icon}</Box>
            }
            endIcon={
                direction === 'next' && <Box sx={{ ...iconStyles, marginLeft: '8px' }}>{icon}</Box>
            }
            disableRipple
            sx={buttonStyles}
            onClick={onClick}
            disabled={disabled}
        >
            <Typography className='text'>{label}</Typography>
        </Button>
    )
}
