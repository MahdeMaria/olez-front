import { useEffect } from 'react'
import { getHealthCheck } from './services/healthCheck'
import { Home } from '@mui/icons-material'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { RouterPath } from './constants/routes'
import DadosDoDeclarante from './pages/DadosDoDeclarante'
import DeclaracaoDeObito from './pages/DeclaracãoDeNascimento'
import Destinacao from './pages/Destinacao'
import DirecionamentoUnidade from './pages/DirecionamentoUnidade'
import Endereco from './pages/Endereco'
import FinalNPS from './pages/FinalNPS'
import IdentificacaoDoServico from './pages/IdentificacaoDoServico'
import Localidade from './pages/Localidade'
import MensagensHospital from './pages/MensagemHospital'
import MensagemAgenteFunerario from './pages/MensagemNascimento'
import Orietacoes from './pages/OrientacaoFinal'
import SaidaDeFluxo from './pages/SaidaDeFluxo'
import Saudacao from './pages/Saudacao'
import theme from './styles/theme'


function App() {
    useEffect(() => {
        getHealthCheck()
    },[])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path={RouterPath.HOME} element={<Home />} />
                    <Route path={RouterPath.SAUDACAO} element={<Saudacao />} />
                    <Route path={RouterPath.DADOS_DECLARANTE} element={<DadosDoDeclarante />} />
                    {/* <Route
                        path={RouterPath.DADOS_DECLARANTE_FAMILIA_SIM}
                        element={<DadosDoDeclaranteFamiliaSim />}
                    /> */}
                    {/* <Route
                        path={RouterPath.DADOS_DECLARANTE_AMIGO_DISTANTE}
                        element={<DadosDoDeclaranteAmigoDistante />}
                    /> */}
                    <Route
                        path={RouterPath.IDENTIFICACAO_SERVICO}
                        element={<IdentificacaoDoServico />}
                    />
                   {/*  <Route
                        path={RouterPath.IDENTIFICACAO_ASSOCIADO_BUSCA_PLANO}
                        element={<IdentificacaoDoServicoBuscaPlano />}
                    /> */}
                   {/*  <Route
                        path={RouterPath.IDENTIFICACAO_ASSOCIADO_BEM_SUCEDIDA}
                        element={<IdentificacaoDoServicoBuscaBemSucedida />}
                    /> */}
                    <Route path={RouterPath.LOCALIDADE} element={<Localidade />} />
                    <Route path={RouterPath.DECLARACAO_DE_OBITO} element={<DeclaracaoDeObito />} />
                    {/* <Route
                        path={RouterPath.DECLARAÇÃO_DE_OBITO_RESIDENCIA}
                        element={<DeclaracaoDeObitoResidencia />}
                    /> */}
                    <Route path={RouterPath.DESTINACAO} element={<Destinacao />} />
                    <Route
                        path={RouterPath.DIRECIONAMENTO_UNIDADE}
                        element={<DirecionamentoUnidade />}
                    />
                    <Route path={RouterPath.ORIENTACOES_FINAIS} element={<Orietacoes />} />
                    <Route
                        path={RouterPath.MENSAGEM_FUNERARIO}
                        element={<MensagemAgenteFunerario />}
                    />
                    <Route path={RouterPath.ENDERECO} element={<Endereco />} />
                    <Route
                        path={RouterPath.MENSAGEM_FUNERARIO}
                        element={<MensagemAgenteFunerario />}
                    />
                    <Route path={RouterPath.FINAL_NPS} element={<FinalNPS />} />
                    <Route path={RouterPath.SAIDA_FLUXO} element={<SaidaDeFluxo />} />
                    <Route path={RouterPath.MENSAGENS_HOSPITAL} element={<MensagensHospital />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App
