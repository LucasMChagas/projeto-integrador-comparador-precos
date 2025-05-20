const SUPABASE_URL = 'https://azwmadwdlpokwpbyrcip.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6d21hZHdkbHBva3dwYnlyY2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjI5ODcsImV4cCI6MjA2MzA5ODk4N30.Xr380ElUxEC4-f2roZXWkI6IKnO-CgEwzAfSplc3BkE';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const latestProducts = document.getElementById('latestProducts');
const favoritesList = document.getElementById('favoritesList');
const alertasPromocaoList = document.getElementById('alertasPromocaoList');
const productTemplate = document.getElementById('productTemplate');
const modal = document.getElementById('productModal');
const btnCriarAlerta = document.getElementById('btnCriarAlerta');
const modalDetalhesConteudo = document.getElementById('modalDetalhesConteudo');

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let alertas = JSON.parse(localStorage.getItem('alertas')) || [];

// Carregar tipos no select (dropdown)
async function carregarTiposProduto() {
    const { data, error } = await supabase
        .from('produtos')
        .select('tipo_produto');

    if (error) {
        console.error('Erro ao buscar tipos de produto:', error);
        return;
    }

    const tiposUnicos = new Set(data.map(item => item.tipo_produto));
    searchInput.innerHTML = '<option value="" disabled selected>🔍 Selecione um tipo de produto...</option>';

    tiposUnicos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        searchInput.appendChild(option);
    });
}

// Buscar produtos por tipo
async function buscarProdutosPorTipo(tipoProduto) {
    const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('tipo_produto', tipoProduto);

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
    return data;
}

// Criar card do produto
function criarCardProduto(produto) {
    const clone = productTemplate.content.cloneNode(true);
    const card = clone.querySelector('.product');

    card.querySelector('.product-image').src = produto.imagem_url || '../assets/no-image.png';
    card.querySelector('.tipo_produto').textContent = `${produto.tipo_produto} - ${produto.nome}`;
    card.querySelector('.product-amount').textContent = `${produto.quantidade || 0} ${produto.unidade || ''}`;

    const localIcon = produto.localizacao === "online" ? "🌐 Online" : "📍 Presencial";
    card.querySelector('.product-price').textContent = `R$ ${Number(produto.preco).toFixed(2).replace('.', ',')} | ${localIcon}`;

    card.querySelector('.product-verifications').textContent = `${produto.verificacoes || 0} verificações`;

    const btnFavorito = document.createElement('button');
    btnFavorito.textContent = favoritos.includes(produto.id) ? '⭐ Remover Favorito' : '☆ Favoritar';
    btnFavorito.className = 'btn-favorito';
    btnFavorito.onclick = () => toggleFavorito(produto.id);
    card.appendChild(btnFavorito);

    const btnDetalhes = card.querySelector('.btn-details');
    btnDetalhes.addEventListener('click', () => abrirModalDetalhes(produto));

    const btnVerificar = card.querySelector('.verify-offer');
    btnVerificar.addEventListener('click', async () => {
        const { data, error } = await supabase
            .from('produtos')
            .update({ verificacoes: (produto.verificacoes || 0) + 1 })
            .eq('id', produto.id)
            .select();

        if (error) {
            console.error('Erro ao atualizar verificações:', error);
            alert('Erro ao registrar verificação.');
            return;
        }

        produto.verificacoes = data[0].verificacoes;
        card.querySelector('.product-verifications').textContent = `${produto.verificacoes} verificações`;
    });

    return card;
}

// Renderizar produtos na tela
function renderizarProdutosDoBanco(produtos) {
    latestProducts.innerHTML = '';
    produtos.forEach(produto => {
        const card = criarCardProduto(produto);
        latestProducts.appendChild(card);
    });
}

// Favoritos: salvar e carregar
function salvarFavoritosLocalStorage() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function toggleFavorito(produtoId) {
    if (favoritos.includes(produtoId)) {
        favoritos = favoritos.filter(id => id !== produtoId);
    } else {
        favoritos.push(produtoId);
    }
    salvarFavoritosLocalStorage();
    carregarFavoritos();
}

async function carregarFavoritos() {
    favoritesList.innerHTML = '';
    if (favoritos.length === 0) {
        favoritesList.textContent = 'Nenhum favorito ainda.';
        return;
    }

    const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .in('id', favoritos);

    if (error) {
        console.error('Erro ao buscar favoritos:', error);
        return;
    }

    data.forEach(produto => {
        const card = criarCardProduto(produto);
        favoritesList.appendChild(card);
    });
}

// Alertas: salvar, adicionar, remover e carregar
function salvarAlertasLocalStorage() {
    localStorage.setItem('alertas', JSON.stringify(alertas));
}

function adicionarAlerta(tipoProduto) {
    if (!alertas.includes(tipoProduto)) {
        alertas.push(tipoProduto);
        salvarAlertasLocalStorage();
        alert(`Alerta criado para o tipo: ${tipoProduto}`);
        carregarAlertasSalvos();
    } else {
        alert('Alerta para esse tipo já existe!');
    }
}

function removerAlerta(tipoProduto) {
    alertas = alertas.filter(tipo => tipo !== tipoProduto);
    salvarAlertasLocalStorage();
    carregarAlertasSalvos();
}

async function carregarAlertasSalvos() {
    alertasPromocaoList.innerHTML = '';

    if (alertas.length === 0) {
        alertasPromocaoList.textContent = 'Nenhum alerta criado ainda.';
        return;
    }

    for (const tipo of alertas) {
        const { data: produtos, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('tipo_produto', tipo);

        if (error || !produtos || produtos.length === 0) {
            alertasPromocaoList.innerHTML += `<p>Não há produtos para o tipo "${tipo}".</p>`;
            continue;
        }

        const menorPrecoProduto = produtos.reduce((min, p) => p.preco < min.preco ? p : min, produtos[0]);

        const card = criarCardProduto(menorPrecoProduto);

        const btnRemoverAlerta = document.createElement('button');
        btnRemoverAlerta.textContent = '❌ Remover Alerta';
        btnRemoverAlerta.className = 'btn-remover-alerta';
        btnRemoverAlerta.style.marginTop = '10px';
        btnRemoverAlerta.onclick = () => {
            removerAlerta(tipo);
        };

        card.appendChild(btnRemoverAlerta);
        alertasPromocaoList.appendChild(card);
    }
}

// Abrir modal detalhes
function abrirModalDetalhes(produto) {
    modalDetalhesConteudo.style.display = 'block';

    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalLocation = document.getElementById('modalLocation');
    const modalLink = document.getElementById('modalLink');
    const modalLinkAnchor = modalLink.querySelector('a');

    modalTitle.textContent = `${produto.tipo_produto} - ${produto.nome}`;
    modalImage.src = produto.imagem_url || '../assets/no-image.png';
    modalDescription.textContent = produto.descricao || 'Sem descrição disponível.';
    modalPrice.textContent = `Preço: R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}`;
    modalLocation.textContent = `Localização: ${produto.localizacao}`;

    if (produto.link && produto.link.trim() !== '') {
        modalLink.style.display = 'block';
        modalLinkAnchor.href = produto.link;
    } else {
        modalLink.style.display = 'none';
    }

    modal.style.display = 'block';
}

// Eventos botões
searchButton.addEventListener('click', async () => {
    const tipoSelecionado = searchInput.value;
    if (!tipoSelecionado) {
        alert('Por favor, selecione um tipo de produto.');
        return;
    }
    const produtos = await buscarProdutosPorTipo(tipoSelecionado);
    renderizarProdutosDoBanco(produtos);
});

btnCriarAlerta.addEventListener('click', () => {
    const tipoSelecionado = searchInput.value;
    if (!tipoSelecionado) {
        alert('Selecione um tipo para criar alerta.');
        return;
    }
    adicionarAlerta(tipoSelecionado);
});

// Inicializações
carregarTiposProduto();
carregarFavoritos();
carregarAlertasSalvos();

// Fechar modal ao clicar no botão de fechar
const modalCloseBtn = document.querySelector('.close');
modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
