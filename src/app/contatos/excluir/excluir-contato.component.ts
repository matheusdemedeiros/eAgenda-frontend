import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificadorService } from 'src/shared/notificador.service';
import { ContatoService } from '../services/contato.service';
import { VisualizarContatoViewModel } from '../view-models/visualizar-contato.view-model';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styles: [
  ]
})
export class ExcluirContatoComponent implements OnInit {
  public contatoFormVM: VisualizarContatoViewModel = new VisualizarContatoViewModel();
  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private notificador:NotificadorService,
    private contatoService: ContatoService
  ) {
    titulo.setTitle('Excluir Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];
  }

  public gravar() {

    this.contatoService.excluir(this.contatoFormVM.id)
      .subscribe({
        next: (contatoId) => this.processarSucesso(contatoId),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(contatoId: string): void {
    this.notificador.mensagemSucesso("Contato excluído com sucesso!");
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro("Falha ao excluir contato!");
      console.error(erro);
    }
  }

}
