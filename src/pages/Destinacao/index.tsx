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

export default function Destinacao() {
    const navigate = useNavigate()

    const { form, handleFormChange, handleSave } = useDeclarationStore()

    const handleNext = () => {
        if (form.funeralType) {
            handleFormChange({ funeralTypeIsSaved: true })
        }

        if (
            form.funeralType 
            // !!form.deceasedPersonHaveClothes &&
            // !!form.companyClothesForFuneral
        ) {
            handleSave()
            navigate(RouterPath.DIRECIONAMENTO_UNIDADE)
        } 
    }

    const handleBack = () => {
        navigate(RouterPath.DECLARACAO_DE_OBITO)
    }

    return (
        <>
            <Header />

            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: '70px' }}>
                    <Grid item xs={12} lg={6}>
                        <PageTitle title='Destinação' />
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
                    text={'A família vai optar pelo sepultamento ou pela cremação?'}
                >
                    <ButtonGroup
                        label={' Clique no botão correspondente à resposta do cliente ​'}
                        value={form.funeralType}
                        options={['Sepultamento', 'Cremação', 'Não Definiu']}
                        onClick={(val) => handleFormChange({ funeralType: val })}
                    />
                    {form.funeralType === 'Cremação' || form.funeralType === 'Não Definiu' ? (
                        <Grid item xs={12} lg={12}>
                            <AlertBox
                                label={'AVISAR AO CLIENTE:'}
                                listDisc
                                errors={[
                                    'Caso a família opte por cremação, são necessárias duas assinaturas na Declaração de Óbito e o médico deve escrever em observações que não há indício de morte violenta',
                                ]}
                            />
                        </Grid>
                    ) : null}
                </Question>

                {form.deceasedPersonLocation === 'Hospital, UPA ou Posto de Saúde' ? (
                    <>
                        <Question number={2} text='Já está com a roupa do velório em mãos?'>
                            <ButtonGroup
                                label='Clique no botão que corresponde à resposta do cliente'
                                value={form.deceasedPersonHaveClothes}
                                options={['Sim', 'Não']}
                                onClick={(val) =>
                                    handleFormChange({ deceasedPersonHaveClothes: val })
                                }
                            />
                            {form.deceasedPersonHaveClothes === 'Não' ? (
                                <Grid item xs={12} lg={12}>
                                    <AlertBox
                                        label={'AVISAR AO CLIENTE:'}
                                        listDisc
                                        errors={[
                                            'Antes de ir até o Grupo Zelo, o(a) Sr(a). vai precisar pegar e levar as roupas do falecido para o agente funerário que irá realizar o seu atendimento na unidade.',
                                            'Para sua comodidade, se o(a) Sr(a). preferir o Grupo Zelo pode disponibilizar as roupas do velório do seu ente querido mediante compra.',
                                        ]}
                                    />
                                </Grid>
                            ) : null}
                        </Question>
                    </>
                ) : null}

                {form.deceasedPersonHaveClothes === 'Não' &&
                form.deceasedPersonLocation === 'Hospital, UPA ou Posto de Saúde' ? (
                    <Question
                        number={3}
                        text={
                            'O(A) Sr(a). deseja que o Grupo Zelo disponibilize as roupas para o velório?'
                        }
                    >
                        <ButtonGroup
                            value={form.companyClothesForFuneral}
                            label={' Clique no botão correspondente à resposta do cliente ​'}
                            options={['Sim', 'Não']}
                            onClick={(val) => handleFormChange({ companyClothesForFuneral: val })}
                        />
                    </Question>
                ) : null}

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
