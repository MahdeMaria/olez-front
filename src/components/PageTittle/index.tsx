import { Typography, useTheme } from '@mui/material'

interface PageTitleProps {
    title: string
}

const PageTitle = ({ title }: PageTitleProps) => {
    const theme = useTheme()

    return (
        <Typography
            variant='h1'
            gutterBottom
            sx={{
                color: theme.palette.primary.main,
                fontSize: 40,
                fontWeight: 600,
            }}
        >
            {title}
        </Typography>
    )
}

export default PageTitle
