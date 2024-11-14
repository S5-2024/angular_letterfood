"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoas = void 0;
var Pessoas = /** @class */ (function () {
    // Construtor da classe (não é necessário para o array)
    function Pessoas() {
        // Array para armazenar os usuários
        this.usuarios = [];
    }
    // Função para adicionar um novo usuário
    Pessoas.prototype.adicionarUsuario = function (nome, email, senha) {
        var usuario = { nome: nome, email: email, senha: senha };
        this.usuarios.push(usuario);
    };
    // Função para consultar usuário por email e senha
    Pessoas.prototype.consultarUsuario = function (email, senha) {
        var usuario = this.usuarios.find(function (u) { return u.email === email && u.senha === senha; });
        return usuario || null; // Retorna o usuário ou null se não encontrado
    };
    // Função para editar um usuário
    Pessoas.prototype.editarUsuario = function (email, novoNome, novaSenha) {
        var usuario = this.usuarios.find(function (u) { return u.email === email; });
        if (usuario) {
            usuario.nome = novoNome;
            usuario.senha = novaSenha;
            return true; // Usuário editado com sucesso
        }
        return false; // Usuário não encontrado
    };
    // Função para deletar um usuário
    Pessoas.prototype.deletarUsuario = function (email) {
        var index = this.usuarios.findIndex(function (u) { return u.email === email; });
        if (index !== -1) {
            this.usuarios.splice(index, 1); // Remove o usuário do array
            return true; // Usuário deletado com sucesso
        }
        return false; // Usuário não encontrado
    };
    // Função para exibir todos os usuários (opcional, útil para debug)
    Pessoas.prototype.exibirUsuarios = function () {
        console.log(this.usuarios);
    };
    return Pessoas;
}());
exports.Pessoas = Pessoas;
// Exemplo de uso:
var pessoas = new Pessoas();
pessoas.adicionarUsuario("Alice", "alice@example.com", "123456");
pessoas.adicionarUsuario("Bob", "bob@example.com", "password");
console.log(pessoas.consultarUsuario("alice@example.com", "123456")); // Consulta Alice
pessoas.editarUsuario("alice@example.com", "Alice Editada", "novasenha");
console.log(pessoas.consultarUsuario("alice@example.com", "novasenha")); // Consulta Alice editada
pessoas.deletarUsuario("bob@example.com");
pessoas.exibirUsuarios(); // Exibe usuários restantes
