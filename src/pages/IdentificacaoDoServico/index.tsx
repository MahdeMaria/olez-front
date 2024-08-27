import {Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AlertBox from '../../components/AlertBox'
import WizardNavigation from '../../components/ArrowNavigation'
import ContextData from '../../components/ContextData'
import Header from '../../components/Header'
import InputText from '../../components/InputText'
import PageTitle from '../../components/PageTittle'
import Question from '../../components/Question'
import { RouterPath } from '../../constants/routes'
import { useDeclarationStore } from '../../store/declarationStore'
import ButtonGroup from '../../components/ButtonGroup'

export default function IdentificaçãoDoServico() {
    const navigate = useNavigate()
    const { form, handleFormChange, handleSave, handleFormLogout } = useDeclarationStore()

    const handleOptionClick = (option: string) => {
        handleFormChange({ burialPlan: option })
    }

    const handleNext = () => {
        if (form.burialPlan === 'Seguradora') {
            handleSave()
            handleFormLogout()
            navigate(RouterPath.SAIDA_FLUXO)
        }
        if (form.deceasedPersonName) {
            handleSave()
            navigate(RouterPath.LOCALIDADE)
        } else if (form.clienteConseguiuLocalizarCPF === 'Sim') {
            if (form.planoFoiEncontrado === 'Sim') {
                handleSave()
                navigate(RouterPath.IDENTIFICACAO_ASSOCIADO_BEM_SUCEDIDA)
                return
            } else if (form.planoFoiEncontrado === 'Não') {
                handleSave()
                navigate(RouterPath.IDENTIFICACAO_ASSOCIADO_BUSCA_PLANO)
                return
            }
            /* return setClienteConseguiuLocalizarCPFSave(true) */
        } else if (form.clienteConseguiuLocalizarCPF === 'Não') {
            navigate(RouterPath.IDENTIFICACAO_ASSOCIADO_BUSCA_PLANO)
            return
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
                        <PageTitle title='Identificação do Serviço 1/2  ' />
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
                    text={'A família do Sr(a). possuí plano funerário do Grupo Zelo? '}
                >
                    <ButtonGroup
                        label={' Clique no botão correspondente à resposta do cliente ​'}
                        options={['Associado', 'Seguradora', 'Particular']}
                        value={form.burialPlan}
                        onClick={handleOptionClick}
                    />
                </Question>

                {form.burialPlan === 'Associado' && (
                    <Question
                        number={2}
                        text={
                            'O(a) Sr(a). pode me informar o CPF do titular? Você pode encontrar o CPF no boleto/carnê do plano, ok?'
                        }
                    >
                        <ButtonGroup
                            label={'  O cliente conseguiu localizar o CPF?​'}
                            options={['Sim', 'Não']}
                            value={form.clienteConseguiuLocalizarCPF}
                            onClick={(val) => {
                                handleFormChange({ clienteConseguiuLocalizarCPF: val })
                            }}
                        />

                        {form.clienteConseguiuLocalizarCPF === 'Sim' && (
                            <>
                                {/*  <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <InputText
                                            label='Digite o CPF do declarante'
                                            mask={CpfMask}
                                            value={form.burialPlanCpf || ''}
                                            onChange={(e) =>
                                                handleFormChange({ burialPlanCpf: e.target.value })
                                            }
                                        />
                                    </Grid>
                                </Grid> */}

                                <>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} lg={6}>
                                            <AlertBox
                                                label={'Atenção'}
                                                errors={['Busque o plano no Sisfuner']}
                                            />
                                        </Grid>
                                    </Grid>
                                    <ButtonGroup
                                        label={'Indique se o plano foi encontrado​'}
                                        options={['Sim', 'Não']}
                                        value={form.planoFoiEncontrado}
                                        onClick={(val) => {
                                            handleFormChange({ planoFoiEncontrado: val })
                                        }}
                                    />
                                </>
                            </>
                        )}
                    </Question>
                )}

                {form.burialPlan === 'Particular' ? (
                    <Question
                        number={2}
                        text={
                            'Agora eu vou precisar que o(a) Sr(a). me diga o nome completo da pessoa que veio a óbito, por favor.'
                        }
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <InputText
                                    label='Digite o nome completo da pessoa que veio a óbito'
                                    value={form.deceasedPersonName || ''}
                                    onChange={(e) =>
                                        handleFormChange({ deceasedPersonName: e.target.value })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Question>
                ) : null}

                <WizardNavigation onClickNext={handleNext} onClickPrev={handleBack} />
            </Container>
        </>
    )
}
