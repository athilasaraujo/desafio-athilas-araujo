class CaixaDaLanchonete {
    constructor() {
        this.cardapio = new Map([
            ['cafe', { descricao: 'Café', valor: 3.00 }],
            ['chantily', { descricao: 'Chantily (extra do Café)', valor: 1.50 }],
            ['suco', { descricao: 'Suco Natural', valor: 6.20 }],
            ['sanduiche', { descricao: 'Sanduíche', valor: 6.50 }],
            ['queijo', { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 }],
            ['salgado', { descricao: 'Salgado', valor: 7.25 }],
            ['combo1', { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 }],
            ['combo2', { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }]
        ]);

        this.formasDePagamento = new Set(['dinheiro', 'debito', 'credito']);
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.has(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        const itemQuantities = {};

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            if (!this.cardapio.has(codigo)) {
                return 'Item inválido!';
            }

            const item = this.cardapio.get(codigo);
            total += item.valor * parseInt(quantidade, 10);

            if (codigo !== 'chantily' && codigo !== 'queijo') {
                if (codigo.startsWith('combo')) {
                    continue; // Ignorar combos
                }
                const principalCodigo = codigo.startsWith('combo') ? 'sanduiche' : codigo;
                if (!itens.includes(`${principalCodigo},1`)) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }

            itemQuantities[codigo] = itemQuantities[codigo] || 0;
            itemQuantities[codigo] += parseInt(quantidade, 10);
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            total *= 1.03; // Acrescentar 3% para pagamento a crédito
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };