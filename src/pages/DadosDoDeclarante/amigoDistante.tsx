import { Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'
import ButtonGroup from '../../components/ButtonGroup'

export default function DadosDoDeclaranteAmigoDistante() {
    const navigate = useNavigate()
    const { form, handleFormChange, handleSave,handleFormLogout } = useDeclarationStore()

    const handleNext = () => {
        if (form.responsavelFornecerInformação === 'Sim') {
            handleSave()
            navigate(RouterPath.IDENTIFICACAO_SERVICO)
        } else if (form.responsavelFornecerInformação === 'Não') {
            handleSave()
            handleFormLogout()
            navigate(RouterPath.SAIDA_FLUXO)
        }
    }

    const handleBack = () => {
        navigate(RouterPath.DADOS_DECLARANTE)
    }
    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Dados do Declarante' />
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

                <Question
                    number={1}
                    text={
                        'O(A) Sr(a). será o responsável por fornecer todas informações necessárias?'
                    }
                >
                    <ButtonGroup
                        label={'Clique no botão correspondente à resposta do cliente​'}
                        options={['Sim', 'Não']}
                        value={form.responsavelFornecerInformação}
                        onClick={(value) =>
                            handleFormChange({ responsavelFornecerInformação: value })
                        }
                    />
                </Question>

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
