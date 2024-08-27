import { Container, Grid } from '@mui/material'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import InputText from '../../components/InputText'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { useDeclarationStore } from '../../store/declarationStore'

export default function MensagemAgenteFunerario() {
    const { form } = useDeclarationStore()
    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Mensagem Agente Funerário' />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <ContextData
                            declarante={form.declarantName}
                            celular={form.declarantFirstPhone}
                            falecido={form.deceasedPersonName}
                            preOrdemServico={form.funeralType}
                            servico={form.burialPlan}
                            horario={new Date().toLocaleTimeString()}
                        />
                    </Grid>
                </Grid>
                <Question number={1} text={'Mensagem para o agente funerário'}>
                    <InputText multiline placeholder='Digite uma descrição' />
                </Question>

                <WizardNavigation />
            </Container>
        </>
    )
}
