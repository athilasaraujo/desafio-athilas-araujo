class CaixaDaLanchonete {
    constructor() {
        // Inicializa o cardápio e formas de pagamento
        this.cardapio = new Map([
            // Definições dos itens no cardápio com descrição e valor
            ['cafe', { descricao: 'Café', valor: 3.00 }],
            ['chantily', { descricao: 'Chantily (extra do Café)', valor: 1.50 }],
            ['suco', { descricao: 'Suco Natural', valor: 6.20 }],
            ['sanduiche', { descricao: 'Sanduíche', valor: 6.50 }],
            ['queijo', { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 }],
            ['salgado', { descricao: 'Salgado', valor: 7.25 }],
            ['combo1', { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 }],
            ['combo2', { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }]
        ]);

        // Formas de pagamento aceitas
        this.formasDePagamento = new Set(['dinheiro', 'debito', 'credito']);
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        // Verifica a forma de pagamento
        if (!this.formasDePagamento.has(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        // Verifica se há itens no carrinho
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        const itemQuantities = {};
        const principaisPedidos = new Set(); // Conjunto para armazenar códigos dos itens principais

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            // Verifica se o item está no cardápio
            if (!this.cardapio.has(codigo)) {
                return 'Item inválido!';
            }

            const item = this.cardapio.get(codigo);
            const parsedQuantidade = parseInt(quantidade, 10);

            // Verifica se a quantidade é válida
            if (parsedQuantidade === 0) {
                return 'Quantidade inválida!';
            }

            // Verifica itens extras e associa ao item principal
            if (codigo === 'chantily' || codigo === 'queijo') {
                const principalCodigo = codigo.startsWith('chantily') ? 'cafe' : 'sanduiche';
                principaisPedidos.add(principalCodigo); // Adicionar principal ao conjunto
            }

            total += item.valor * parsedQuantidade;

            // Contabiliza a quantidade de cada item
            itemQuantities[codigo] = itemQuantities[codigo] || 0;
            itemQuantities[codigo] += parsedQuantidade;
        }

        // Verifica se todos os itens extras têm seus itens principais associados
        for (const principal of principaisPedidos) {
            if (!itemQuantities[principal]) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        // Aplica descontos ou taxas de acordo com a forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaDePagamento === 'credito') {
            total *= 1.03;
        } else if (formaDePagamento === 'debito') {
            total *= 1; // Debito não tem alteração no valor
        }

        // Formata o total e retorna como string
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };