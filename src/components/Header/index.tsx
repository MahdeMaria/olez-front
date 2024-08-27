import { Logout } from '@mui/icons-material'
import { AppBar, Box, Button, Container, Toolbar, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'

export default function Header() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { handleFormLogout } = useDeclarationStore()

    const handleLogout = () => {
        handleFormLogout()
        navigate(RouterPath.SAIDA_FLUXO)
    }

    return (
        <>
            <AppBar
                position='static'
                sx={{ backgroundColor: theme.palette.primary.dark, py: 1, mb: '35px' }}
            >
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Box
                            component='img'    
                            alt='Du Beneficios'
                            sx={{ width: '140px' }}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            variant='text'
                            endIcon={<Logout sx={{ color: theme.palette.secondary.main }} />}
                            sx={{ color: theme.palette.common.white, fontWeight: 700 }}
                            onClick={handleLogout}
                        >
                            Sair
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}
