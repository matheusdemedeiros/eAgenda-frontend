import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throttleTime, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { ListarTarefaViewModel } from '../view-models/listar-tarefa.view-model';

@Injectable()
export class TarefaService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    const resposta = this.http
      .get<ListarTarefaViewModel[]>(this.apiUrl + 'tarefas', this.obterHeadersAutorizacao())
      .pipe(map(this.processarSucesso), catchError(this.processarFalha));

    return resposta;
  }

  private processarSucesso(resposta: any) {
    if (resposta.sucesso) return resposta.dados;
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }

  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterTokenUsuario();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
