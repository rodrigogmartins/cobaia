import {Tabela} from './tabela.class.js';
import {getFi, getFI, getFR, getFr, getInterval}
    from './metodosdeinformacoes.js';

document.addEventListener('DOMContentLoaded', function() {
    const BTN = document.querySelector('#gerar');
    const FILTROS = [document.querySelector('#Fr'),
        document.querySelector('#FR'),
        document.querySelector('#Fi'),
        document.querySelector('#FI')];
    const LABELS = document.querySelector('#table-labels');
    const COLUNAS = document.querySelectorAll('.informacoes');

    BTN.addEventListener('click', function() {
        const TITULO = document.querySelector('#titulo').value ||
            'Meus Dados';
        const CABECALHO = document.querySelector('#cabecalho').value ||
            'Quantidades';
        const FONTE = document.querySelector('#fonte').value ||
            'Fonte Desconhecida';
        const DADOS = document.querySelector('#dados').value;
        const stats = new Map;
        const INFORMACOES = new Tabela(TITULO, CABECALHO, DADOS, FONTE);
        const INTERVALOS = getInterval(INFORMACOES.dados,
            INFORMACOES.intervalo);
        clear(LABELS, COLUNAS, INFORMACOES);
        const fi = getFi(INFORMACOES.dados, INTERVALOS);
        const fr = getFr(fi, INFORMACOES.dados.length);
        stats.set('Fr', fr);
        stats.set('FR', getFR(fr));
        stats.set('Fi', fi);
        stats.set('FI', getFI(fi));
        const filtros = [];
        for (const checkbox of FILTROS) {
            montarTabela(checkbox, LABELS);
            if (checkbox.checked) filtros.push(checkbox.id);
        }
        mostrarIntervalos(INTERVALOS, COLUNAS);
        mostrarDados(filtros, COLUNAS, stats);
    });
});

const clear = function(LABELS, COLUNAS, INFORMACOES) {
    if (LABELS !== '') {
        LABELS.innerHTML = '';
        const TH = document.createElement('th');
        TH.setAttribute('id', 'table-cabecalho');
        TH.textContent = INFORMACOES.cabecalho;
        LABELS.appendChild(TH);
    }
    for (let i = 0; i < COLUNAS.length; i++) {
        COLUNAS[i].innerHTML = '';
    }
    const TITULO = document.querySelector('#tituloTabela');
    TITULO.textContent = INFORMACOES.titulo;
    const FONTE = document.querySelector('#fonteTabela');
    FONTE.textContent = INFORMACOES.fonte;
};

const montarTabela = function(checkbox, LABELS) {
    if (checkbox.checked) {
        const TH = document.createElement('th');
        TH.textContent = checkbox.id;
        LABELS.appendChild(TH);
    }
};

const mostrarIntervalos = function(INTERVALOS, COLUNAS) {
    for (let i = 0; i < INTERVALOS.length; i++) {
        const TD = document.createElement('td');
        let texto = '';
        (i === INTERVALOS.length-1) ?
            texto = `${INTERVALOS[i][0]} ├┤ ${INTERVALOS[i][1]}` :
            texto = `${INTERVALOS[i][0]} ├ ${INTERVALOS[i][1]}`;
        TD.textContent = texto;
        COLUNAS[i].appendChild(TD);
    }
    const TD = document.createElement('td');
    TD.textContent = 'Total: ';
    COLUNAS[COLUNAS.length-1].appendChild(TD);
};

const mostrarDados = function(filtros, COLUNAS, stats) {
    for (let k = 0; k < filtros.length; k++) {
        const vetor = stats.get(filtros[k]);
        for (let j = 0; j < 5; j++) {
            const TD = document.createElement('td');
            if (filtros[k] === 'Fr' || filtros[k] === 'FR') {
                (typeof vetor[j] !== 'string') ?
                    TD.textContent = vetor[j] + '%' :
                    TD.textContent = vetor[j];
            } else {
                TD.textContent = vetor[j];
            }
            COLUNAS[j].appendChild(TD);
        }
    }
};
