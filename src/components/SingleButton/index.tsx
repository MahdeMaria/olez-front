import { Button, useTheme } from '@mui/material'
import { useState } from 'react'

interface SingleButtonProps {
    label: string
    size?: 'small' | 'medium' | 'large'
    onClick?: () => void
}

export default function SingleButton({ label, size = 'large', onClick }: SingleButtonProps) {
    const theme = useTheme()
    const [isSelected, setIsSelected] = useState(false)

    const handleClick = () => {
        setIsSelected((prev) => !prev)
        if (onClick) onClick()
    }

    return (
        <Button
            variant='contained'
            color={isSelected ? 'primary' : 'secondary'}
            onClick={handleClick}
            size={size}
            sx={{
                textTransform: 'none',
                boxShadow: 'none',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: 600,
                height: '68px',
                minWidth: '270px',
                color: isSelected ? theme.palette.secondary.main : theme.palette.primary.main,
            }}
        >
            {label}
        </Button>
    )
}
