import { Box, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material'

interface AlertBoxProps {
    listDisc?: boolean
    label: string
    errors: string[]
}

export default function AlertBox({ label, errors, listDisc = false }: AlertBoxProps) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                background: theme.palette.common.white,
                border: '2px solid',
                borderColor: theme.palette.warning.main,
                borderRadius: '15px',
                p: '30px 40px',
                mt: '20px',
            }}
        >
            <Typography
                variant='h6'
                sx={{
                    color: theme.palette.warning.main,
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    mb: 0,
                }}
            >
                {label}
            </Typography>

            <List sx={{ listStyleType: listDisc ? 'disc' : 'none', pl: 0 }}>
                {errors.map((item, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', mb: 0, p: 0 }}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
