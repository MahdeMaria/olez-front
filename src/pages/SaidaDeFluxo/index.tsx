import { PostAdd } from '@mui/icons-material'
import { Box, Container, Divider, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import NavigationButton from '../../components/NavigationButton'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'

export default function SaidaDeFluxo() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { handleFormLogout } = useDeclarationStore()
    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Box
                    sx={{ minHeight: 'calc(100vh - 370px)', display: 'flex', alignItems: 'center' }}
                >
                    <Grid container direction='row' justifyContent='center'>
                        <Grid item xs={12} lg={7}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant='h1'
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: '40px',
                                        lineHeight: '48px',
                                        fontWeight: 600,
                                        marginBottom: '20px',
                                    }}
                                >
                                    Seguir com o atendimento conforme modelo atual da Central de
                                    Óbito.
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    Recarregue a tela para iniciar um novo atendimento.
                                </Typography>
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
