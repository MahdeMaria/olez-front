import { PostAdd } from '@mui/icons-material'
import {
    Box,
    Container,
    Divider,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import NavigationButton from '../../components/NavigationButton'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'

export default function FinalNPS() {
    const navigate = useNavigate()
    const theme = useTheme()
    const { handleFormLogout, form, handleFormChange, handleSave } = useDeclarationStore()

    const handleRatingChange = (
        _event: React.MouseEvent<HTMLElement>,
        newRating: number | null,
    ) => {
        handleFormChange({ rating: newRating || 0 })
        handleSave()
    }

    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Box
                    sx={{ minHeight: 'calc(100vh - 370px)', display: 'flex', alignItems: 'center' }}
                >
                    <Grid container direction='row' justifyContent='center'>
                        <Grid item xs={12} lg={8}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant='h1'
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: '40px',
                                        lineHeight: '48px',
                                        fontWeight: 600,
                                        marginBottom: '80px',
                                    }}
                                >
                                    Agora, dê a sua nota para a facilidade de atendimento ao cliente
                                    com essa nova ferramenta:
                                </Typography>

                                <Box>
                                    <ToggleButtonGroup
                                        value={form.rating}
                                        exclusive
                                        onChange={handleRatingChange}
                                        sx={{
                                            display: 'flex',
                                            gap: '16px',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <ToggleButton
                                                key={rating}
                                                value={rating}
                                                sx={{
                                                    width: '64px',
                                                    height: '64px',
                                                    borderRadius: '50% !important',
                                                    border: `4px solid ${theme.palette.primary.main} !important`,
                                                    color: theme.palette.primary.main,
                                                    fontSize: '24px',
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',

                                                    '&.Mui-selected': {
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: theme.palette.primary.contrastText,
                                                    },
                                                    '&:hover': {
                                                        backgroundColor:
                                                            theme.palette.primary.light,
                                                        color: theme.palette.primary.contrastText,
                                                    },
                                                }}
                                            >
                                                {rating}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mt: '8px',
                                            px: '16px',
                                            maxWidth: '380px',
                                            mx: 'auto',
                                        }}
                                    >
                                        <Typography
                                            variant='body2'
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Ruim
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Bom
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Ótimo
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: '50px' }} />

                <NavigationButton
                    onClick={() => {
                        handleFormLogout()
                        navigate(RouterPath.HOME)
                    }}
                    label={'Iniciar um novo atendimento'}
                    icon={<PostAdd />}
                    direction={'prev'}
                />
            </Container>
        </>
    )
}
