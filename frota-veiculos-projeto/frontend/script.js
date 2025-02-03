


const veiculos = [
    { modelo: "Fusca", fabricante: "Volkswagen", ano: 1985, cor: "Azul", tipo: "Carro" },
    { modelo: "Hornet", fabricante: "Honda", ano: 2012, cor: "Preto", tipo: "Moto" },
    { modelo: "Civic", fabricante: "Honda", ano: 2020, cor: "Branco", tipo: "Carro" },
    { modelo: "XJ6", fabricante: "Yamaha", ano: 2015, cor: "Vermelho", tipo: "Moto" },
];


function carregarTabela(veiculosParaExibir = veiculos) {
    const tabela = document.querySelector("#tabelaVeiculos tbody");
    tabela.innerHTML = "";

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


function abrirModal() {
    modal.classList.add('show');
    document.querySelector('.container').classList.add('blur');
}


function fecharModal() {
    modal.classList.remove('show');
    document.querySelector('.container').classList.remove('blur');
}


function editarVeiculo(index) {
    const veiculo = veiculos[index];
    const modalEditar = document.getElementById('modalEditar');
    
    modalEditar.classList.add('show');
    const btnFecharModalEditar = document.getElementById('btnFecharModalEditar');

    const inputModelo = document.getElementById("editModelo");
    const inputFabricante = document.getElementById("editFabricante");
    const inputAno = document.getElementById("editAno");
    const inputCor = document.getElementById("editCor");
    const inputTipo = document.getElementById("editTipo");

    inputModelo.value = veiculo.modelo;
    inputFabricante.value = veiculo.fabricante;
    inputAno.value = veiculo.ano;
    inputCor.value = veiculo.cor;
    inputTipo.value = veiculo.tipo;

    btnFecharModalEditar.addEventListener("click", () => {
        modalEditar.classList.remove('show');
    });

   
    document.getElementById('btnSalvarEditar').addEventListener("click", () => {
        veiculo.modelo = inputModelo.value;
        veiculo.fabricante = inputFabricante.value;
        veiculo.ano = parseInt(inputAno.value);
        veiculo.cor = inputCor.value;
        veiculo.tipo = inputTipo.value;
        carregarTabela();
        modalEditar.classList.remove('show');
    });
}


function detalharVeiculo(index) {
    const veiculo = veiculos[index];
    const modalDetalhar = document.getElementById('modalDetalhar');
    modalDetalhar.classList.add('show');
    const btnFecharModalDetalhar = document.getElementById('btnFecharModalDetalhar');

    document.getElementById('detalhesModelo').innerText = veiculo.modelo;
    document.getElementById('detalhesFabricante').innerText = veiculo.fabricante;
    document.getElementById('detalhesAno').innerText = veiculo.ano;
    document.getElementById('detalhesCor').innerText = veiculo.cor;
    document.getElementById('detalhesTipo').innerText = veiculo.tipo;

    btnFecharModalDetalhar.addEventListener("click", () => {
        modalDetalhar.classList.remove('show');
    });
}


function excluirVeiculo(index) {
    const veiculo = veiculos[index];
    const modalExcluir = document.getElementById('modalExcluir');
    modalExcluir.classList.add('show');
    const btnFecharModalExcluir = document.getElementById('btnFecharModalExcluir');

    document.getElementById('excluirMensagem').innerText = `Tem certeza que deseja excluir o veículo ${veiculo.modelo}?`;

    btnFecharModalExcluir.addEventListener("click", () => {
        modalExcluir.classList.remove('show');
    });

    document.getElementById('btnConfirmarExcluir').addEventListener("click", () => {
        veiculos.splice(index, 1);
        carregarTabela();
        modalExcluir.classList.remove('show');
    });
}


function adicionarVeiculo() {
    const modelo = document.getElementById("modalModelo").value;
    const fabricante = document.getElementById("modalFabricante").value;
    const ano = document.getElementById("modalAno").value;
    const cor = document.getElementById("modalCor").value;
    const tipo = document.getElementById("modalTipo").value;

    if (modelo && fabricante && ano && cor && tipo) {
        const novoVeiculo = { modelo, fabricante, ano: parseInt(ano), cor, tipo };
        const veiculosSalvos = JSON.parse(localStorage.getItem('veiculos')) || [];
        veiculosSalvos.push(novoVeiculo);
        localStorage.setItem('veiculos', JSON.stringify(veiculosSalvos));
        carregarTabela(veiculosSalvos);
        fecharModal();
    }
}


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

    carregarTabela(veiculosFiltrados);
}

document.addEventListener('click', (event) => {
    const modais = ['modalEditar', 'modalDetalhar', 'modalExcluir'];
    modais.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.classList.remove('show');
            document.querySelector('.container').classList.remove('blur');
        }
    });
});


const btnAdicionar = document.getElementById("btnAdicionarVeiculo");
const modal = document.getElementById("modal");
const btnFecharModal = document.getElementById("btnFecharModal");
btnAdicionar.addEventListener("click", abrirModal);
btnFecharModal.addEventListener("click", fecharModal);

window.addEventListener("click", (event) => {
    if (event.target === modal || event.target === btnFecharModal) {
        fecharModal();
    }
});


document.addEventListener("DOMContentLoaded", () => {
    carregarTabela();
    const filtroTipo = document.getElementById("tipo");
    const filtroCor = document.getElementById("cor");
    const filtroModelo = document.getElementById("modelo");
    const filtroAno = document.getElementById("ano");

    filtroTipo.addEventListener("input", filtrarTabela);
    filtroCor.addEventListener("input", filtrarTabela);
    filtroModelo.addEventListener("input", filtrarTabela);
    filtroAno.addEventListener("input", filtrarTabela);
}




);
