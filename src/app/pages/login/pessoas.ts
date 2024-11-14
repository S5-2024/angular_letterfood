export class Pessoas {
  // Array para armazenar os usuários
  private usuarios: { nome: string, email: string, senha: string }[] = [];

  // Construtor da classe (não é necessário para o array)
  constructor() {}

  // Função para adicionar um novo usuário
  adicionarUsuario(nome: string, email: string, senha: string): void {
    const usuario = { nome, email, senha };
    this.usuarios.push(usuario);
  }

  // Função para consultar usuário por email e senha
  consultarUsuario(email: string, senha: string): { nome: string, email: string, senha: string } | null {
    const usuario = this.usuarios.find(u => u.email === email && u.senha === senha);
    return usuario || null;  // Retorna o usuário ou null se não encontrado
  }

  // Função para editar um usuário
  editarUsuario(email: string, novoNome: string, novaSenha: string): boolean {
    const usuario = this.usuarios.find(u => u.email === email);
    if (usuario) {
      usuario.nome = novoNome;
      usuario.senha = novaSenha;
      return true; // Usuário editado com sucesso
    }
    return false; // Usuário não encontrado
  }

  // Função para deletar um usuário
  deletarUsuario(email: string): boolean {
    const index = this.usuarios.findIndex(u => u.email === email);
    if (index !== -1) {
      this.usuarios.splice(index, 1);  // Remove o usuário do array
      return true;  // Usuário deletado com sucesso
    }
    return false;  // Usuário não encontrado
  }

  // Função para exibir todos os usuários (opcional, útil para debug)
  exibirUsuarios(): void {
    console.log(this.usuarios);
  }
}

