export class TokenViewModel{

  chave:string;
  dataExpiracao:Date;
  usuarioToken:UsuarioTokenViewModel;

}
export class UsuarioTokenViewModel {
  email: string;
  id: string;
  nome: string;
}
