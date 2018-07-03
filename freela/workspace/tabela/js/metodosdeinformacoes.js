export function getFi(dados, intervalos) {
    dados = stringToNumber(dados);
    let quantidade = 0;
    const valores = [];
    for (const intervalo of intervalos) {
        for (const numero of dados) {
            if (intervalo[1] === dados[dados.length-1]) {
                quantidade +=
                    (numero >= intervalo[0] && numero <= intervalo[1]);
            } else {
                quantidade +=
                    (numero >= intervalo[0] && numero < intervalo[1]);
            }
        }
        valores.push(quantidade);
        quantidade = 0;
    }
    valores.push(dados.length);
    return valores;
}

export function getFI(vetor) {
    return [vetor[0], vetor[0] + vetor[1],
        vetor[0] + vetor[1] + vetor[2],
        vetor[0] + vetor[1] + vetor[2] + vetor[3], '▬▬▬'];
}

export function getFr(vetor, tamanho) {
    const pri = parseFloat(((vetor[0] * 100) / tamanho).toFixed(2));
    const seg = parseFloat(((vetor[1] * 100) / tamanho).toFixed(2));
    const ter = parseFloat(((vetor[2] * 100) / tamanho).toFixed(2));
    const qua = parseFloat(((vetor[3] * 100) / tamanho).toFixed(2));
    return [pri, seg, ter, qua, (pri + seg + ter + qua)];
}

export function getFR(vetor) {
    return [vetor[0], vetor[0] + vetor[1],
        vetor[0] + vetor[1] + vetor[2],
        vetor[0] + vetor[1] + vetor[2] + vetor[3], '▬▬▬'];
}

export function getInterval(dados, intervalo) {
    dados = stringToNumber(dados);
    const intervalos = [];
    let inicioIntervalo = dados[0];
    let fimIntervalo = inicioIntervalo + intervalo;
    while (fimIntervalo <= dados[dados.length-1]) {
        intervalos.push([inicioIntervalo, fimIntervalo]);
        inicioIntervalo = fimIntervalo;
        fimIntervalo += intervalo;
    }
    return intervalos;
}

function stringToNumber(vetor) {
    const vetorComNumero = [];
    for (let i = 0; i < vetor.length; i++) {
        vetorComNumero.push(parseInt(vetor[i]));
    }
    return vetorComNumero;
}

console.log('ok');
