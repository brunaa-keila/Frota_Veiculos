// Dados simulados de veículos
const veiculos = [
    { modelo: "Fusca", fabricante: "Volkswagen", ano: 1985, cor: "Azul", tipo: "Carro" },
    { modelo: "Hornet", fabricante: "Honda", ano: 2012, cor: "Preto", tipo: "Moto" },
    { modelo: "Civic", fabricante: "Honda", ano: 2020, cor: "Branco", tipo: "Carro" },
    { modelo: "XJ6", fabricante: "Yamaha", ano: 2015, cor: "Vermelho", tipo: "Moto" },
];

// Função para carregar a tabela com os veículos
function carregarTabela(veiculosParaExibir = veiculos) {
    const tabela = document.querySelector("#tabelaVeiculos tbody");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

    veiculosParaExibir.forEach((veiculo, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${veiculo.modelo}</td>
            <td>${veiculo.fabricante}</td>
            <td>${veiculo.ano}</td>
            <td>${veiculo.cor}</td>
            <td>${veiculo.tipo}</td>
            <td class="actions">
                <button class="edit" onclick="editarVeiculo(${index})">Editar</button>
                <button class="details" onclick="detalharVeiculo(${index})">Detalhes</button>
                <button class="delete" onclick="excluirVeiculo(${index})">Excluir</button>
            </td>
        `;

        tabela.appendChild(tr);
    });
}

// Funções CRUD
function editarVeiculo(index) {
    const veiculo = veiculos[index];
    const novoModelo = prompt("Novo Modelo:", veiculo.modelo);
    if (novoModelo) {
        veiculo.modelo = novoModelo;
        carregarTabela();
    }
}

function detalharVeiculo(index) {
    const veiculo = veiculos[index];
    alert(`Detalhes do veículo:
    Modelo: ${veiculo.modelo}
    Fabricante: ${veiculo.fabricante}
    Ano: ${veiculo.ano}
    Cor: ${veiculo.cor}
    Tipo: ${veiculo.tipo}`);
}

function excluirVeiculo(index) {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
        veiculos.splice(index, 1);
        carregarTabela();
    }
}

function adicionarVeiculo() {
    const modelo = document.getElementById("modalModelo").value;
    const fabricante = document.getElementById("modalFabricante").value;
    const ano = document.getElementById("modalAno").value;
    const cor = document.getElementById("modalCor").value;
    const tipo = document.getElementById("modalTipo").value;

    if (modelo && fabricante && ano && cor && tipo) {
        // Cria o novo veículo
        const novoVeiculo = { modelo, fabricante, ano: parseInt(ano), cor, tipo };

        // Verifica se já existe um array de veículos no localStorage
        const veiculosSalvos = JSON.parse(localStorage.getItem('veiculos')) || [];
        
        // Adiciona o novo veículo ao array
        veiculosSalvos.push(novoVeiculo);
        
        // Salva novamente no localStorage
        localStorage.setItem('veiculos', JSON.stringify(veiculosSalvos));

        // Atualiza a tabela com o novo veículo
        carregarTabela(veiculosSalvos); 

        fecharModal(); // Fecha o modal após salvar
    }
}


// Filtro da tabela
function filtrarTabela() {
    const tipoFiltro = document.getElementById("tipo").value.toLowerCase();
    const corFiltro = document.getElementById("cor").value.toLowerCase();
    const modeloFiltro = document.getElementById("modelo").value.toLowerCase();
    const anoFiltro = document.getElementById("ano").value;

    const veiculosFiltrados = veiculos.filter(veiculo => {
        return (
            (tipoFiltro === "" || veiculo.tipo.toLowerCase().includes(tipoFiltro)) &&
            (corFiltro === "" || veiculo.cor.toLowerCase().includes(corFiltro)) &&
            (modeloFiltro === "" || veiculo.modelo.toLowerCase().includes(modeloFiltro)) &&
            (anoFiltro === "" || veiculo.ano.toString().includes(anoFiltro))
        );
    });

    // Atualiza a tabela com os dados filtrados
    carregarTabela(veiculosFiltrados);
}

// Função para abrir o modal
function abrirModal() {
    modal.classList.add('show'); // Adiciona a classe 'show' ao modal
    document.querySelector('.container').classList.add('blur'); // Adiciona o desfoque ao conteúdo
}

// Função para fechar o modal
function fecharModal() {
    modal.classList.remove('show'); // Remove a classe 'show' ao modal
    document.querySelector('.container').classList.remove('blur'); // Remove o desfoque do conteúdo
}

// Referência ao botão de adicionar e ao modal
const btnAdicionar = document.getElementById("btnAdicionarVeiculo");
const modal = document.getElementById("modal");
const btnFecharModal = document.getElementById("btnFecharModal");

// Ação de adicionar veículo abre o modal
btnAdicionar.addEventListener("click", abrirModal);

// Ação de fechar o modal
btnFecharModal.addEventListener("click", fecharModal);

// Fecha o modal ao clicar fora dele
window.addEventListener("click", (event) => {
    if (event.target === modal || event.target === btnFecharModal) {
        fecharModal();
    }
});

// Inicializa a tabela e o filtro
document.addEventListener("DOMContentLoaded", () => {
    carregarTabela();
    // Inicializa os filtros
    const filtroTipo = document.getElementById("tipo");
    const filtroCor = document.getElementById("cor");
    const filtroModelo = document.getElementById("modelo");
    const filtroAno = document.getElementById("ano");

    filtroTipo.addEventListener("input", filtrarTabela);
    filtroCor.addEventListener("input", filtrarTabela);
    filtroModelo.addEventListener("input", filtrarTabela);
    filtroAno.addEventListener("input", filtrarTabela);
});
