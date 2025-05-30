let data = {};

// Inicialização ao carregar a página
    document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';

    await loadJSON(); // Aguarda o carregamento do JSON antes de chamar loadAreas
});

// Carregar JSON Externo
async function loadJSON() {
    try {
        const response = await fetch('backend/data.json');
        if (!response.ok) {
            throw new Error("Erro ao carregar o JSON: " + response.statusText);
        }
        const jsonResponse = await response.json();
        data = jsonResponse.data; // Acessa apenas a chave "data"

        console.log("Dados carregados:", data); // Verificar se os dados estão corretos
        loadAreas(); // Carregar as áreas após JSON ser carregado
    } catch (error) {
        console.error("Erro ao carregar o JSON:", error);
    }
}

const descricaoDetalhada = {
    "A06: Entender necessidades de enxoval para a equipe": "Faça o login e, em seguida, clique no ícone localizado no canto inferior central da tela para realizar o cadastro do seu veículo.",
    "A05: Cadastrar veículo no aplicativo do Zona Azul": "Vá até o menu de veículos e insira as informações necessárias para o cadastro do novo veículo.",
    "A02: Receber programas (PGR)": "<img src='img/img-segurança/Doc. Preenchimento de EPI e AplicaÃ§Ã£o dos Programas de SST (3) 05.01.2024 - Pedro Couto Diagrama.png' style='width: 100%; height: auto;'>"
};

// Carregar áreas
function loadAreas() {
    const areaSelect = document.getElementById('areas');
    areaSelect.innerHTML = '<option value="">Selecione uma área:</option>';
    Object.keys(data).forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
    });
}

// Carregar cargos
function loadCargos() {
    const area = document.getElementById('areas').value;
    const cargoSelect = document.getElementById('cargos');
    cargoSelect.innerHTML = '<option value="">Selecione um cargo:</option>';
    resetProcessDropdown();

    if (area) {
        Object.keys(data[area]).forEach(cargo => {
            const option = document.createElement('option');
            option.value = cargo;
            option.textContent = cargo;
            cargoSelect.appendChild(option);
        });
        cargoSelect.disabled = false;
    } else {
        cargoSelect.disabled = true;
    }
}

// Carregar processos
function loadProcessos() {
    const area = document.getElementById('areas').value;
    const cargo = document.getElementById('cargos').value;
    const processoSelect = document.getElementById('processos');
    resetProcessDropdown();

    if (cargo) {
        Object.keys(data[area][cargo]).forEach(processo => {
            const option = document.createElement('option');
            option.value = processo;
            option.textContent = processo;
            processoSelect.appendChild(option);
        });
        processoSelect.disabled = false;
    } else {
        processoSelect.disabled = true;
    }
}

// Carregar detalhes do processo
function loadDetalhes() {
    const area = document.getElementById('areas').value;
    const cargo = document.getElementById('cargos').value;
    const processo = document.getElementById('processos').value;
    const detalhesList = document.getElementById('detalhes-list');

    if (processo) {
        const etapas = data[area][cargo][processo];
        detalhesList.innerHTML = '';
        etapas.forEach(etapa => {
            const li = document.createElement('li');
            li.textContent = etapa;
            li.onclick = () => openModal(etapa);
            detalhesList.appendChild(li);
        });
        document.getElementById('detalhes').style.display = 'block';
    }


        // Mapeamento do nome do processo para a imagem do fluxograma correspondente
        //SEGURANÇA 
        let fluxogramaUrl;
        if (processo === "Preenchimento de EPI e Aplicação dos Programas de SST") {
            fluxogramaUrl = 'img/img-segurança/Doc. Preenchimento de EPI e AplicaÃ§Ã£o dos Programas de SST (3) 05.01.2024 - Pedro Couto Diagrama.png';
        } else if (processo === "Atendimento aos Requisitos Legais SSO") {
            fluxogramaUrl = 'img/img-segurança/DOC. ATENDIMENTO AOS REQUISITOS LEGAIS SSO (1) 25.06.2024 - EDUARDO GODOY Diagrama.png';
        } else if (processo === "Fiscalizações de SST") {
            fluxogramaUrl = 'img/img-segurança/DOC. FiscalizaÃ§Ãµes de SST (3) 05.01.24 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Levantamento e Avaliação de Perigos e Riscos") {
            fluxogramaUrl = 'img/img-segurança/DOC. LEVANTAMENTO E AVALIAÃÃO DE PERIGOS E RISCOS (1) 25.06.2024 - Arthur Alves  Diagrama.png';
        } else if (processo === "Manutenção do Escritório da Empresa") {
            fluxogramaUrl = 'img/img-segurança/DOC. MANUTENÃÃO DO ESCRITORIO DA EMPRESA (2) 27.06.2024 - Arthur Alves Diagrama.png';
        } else if (processo === "Regularização da Brigada de Incêndios e Simulados") {
            fluxogramaUrl = 'img/img-segurança/DOC. RegularizaÃ§Ã£o da brigada de incÃªndios e simulados (2)  27.06.24 - EDUARDO GODOY Diagrama.png';
        } else if (processo === "Treinamentos de Integração de Segurança") {
            fluxogramaUrl = 'img/img-segurança/Doc. Treinamentos de SeguranÃ§a (3) 05.01.2024 - Pedro Couto Diagrama.png';
        } 
        
        //COMERCIAL
        else if (processo === "Acompanhamento de Oportunidade") {
            fluxogramaUrl = 'img/img-comercial/DOC. ACOMPANHAMENTO DE OPORTUNIDADE (3) 27.02.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Análise de Editais") {
            fluxogramaUrl = 'img/img-comercial/DOC. ANÃLISE DE EDITAIS TO BE (2) 15.03.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Atualização de Documentação") {
            fluxogramaUrl = 'img/img-comercial/DOC. ATUALIZAÃÃO DE DOCUMENTAÃÃO TO BE (1) 26.01.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Captação de Oportunidade de Licitação") {
            fluxogramaUrl = 'img/img-comercial/DOC. CAPTAÃÃO DE OPORTUNIDADE (LICITAÃÃO) TO BE (2) 22.02.2024 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Elaboração da Proposta") {
            fluxogramaUrl = 'img/img-comercial/DOC. ELABORAÃÃO DA PROPOSTA TO BE (4) 22.02.2024 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Substituição de Profissionais de Contrato Vigente") {
            fluxogramaUrl = 'img/img-comercial/DOC. SUBSTITUIÃÃO DE PROFISSIONAIS DE CONTRATO VIGENTE TO BE (1) 22.02.2024 - ARTHUR MEDEIROS Diagrama.png';
        } 
        
        //PLANEJAMENTO
        else if (processo === "Assessoria nos Planejamentos dos Contratos") {
            fluxogramaUrl = 'img/img-planejamento/DOC. ASSESSORIA NOS PLANEJAMENTOS DOS CONTRATOS (1) 18.12.23 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Atualização de Status dos Contratos") {
            fluxogramaUrl = 'img/img-planejamento/DOC.  ATUALIZAÃÃO DE STATUS DOS CONTRATOS (1) 20.12.23 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Coleta de Dados Profissionais e Despesas") {
            fluxogramaUrl = 'img/img-planejamento/Doc. Coleta de Dados Profissionais e Despesas (1) 18.12.23 - Arthur Medeiros Diagrama.png';
        } else if (processo === "Encerramento dos Contratos") {
            fluxogramaUrl = 'img/img-planejamento/DOC. ENCERRAMENTO DOS CONTRATOS (2) 26.12.23 - ARTHUR MEDEIROS Diagrama (1).png';
        } else if (processo === "Previsão de Despesas e Receitas dos Contratos Ativos") {
            fluxogramaUrl = 'img/img-planejamento/Doc. PrevisÃ£o do acompanhamento de despesas e receitas dos contratos (1) 17.07.2024 - Breno Diagrama.png';
        } 

        //ADM E FINANCEIRO
        else if (processo === "Atendimento de Demanda de Informações Financeiras") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. ATENDIMENTO DE DEMANDA DE INFORMAÃÃES FINANCEIRAS TO BE (1) 02.04.24 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Processamento de Pagamento de Demandas Específicas") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. PROCESSAMENTO DE PAGAMENTO DE DEMANDAS ESPECÃFICAS TO BE (2) 02.04.24 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Proposição de Pagamentos") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. PROPOSIÃÃO DE PAGAMENTOS TO BE (2) 02.04.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Realizar Análise de Conciliação") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. REALIZAR ANÃLISE DE CONCILIAÃÃO (2) 20.12.2023 - MOZART MENDES Diagrama.png';
        } else if (processo === "Reunião com Equipe Financeira (Diretoria e Operacional)") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. REUNIÃO COM EQUIPE FINANCEIRA (DIRETORIA E OPERACIONAL) (1) 22.12.23 - ARTHUR MEDEIROS .png';
        } else if (processo === "Reunião com Equipe Financeira (Lideranças)") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. REUNIÃO COM EQUIPE FINANCEIRA (LIDERANÃAS) (2) 22.12.23 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Reunir Comprovantes de Pagamentos da Semana") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. REUNIR COMPROVANTES DE PAGAMENTOS DA SEMANA (1) 22.12.23 - ARTHUR MEDEIROS .png';
        } else if (processo === "Verificação de Pagamentos a Receber pelas Contas Bancárias") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. VERIFICAÃÃO DE PAGAMENTOS A RECEBER PELAS CONTAS BANCÃRIAS TO BE (1) 02.04.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Auditoria Anual") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. AUDITORIA ANUAL TO BE (2) 02.04.24 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Auditoria Mensal") {
           fluxogramaUrl = 'img/img-adm_fin/Doc. Auditoria Mensal TO BE (1) 04.02.2024 - Pedro Couto Diagrama.png';
        } else if (processo === "Envio de Comprovantes de Pagamentos") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. ENVIO DE COMPROVANTES DE PAGAMENTOS TO BE (1) 02.04.24- MOZART MENDES Diagrama.png';
        } else if (processo === "Lançamento de Aportes para Pagamento") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. LANÃAMENTO DE APORTES PARA PAGAMENTO TO BE (2) 02.04.24 - MOZART MENDES  Diagrama.png';
        } else if (processo === "Lançamento de RPA") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. LANÃAMENTO DE RPA TO BE (2) 02.04.24 - MOZART MENDES Diagrama.png';
        } else if (processo === "Lançamento dos CREA's e ART's") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. LANÃAMENTO DOS CREAÂ´S E ARTÂ´S TO BE (2) 02.04.2024 - MOZART MENDES  Diagrama.png';
        } else if (processo === "Prestação de Contas de Viagens") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. PRESTAÃÃO DE CONTAS DE VIAGENS TO BE (3) 02.04.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Prestação de Conta Referente ao Adiantamento de Fundo Fixo") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. PRESTAÃÃO DE CONTA REFERENTE AO ADIANTAMENTO DE FUNDO FIXO TO BE (2) 02.04.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Solicitação de Reembolsos") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. SOLICITAÃÃO DE REEMBOLSOS TO BE (3) 02.04.24 - MOZART MENDES Diagrama.png';
        } else if (processo === "Acompanhamento de Relatórios Contábeis, Financeiros, de Performance e Controladoria") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. ACOMPANHAMENTO DE RELATÃRIOS CONTÃBEIS E FINANCEIROS TO BE (2) 02.04.24 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Reunião de Planejamento de Fluxo de Caixa (Geral e Diretoria)") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. REUNIÃO DE PLANEJAMENTO DE FLUXO DE CAIXA TO BE (2) 02.04.24 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Reunião do Financeiro com Operacional em Situações de Crise de Liquidez") {
            fluxogramaUrl = 'img/img-adm_fin/DOC. REUNIÃO DE PLANEJAMENTO DE FLUXO DE CAIXA TO BE (2) 02.04.24 - ARTHUR MEDEIROS Diagrama.png';
        } 

        //ADM E COMPRAS
        else if (processo === "Inclusão de Contrato no Sistema") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. INCLUSÃO DE CONTRATO NO SISTEMA (2) 05.01.2024 - ROBERTA ZIRPOLI Diagrama.png';
        } else if (processo === "Lançamento de Notas e Faturas dos Fornecedores") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. LANÃAMENTO DE NOTAS E FATURAS DOS FORNECEDORES (2) 05.01.2024 - MOZART MENDES  Diagrama.png';
        } else if (processo === "Realizar Faturamento das Medições") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. REALIZAR FATURAMENTO DAS MEDIÃÃES (1) 06.02.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Revisão das Notas de Fornecedores") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. RevisÃ£o das notas de Forncecedores (2) 05.01.2024 - ROBERTA ZIRPOLI E MOZART MENDES Diagrama.png';
        } else if (processo === "Análise de Contrato de Aluguel") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. ANÃLISE DE CONTRATO DE ALUGUEL (2) 13.12.2023 - MOZART MENDES E CECILIA MAIOCCHI Diagrama.png';
        } else if (processo === "Lançamento de Notas e Faturas de Imóveis e Outros") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. LanÃ§amento de notas e faturas de ImÃ³veis e Outros (2) 13.12.2023 - MOZART MENDES Diagrama.png';
        } else if (processo === "Lançamento de Despesas de Imóveis") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. LanÃ§amentos de Despesas de ImÃ³veis (2) 14.12.2023 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Realização de Cadastro de Cliente e Fornecedor") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. REALIZAÃÃO DE CADASTRO DE CLIENTE E FORNECEDOR (2) 13.12.2023 - MOZART MENDES Diagrama.png';
        } else if (processo === "Recebimento de Demonstrativo de Pagamento dos Correios") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. REALIZAR FATURAMENTO DAS MEDIÃÃES (1) 06.02.2024 - MOZART MENDES Diagrama.png';
        } else if (processo === "Solicitação de Envio de Material pelo Correios") {
            fluxogramaUrl = 'img/img-adm_compras/DOC. SOLICITAÃÃO DE ENVIO DE MATERIAL PELO CORREIOS (2) 14.12.23 - ARTHUR MEDEIROS Diagrama.png';
        } else if (processo === "Assinatura de Documentos") {
            fluxogramaUrl = 'img/img-adm_compras/Doc. Assinatura de Documentos (2) 16.12.2023 - Pedro Couto Diagrama.png';
        } else if (processo === "Autorização de Pagamentos e Transferências") {
            fluxogramaUrl = 'img/img-adm_compras/Doc. AutorizaÃ§Ã£o de Pagamentos e TransferÃªncias (2) 16.12.2023 - Pedro Couto Diagrama.png';
        } else if (processo === "Rateio de Passagens e Hospedagens") {
            fluxogramaUrl = 'img/img-adm_compras/Doc. Rateio de Passagens e Hospedagens (2) 16.12.2023 - Pedro Couto Diagrama.png';
        }
        
        //TI
        else if (processo === "Bloqueio ou Redirecionamento de Conta") {
            fluxogramaUrl = 'img/img-ti/Doc. ConfiguraÃ§Ã£o de Equipamento (2) 21.12.2023 - Lucas Galindo Diagrama.png';
        } else if (processo === "Configuração de Equipamento") {
            fluxogramaUrl = 'img/img-ti/DOC. LANÃAMENTO DE NOTAS E FATURAS DOS FORNECEDORES (2) 05.01.2024 - MOZART MENDES  Diagrama.png';
        } else if (processo === "Encerramento de Contrato") {
            fluxogramaUrl = 'img/img-ti/Doc. Encerramento de contrato (1) 10.07.2024 - Breno FranÃ§a e Arthur Alves Diagrama.png';
        } else if (processo === "Início de Contrato") {
            fluxogramaUrl = 'img/img-ti/DOC. INÃCIO DO CONTRATO (2) 10.07.2024 - EDUARDO GODOY Diagrama (1).png';
        } else if (processo === "Lançamento de Nota Fiscal e Fatura de Software e Telefonia") {
            fluxogramaUrl = 'img/img-ti/Doc. LanÃ§amento de Nota Fiscal e Fatura de Software e Telefonia (2) 21.12.2023 - Lucas Galindo Diagrama.png';
        } else if (processo === "Manutenção dos Equipamentos de TI") {
            fluxogramaUrl = 'img/img-ti/Doc. ManutenÃ§Ã£o das MÃ¡quinas da Empresa (1) 21.12.2023 - Lucas Galindo Diagrama.png';
        } else if (processo === "Monitoramento de Contrato") {
            fluxogramaUrl = 'img/img-ti/Doc. Monitoramento de contrato (1) 10.07.2024 - Breno FranÃ§a e Arthur Alves Diagrama.png';
        } else if (processo === "Renovação de Licenças Atuais") {
            fluxogramaUrl = 'img/img-ti/Doc. RenovaÃ§Ã£o de LicenÃ§as Anuais (2) 21.12.2023 - Lucas Galindo Diagrama.png';
        } else if (processo === "Suporte Técnico aos Colaboradores") {
            fluxogramaUrl = 'img/img-ti/Doc. Suporte TÃ©cnico aos Colaboradores (1) 21.12.2023 - Lucas Galindo Diagrama.png';
        }

        else {
            fluxogramaUrl = null;
        }

        // Verificar se o URL do fluxograma foi definido e carregar a imagem
        const fluxogramaContainer = document.getElementById('fluxograma');
        const fluxogramaImagem = document.getElementById('fluxograma-imagem');

        if (fluxogramaUrl) {
            fluxogramaImagem.src = fluxogramaUrl;
            fluxogramaContainer.style.display = 'block';  // Mostrar o container
        } else {
            fluxogramaContainer.style.display = 'none';  // Ocultar o container se não houver imagem
        }
    }


function resetProcessDropdown() {
    const processoSelect = document.getElementById('processos');
    processoSelect.innerHTML = '<option value="">Selecione um processo:</option>';
    processoSelect.disabled = true;
    document.getElementById('detalhes-list').innerHTML = '';
    document.getElementById('fluxograma').style.display = 'none';
}

function openModal(etapa) {
    const descricao = descricaoDetalhada[etapa] || "Descrição detalhada não disponível.";
    document.getElementById('modal-description').innerHTML = descricao;
    openOverlay();
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    closeOverlay();
}

function openAddModal() {
    openOverlay();
    document.getElementById('add-process-modal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('add-process-modal').style.display = 'none';
    closeOverlay();
}

{
    function addNewProcess() {
    const area = document.getElementById('new-area').value.trim();
    const role = document.getElementById('new-role').value.trim();
    const process = document.getElementById('new-process').value.trim();
    const steps = document.getElementById('new-steps').value.split(';').map(step => step.trim());

    if (!area || !role || !process || steps.length === 0) {
        alert('Preencha todos os campos.');
        return;
    }

    if (!data[area]) {
        data[area] = {};
    }
    if (!data[area][role]) {
        data[area][role] = {};
    }

    data[area][role][process] = steps;

    alert('Processo adicionado com sucesso!');
    closeAddModal();
    loadAreas(); // Atualizar os dropdowns
}

// Envia os dados via POST para o endpoint correto
fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProcess)
})
.then(response => {
    if (response.ok) {
        alert('Processo adicionado com sucesso!');
        closeAddModal();
    } else {
        alert('Erro ao adicionar o processo.');
    }
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao adicionar o processo.');
});
}

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para ler JSON
app.use(bodyParser.json());

// Caminho do arquivo JSON
const dataFilePath = './data.json';

// Rota para adicionar um novo processo (endpoint atualizado)
app.post('/data', (req, res) => {
    try {
        const newProcess = req.body;

        // Lê o arquivo JSON existente
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Adiciona o novo processo aos dados
        if (!data.processos) {
            data.processos = [];
        }
        data.processos.push(newProcess);

        // Salva os dados de volta no arquivo JSON
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        res.status(200).send({ message: 'Processo adicionado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao adicionar processo.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


function openUpdateModal() {
    loadAreasForUpdate();
    openOverlay();
    document.getElementById('update-process-modal').style.display = 'block';
}

function closeUpdateModal() {
    document.getElementById('update-process-modal').style.display = 'none';
    closeOverlay();
}

function loadAreasForUpdate() {
    const areaSelect = document.getElementById('update-area');
    areaSelect.innerHTML = '<option value="">Selecione uma área:</option>';
    Object.keys(data).forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.text = area;
        areaSelect.appendChild(option);
    });
}

function populateUpdateRoles() {
    const area = document.getElementById('update-area').value;
    const roleSelect = document.getElementById('update-role');
    roleSelect.innerHTML = '<option value="">Selecione um cargo:</option>';
    document.getElementById('update-process').innerHTML = '<option value="">Selecione um processo:</option>';
    document.getElementById('update-steps').value = '';

    if (area) {
        Object.keys(data[area]).forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleSelect.appendChild(option);
        });
    }
}

function populateUpdateProcesses() {
    const area = document.getElementById('update-area').value;
    const role = document.getElementById('update-role').value;
    const processSelect = document.getElementById('update-process');
    processSelect.innerHTML = '<option value="">Selecione um processo:</option>';
    document.getElementById('update-steps').value = '';

    if (role) {
        Object.keys(data[area][role]).forEach(process => {
            const option = document.createElement('option');
            option.value = process;
            option.textContent = process;
            processSelect.appendChild(option);
        });
    }
}

function populateUpdateDetails() {
    const area = document.getElementById('update-area').value;
    const role = document.getElementById('update-role').value;
    const process = document.getElementById('update-process').value;

    if (process) {
        const steps = data[area][role][process];
        document.getElementById('update-steps').value = steps.join(', ');
    }
}

function updateProcess() {
    const area = document.getElementById('update-area').value;
    const role = document.getElementById('update-role').value;
    const process = document.getElementById('update-process').value;
    const steps = document.getElementById('update-steps').value.split(';').map(step => step.trim());

    if (!area || !role || !process || steps.length === 0) {
        alert('Preencha todos os campos.');
        return;
    }

    data[area][role][process] = steps;

    alert('Processo atualizado com sucesso!');
    closeUpdateModal();
    loadAreas();
}

function deleteProcess() {
    const area = document.getElementById('update-area').value;
    const role = document.getElementById('update-role').value;
    const process = document.getElementById('update-process').value;

    // Verificar se todos os campos necessários estão selecionados
    if (!area || !role || !process) {
        alert('Por favor, selecione a área, o cargo e o processo para excluir.');
        return;
    }

    // Confirmar exclusão
    const confirmDelete = confirm(`Tem certeza de que deseja excluir o processo "${process}"?`);
    if (!confirmDelete) return;

    // Remover o processo do objeto data
    delete data[area][role][process];

    // Verificar se o cargo ficou vazio
    if (Object.keys(data[area][role]).length === 0) {
        delete data[area][role]; // Remover o cargo se não tiver mais processos
    }

    // Verificar se a área ficou vazia
    if (Object.keys(data[area]).length === 0) {
        delete data[area]; // Remover a área se não tiver mais cargos
    }

    alert(`O processo "${process}" foi excluído com sucesso.`);
    closeUpdateModal();
    loadAreas(); // Atualizar os dropdowns
}

// Overlay handling
function openOverlay() {
    document.getElementById('modal-overlay').style.display = 'block';
}

function closeOverlay() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// Carregar dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadAreas();
});
