import { Container, Grid } from '@mui/material'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'

// ALTERAR O NOME DA PAGINA NO COMPONENTE ABAIXO
// AO ALTERAR O NOME DO COMPONENTE IR LA NO ARQUIVO APP.TSX e fazer a rota do componente
export default function NomeDaPagina() {
    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='INSERIR O TITULO' />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <ContextData
                            declarante=''
                            celular=''
                            falecido=''
                            preOrdemServico=''
                            servico=''
                            horario=''
                        />
                    </Grid>
                </Grid>

                <Question number={1} text={''}>
                    {/* AQUI DENTRO VAI OS OUTROS COMPONENTES */}
                </Question>

                <WizardNavigation />
            </Container>
        </>
    )
}
