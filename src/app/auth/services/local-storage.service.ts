import { Injectable } from '@angular/core';
import {
  TokenViewModel,
  UsuarioTokenViewModel,
} from '../view-models/token.view-model';

@Injectable()
export class LocalStorageService {
  public salvarDadosLocaisUsuario(resposta: TokenViewModel) {
    this.salvarTokenUsuario(resposta.chave);
    this.salvarUsuario(resposta.usuarioToken);
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('eAgenda.token', token);
  }

  public salvarUsuario(usuario: UsuarioTokenViewModel) {
    const jsonString = JSON.stringify(usuario);

    localStorage.setItem('eAgenda.usuario', jsonString);
  }
}