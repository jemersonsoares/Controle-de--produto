/**
 * Cria toda a estrura de tabela dinamicamente.
 */

class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;


    }

    salvar() {
        let produto = this.lerDados();
        console.log(produto);

        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);

            } else {
                this.atualiza(this.editId, produto);
            }

        }
        this.listaTabela();

    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
        this.cancelar();
    }

    listaTabela() {
        let content = document.getElementById("conteudo");
        content.classList.add("exibir");
        let tbody = document.getElementById("tbody");
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();
            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acao = tr.insertCell();


            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco;
            td_acao.innerText = "";

            //cria uma classe dinamicamente para centralizar meu ID
            td_id.classList.add("center");

            let imgEdit = document.createElement("img");
            imgEdit.src = "img/editar.png";
            imgEdit.setAttribute("onclick", "produto.preEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement("img");
            imgDelete.src = "img/deletar-lixeira.png";
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            //cria filhos do elemento
            td_acao.appendChild(imgEdit);
            td_acao.appendChild(imgDelete);


        }

    }
    lerDados() {
        let produto = {}
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;

    }

    validaCampos(produto) {
        let msg = "";
        if (produto.nomeProduto == '') {
            msg += "Informe nome de produto\n";
            document.getElementById("nomeProduto").innerText = "* Campo nome não preenchido";
        }
        if (produto.preco == '') {
            msg += "Informe preço do produto";
            document.getElementById("precoProduto").innerText = "* Campo preço não preenchido";
        }

        if (msg != '') {
           // alert(msg);
            return false;
        }

        return true;


    }
    /**
     * Reseta os campos padrões
     */
    cancelar() {
        document.getElementById("produto").value = '';
        document.getElementById("preco").value = '';
        document.getElementById("nomeProduto").innerText = "";
        document.getElementById("precoProduto").innerText = "";


    }

    deletar(id) {
        let tbody = document.getElementById("tbody");

        if (confirm("Excluir ID " + id + " ?")) {
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }

        }

        console.log(this.arrayProdutos);
        //this.listaTabela();
        if (this.arrayProdutos.length == 0) {
            let content = document.getElementById("conteudo");
            console.log("array vazio");
            content.classList.add("esconder");

            // console.log(content.classList.add("esconder"));
        }
    }

    preEdicao(dados) {
        this.editId = dados.id;
        console.log(dados);
        let botao = document.getElementById("salvar");
        botao.classList.add("alterar");
        document.getElementById("produto").value = dados.nomeProduto;
        document.getElementById("preco").value = dados.preco;
        document.getElementById("salvar").innerText = "Alterar";

    }

    atualiza(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (id == this.arrayProdutos[i].id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
        this.editId = null;
        document.getElementById("salvar").innerText = "Salvar"
        this.cancelar();

    }
}

var produto = new Produto();
