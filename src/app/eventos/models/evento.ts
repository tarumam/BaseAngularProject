export class Evento {
    // constructor(id: string,
    //             nome: string,
    //             descricaoCurta: string,
    //             descricaoLonga: string,
    //             dataInicio: Date,
    //             dataFim: Date,
    //             gratuito: boolean,
    //             valor: string,
    //             online: boolean,
    //             nomeEmpresa: string,
    //             endereco: Endereco,
    //             categoriaId: string,
    //             organizadorId: string) {
    //     this.id = id;
    //     this.nome = nome;
    //     this.descricaoCurta = descricaoCurta;
    //     this.descricaoLonga = descricaoLonga;
    //     this.dataInicio = dataInicio;
    //     this.dataFim = dataFim;
    //     this.gratuito = gratuito;
    //     this.valor = valor;
    //     this.online = online;
    //     this.nomeEmpresa = nomeEmpresa;
    //     this.endereco = endereco;
    //     this.categoriaId = categoriaId;
    //     this.organizadorId = organizadorId;
    // }
    id: string;
    nome: string;
    descricaoCurta: string;
    descricaoLonga: string;
    dataInicio: Date;
    dataFim: Date;
    gratuito: boolean;
    valor: string;
    online: boolean;
    nomeEmpresa: string;
    endereco: Endereco;
    categoriaId: string;
    organizadorId: string;
}

export class Endereco {
    id: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    eventoId: string;
}

export interface Categoria {
    id: string;
    nome: string;
}
