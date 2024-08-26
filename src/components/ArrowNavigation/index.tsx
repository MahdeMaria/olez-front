import { East, West } from '@mui/icons-material'
import { Box, Button, Typography, useTheme } from '@mui/material'

interface WizardNavigationProps {
    labelPrev?: string
    labelNext?: string
    onClickPrev?: (option: any) => void
    onClickNext?: () => void
    disablePrev?: boolean
    disableNext?: boolean
    hidePrev?: boolean
    hideNext?: boolean
}

export default function WizardNavigation({
    labelPrev = 'Anterior',
    labelNext = 'Salvar e Avançar',
    onClickPrev,
    onClickNext,
    disablePrev,
    disableNext,
    hidePrev,
    hideNext,
}: WizardNavigationProps) {
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
        <Box sx={{ display: 'flex', justifyContent: hidePrev ? 'flex-end' : 'space-between' }}>
            {!hidePrev && (
                <Button
                    startIcon={
                        <Box sx={{ ...iconStyles, marginRight: '8px' }}>
                            <West />
                        </Box>
                    }
                    disableRipple
                    sx={buttonStyles}
                    onClick={onClickPrev}
                    disabled={disablePrev}
                >
                    <Typography className='text'>{labelPrev}</Typography>
                </Button>
            )}

            {!hideNext && (
                <Button
                    endIcon={
                        <Box sx={{ ...iconStyles, marginLeft: '8px' }}>
                            <East />
                        </Box>
                    }
                    disableRipple
                    sx={buttonStyles}
                    onClick={onClickNext}
                    disabled={disableNext}
                >
                    <Typography className='text'>{labelNext}</Typography>
                </Button>
            )}
        </Box>
    )
}
