
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

export default function DadosDoDeclarante() {
    const navigate = useNavigate()
    const { form, handleFormChange, handleSave,handleFormLogout } = useDeclarationStore()

    const handleOptionClick = (option: string) => {
        handleFormChange({ kinshipDegree: option })
    }

    const handleNext = () => {
        if (form.kinshipDegree === 'Familiar / Amigo Próximo') {
            if (form.primeiroContatoDaFamilia === 'Não') {
                handleSave()
                handleFormLogout()
                navigate(RouterPath.SAIDA_FLUXO)
            } else if (form.primeiroContatoDaFamilia === 'Sim') {
                handleSave()
                navigate(RouterPath.DADOS_DECLARANTE_FAMILIA_SIM)
                return
            }
            return handleFormChange({ primeiroContatoDaFamiliaSave: 'yes' })
        } else if (
            form.kinshipDegree === 'Familiar / Amigo Distante' ||
            'Não possui relacionamento direto com o falecido'
        ) {
            handleSave()
            navigate(RouterPath.DADOS_DECLARANTE_AMIGO_DISTANTE)
        }
    }

    const handleBack = () => {
        navigate(RouterPath.SAUDACAO)
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

                <Question number={1} text={'Qual o seu grau de parentesco com o(a) falecido(a)?'}>
                    <ButtonGroup
                        label={'Marque a opção que a pessoa se encaixa melhor​'}
                        value={form.kinshipDegree}
                        options={[
                            'Familiar / Amigo Próximo',
                            'Familiar / Amigo Distante',
                            'Não possui relacionamento direto com o falecido',
                        ]}
                        onClick={handleOptionClick}
                    />
                </Question>

                {form.kinshipDegree === 'Familiar / Amigo Próximo' ? (
                    <Question
                        number={2}
                        text={
                            'Preciso confirmar com o(a) Sr(a). se esse é o primeiro contato da família sobre este óbito? '
                        }
                    >
                        <ButtonGroup
                            label={'Clique no botão correspondente à resposta do cliente​'}
                            options={['Sim', 'Não']}
                            value={form.primeiroContatoDaFamilia}
                            onClick={(value) =>
                                handleFormChange({ primeiroContatoDaFamilia: value })
                            }
                        />
                    </Question>
                ) : null}

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
