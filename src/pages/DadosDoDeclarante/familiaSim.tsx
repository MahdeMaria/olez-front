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

export default function DadosDoDeclaranteFamiliaSim() {
    const navigate = useNavigate()
    const { form, handleFormChange, handleSave,handleFormLogout } = useDeclarationStore()

    const handleNext = () => {
        if (form.responsibleForInformation) {
            if (form.responsibleForInformation === 'Não' || form.haveCondition == 'Não') {
                handleSave()
                handleFormLogout()
                navigate(RouterPath.SAIDA_FLUXO)
            } else if (form.responsibleForInformation === 'Sim' && form.haveCondition == 'Sim') {
                handleSave()
                navigate(RouterPath.IDENTIFICACAO_SERVICO)
            }
        } else {
            alert('Por favor, responda todas as perguntas antes de prosseguir.')
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
                        value={form.responsibleForInformation}
                        label={'Clique no botão correspondente à resposta do cliente​'}
                        options={['Sim', 'Não']}
                        onClick={(val) => handleFormChange({ responsibleForInformation: val })}
                    />
                </Question>

                {form.responsibleForInformation === 'Sim' ? (
                    <Question
                        number={2}
                        text={`Sr(a). ${form.declarantName}, antes de dar prosseguimento gostaria de verificar se o(a) senhor(a) está em condições de continuar respondendo e se está acompanhando, caso precise de algum amparo aí no local.`}
                    >
                        <ButtonGroup
                            value={form.haveCondition}
                            label={'Clique no botão correspondente à resposta do cliente​'}
                            options={['Sim', 'Não']}
                            onClick={(val) => handleFormChange({ haveCondition: val })}
                        />
                    </Question>
                ) : null}

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
