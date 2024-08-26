import { Box, Divider, Switch, Typography } from '@mui/material'

interface QuestionProps {
    number: number
    text: string
    isSwitchEnabled?: boolean
    children?: React.ReactNode
}

export default function Question({ number, text, isSwitchEnabled, children }: QuestionProps) {
    return (
        <>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                    sx={{
                        alignItems: 'center',
                        border: '1px solid #404040',
                        borderRadius: '50%',
                        color: '#404040',
                        display: 'flex',
                        fontWeight: 600,
                        height: '32px',
                        justifyContent: 'center',
                        mt: '2px',
                        width: '32px',
                    }}
                >
                    0{number}
                </Box>

                <Typography
                    sx={{
                        color: '#404040',
                        fontSize: '27px',
                        fontWeight: 600,
                        lineHeight: '36px',
                        width: 'calc(100% - 42px)',
                    }}
                >
                    {text}
                    {isSwitchEnabled && <Switch defaultChecked />}
                </Typography>
            </Box>

            {children}

            <Divider sx={{ my: '50px' }} />
        </>
    )
}
