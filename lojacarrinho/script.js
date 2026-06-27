const produtos = [
    { id: 1, nome: "Câmera Digital Canon R100", preco: 3750.90, quantidade: 1 },
    { id: 2, nome: "Copo Quencher Stanley", preco: 359.00, quantidade: 1 },
    { id: 3, nome: "Fone Edifier W600BT", preco: 152.90, quantidade: 1 },
    { id: 4, nome: "Microfone Lapela", preco: 69.95, quantidade: 1 },
    { id: 5, nome: "JBL Go 4 Bluetooth", preco: 69.95, quantidade: 1 },
    { id: 6, nome: "Apple AirTag", preco: 999.99, quantidade: 1 },
    { id: 7, nome: "Power Bank Ugreen", preco: 236.71, quantidade: 1 },
    { id: 8, nome: "Ventosa de Silicone", preco: 19.90, quantidade: 1 },
    { id: 9, nome: "Ray-Ban META Wayfarer", preco: 3499.00, quantidade: 1 }
];

let carrinho = JSON.parse(
    localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(id) {
    const produto = produtos.find(produto => produto.id === id);
    
    const itemExistente = carrinho.find(produto => produto.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto });
    }

    salvarNoLocalStorage();
    atualizarCarrinho();
} 

function removerDoCarrinho(id) {
    const itemIndex = carrinho.findIndex(produto => produto.id === id);

    if (itemIndex > -1) {
        if (carrinho[itemIndex].quantidade > 1) {
            carrinho[itemIndex].quantidade--;
        } else {
            carrinho.splice(itemIndex, 1);
        }
    }

    salvarNoLocalStorage();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const container = document.querySelector('#itenscarrinho');
    const totalElemento = document.querySelector('#valortotal');
    
    container.innerHTML = "";
    let totalGeral = 0;

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Carrinho vazio</p>";
    }

    carrinho.forEach(produto => {
        const precoTotalItem = produto.preco * produto.quantidade;
        totalGeral += precoTotalItem;

        const div = document.createElement('div');
        div.className = 'itemnocarrinho';
        div.innerHTML = `
            <div>
                <p><strong>${produto.nome}</strong></p>
                <p>${produto.quantidade}x R$ ${produto.preco.toFixed(2)}</p>
            </div>
            <div>
                <p>R$ ${precoTotalItem.toFixed(2)}</p>
                <button onclick="removerDoCarrinho(${produto.id})" style="background:red; padding: 2px 8px;">X</button>
            </div>
        `;
        container.appendChild(div);
    });

    totalElemento.innerText = totalGeral.toFixed(2);
}

const selectFiltro = document.querySelector('#selectFiltro');

selectFiltro.addEventListener('change', (evento) => {
    const cards = document.querySelectorAll('.cardproduto'); 
    const valorFiltro = evento.target.value;

    cards.forEach((card, index) => {
        const preco = produtos[index].preco;
        let exibir = true;

        switch (valorFiltro) {
            case 'ate50':
                exibir = preco <= 50;
                break;
            case 'acima50':
                exibir = preco > 50;
                break;
            default:
                exibir = true;
        }

        card.style.display = exibir ? "flex" : "none";
    });
});


function salvarNoLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function limparCarrinho() {
    carrinho = [];
    salvarNoLocalStorage();
    atualizarCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
});
