const listaalunos = [];

function cadastrar() {

    const nome = document.getElementById('inome').value;
    const idade = parseInt(document.getElementById('iidade').value);
    const nota = parseFloat(document.getElementById('inota').value);
    let statusaluno;

if (nota >= 6) {
    statusaluno = 'Aprovado';
} else {
    statusaluno = 'Reprovado';
}


    const aluno = {
        nome: nome,
        idade: idade,
        nota: nota,
        status: statusaluno
    };

    listaalunos.push(aluno);

    document.getElementById('inome').value = "";
    document.getElementById('iidade').value = "";
    document.getElementById('inota').value = "";

    alert("Aluno cadastrado com sucesso!");
    tabela()
}

function tabela() {

    const cabecatabela = document.getElementById('icabecadatabela');

    cabecatabela.innerHTML = `<h2 id="listadealunos">Lista de Alunos</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Nota</th>
                    <th colspan="2">Status</th>
                </tr>
            </thead>
            <tbody id="itabelaalunos">

        </tbody>
    </table>`

    const corpotabela = document.getElementById('itabelaalunos');
    
    listaalunos.forEach((aluno, index) => {
        corpotabela.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.nota}</td>
                <td>${aluno.status}</td>
                <td><button onclick = "detalhes(${index})">Detalhes</button>
                <br>
                <button onclick = "remover(${index})">Remover</button></td>
                
            </tr>
        `;
    });
    dados()
    media()
    qntdaprovadoereprovado()
}
function remover(index) {

    listaalunos.splice(index, 1)
    tabela()
}

function detalhes(index) {
    const aluno = listaalunos[index];
    const boxdetalhes = document.getElementById('idetalhes');

    boxdetalhes.style.display = 'block';
    boxdetalhes.innerHTML = `
        <h3>${aluno.nome}</h3>
        <p>O aluno tem ${aluno.idade} anos, tirou nota ${aluno.nota} e está <strong>${aluno.status}</strong>.</p>
        <button onclick="this.parentElement.style.display='none'">Fechar</button>
    `;
}

function dados() {
    let quantiadealunos = listaalunos.length;
    const iqntdalunos = document.getElementById('iqntdalunos');

    iqntdalunos.innerHTML = `<p>Número de alunos: ${quantiadealunos}</p>`;
}

function media() {
    let soma = 0;
    listaalunos.forEach((aluno) => {
        soma += aluno.nota;
    });
    
    let media = (soma/listaalunos.length).toFixed(2);

    if (listaalunos.length == 0) {
        media = 0;
    }
    const imedia = document.getElementById("imedia");
    imedia.innerHTML = `<p>Média da turma: ${media}</p>`; 
}

function qntdaprovadoereprovado() {
    let aprovados = 0;
    let reprovados = 0;

    listaalunos.forEach(aluno => {
        if (aluno.status == "Aprovado") {                        
            aprovados += 1;
        }
        else {
            reprovados+= 1;
        }
    });
    const iqtdaprovados = document.getElementById('iqtdaprovados');
    iqtdaprovados.innerHTML = `<p>Número de aprovados: ${aprovados}</p>`;

    const iqtdreprovados = document.getElementById('iqtdreprovados');
    iqtdreprovados.innerHTML = `<p>Número de reprovados: ${reprovados}</p>`;
}