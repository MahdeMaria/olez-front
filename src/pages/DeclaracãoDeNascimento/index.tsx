import { Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AlertBox from '../../components/AlertBox'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'
import ButtonGroup from '../../components/ButtonGroup'

export default function DeclaracaoDeObito() {
    const navigate = useNavigate()

    const { form, handleFormChange, handleSave } = useDeclarationStore()

    const handleNext = () => {
        if (form.declaracaoDeObitoPreenchida) {
            handleSave()
            navigate(RouterPath.DESTINACAO)
        }
    }

    const handleBack = () => {
        navigate(RouterPath.LOCALIDADE)
    }

    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Declaração de Óbito' />
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
                    text={'A Declaração de Óbito (folha amarela) já está preenchida?'}
                >
                    <ButtonGroup
                        label={'Clique no botão que corresponde a resposta do cliente'}
                        options={['Sim', 'Não']}
                        value={form.declaracaoDeObitoPreenchida}
                        onClick={(val) => handleFormChange({ declaracaoDeObitoPreenchida: val })}
                    />
                    {form.declaracaoDeObitoPreenchida === 'Sim' ? (
                        <Grid item xs={12} lg={12}>
                            <AlertBox
                                label={'AVISAR AO CLIENTE:'}
                                listDisc
                                errors={[
                                    'O(A) Sr(a). vai precisar conferir o preenchimento de todos os campos da Declaração de Óbito. Se algum deles estiver errado ou em branco você vai precisar solicitar a correção.',
                                    'Uma informação importante é que, caso não seja possível determinar o horário do óbito no campo correspondente deve constar a sigla IGN.',
                                ]}
                            />
                        </Grid>
                    ) : null}

                    {form.declaracaoDeObitoPreenchida === 'Não' ? (
                        <Grid item xs={12} lg={12}>
                            <AlertBox
                                label={'AVISAR AO CLIENTE:'}
                                listDisc
                                errors={[
                                    'A Declaração de Óbito é necessária para a realização do serviço.',
                                    'Assim que estiver com esse documento em mãos o(a) Sr(a). vai precisar conferir o preenchimento de todos os campos da Declaração de Óbito. Se algum deles estiver errado ou em branco você vai precisar solicitar a correção.',
                                    'Uma informação importante é que, caso não seja possível determinar o horário do óbito no campo correspondente deve constar a sigla IGN.',
                                ]}
                            />
                        </Grid>
                    ) : null}
                </Question>

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
