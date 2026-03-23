enum TiposItens {
    BURGUER, SOBREMESA, BEBIDA
}

export class Item {
    id: number;
    nome: string;
    valor: number;
    desc: string;
    tipo: TiposItens;
    qtd: number;

    constructor(id: number, nome: string, valor: number, desc: string, tipo: TiposItens, qtd: number) {
        this.id = id
        this.nome = nome
        this.valor = valor
        this.desc = desc
        this.tipo = tipo
        this.qtd = qtd
    }
}