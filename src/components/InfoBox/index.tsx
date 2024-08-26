import {
    Box,
    List,
    ListItem,
    ListItemText,
    SxProps,
    Theme,
    Typography,
    useTheme,
} from '@mui/material'

interface Section {
    title?: string
    items?: string[]
}

interface InfoBoxProps {
    sections?: Section[]
    children?: React.ReactNode
    sx?: SxProps<Theme>
}

export default function InfoBox({ sections, children, sx }: InfoBoxProps) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                background: theme.palette.common.white,
                border: 0,
                borderRadius: '15px',
                p: '30px 40px',
                mt: '20px',
                ...sx,
            }}
        >
            {sections?.map((section, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                        variant='h6'
                        sx={{
                            color: theme.palette.primary.main,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        {section.title}
                    </Typography>

                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                        {section.items?.map((item, idx) => (
                            <ListItem key={idx} sx={{ display: 'list-item', mb: 0, p: 0 }}>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ))}

            {children}
        </Box>
    )
}
