export class Tabela {
    constructor(titulo, cabecalho, dados, fonte) {
        this._titulo = titulo;
        this._cabecalho = cabecalho;
        this._dados = dados.split(';').sort((a, b) => (a-b));
        this._intervalo = (this._dados[this._dados.length-1] -
            this._dados[0]) / 4;
        this._fonte = fonte;
    }

    get titulo() {
        return this._titulo;
    }

    get cabecalho() {
        return this._cabecalho;
    }

    get fonte() {
        return this._fonte;
    }

    get dados() {
        return this._dados;
    }

    get intervalo() {
        return this._intervalo;
    }
}

