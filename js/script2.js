// Dados simulados para perguntas e respostas
const data = {
    "O que é a FCAP JR. Consultoria?": "A FCAP JR. é uma empresa júnior composta por estudantes da FCAP/UPE, que oferece consultorias empresariais em áreas como gestão financeira, gestão estratégica, comercial, e mais.",
    "Quais são as áreas de atuação da FCAP JR.?": "As principais áreas de atuação são Gestão Financeira, Gestão Estratégica, Gestão Comercial, Gestão de Pessoas, Plano de Negócios e Pesquisa de Mercado.",
    "Quem são os consultores da FCAP JR.?": "Os consultores são estudantes da FCAP/UPE que aplicam o conhecimento acadêmico em projetos reais de consultoria.",
    "Como a FCAP JR. agrega valor aos seus clientes?": "Oferecemos soluções personalizadas, combinando inovação, acompanhamento técnico e preços acessíveis.",
    "Como posso contratar os serviços da FCAP JR.?": "Para contratar nossos serviços, entre em contato pelo site ou nossas redes sociais e agende uma reunião.",
    "Quais são os diferenciais da FCAP JR.?": "A FCAP JR. se destaca pelo compromisso com inovação, preços acessíveis e alta qualidade nos projetos, supervisionados por profissionais da área.",
    "Como posso participar da FCAP JR. como consultor?": "Os estudantes da FCAP/UPE podem participar passando pelo nosso processo seletivo, que avalia competências técnicas e comportamentais."
};

// Função para carregar as perguntas no dropdown
function loadAreas() {
    const areaSelect = document.getElementById('areas');
    areaSelect.innerHTML = '<option value="">Selecione uma pergunta:</option>';
    const areas = Object.keys(data);
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.text = area;
        areaSelect.appendChild(option);
    });
}

// Função para carregar a resposta correspondente à pergunta selecionada
function loadAnswer() {
    const selectedQuestion = document.getElementById('areas').value;
    const respostaDiv = document.getElementById('resposta');
    const respostaTexto = document.getElementById('resposta-texto');

    if (selectedQuestion) {
        // Exibe a resposta correspondente à pergunta
        respostaTexto.textContent = data[selectedQuestion];
        respostaDiv.style.display = 'block';
    } else {
        // Esconde a div de resposta se nenhuma pergunta for selecionada
        respostaDiv.style.display = 'none';
    }
}

// Carregar as perguntas ao iniciar a página
document.addEventListener('DOMContentLoaded', loadAreas);
