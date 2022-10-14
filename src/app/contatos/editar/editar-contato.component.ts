import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificadorService } from 'src/shared/notificador.service';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styles: [
  ]
})
export class EditarContatoComponent implements OnInit {
  public formContato: FormGroup;
  public contatoFormVM: FormsContatoViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificador: NotificadorService,
    private contatoService: ContatoService
  ) {
    titulo.setTitle('Editar Contato - e-Agenda');
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];
    console.log(this.contatoFormVM);

    this.formContato = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      empresa: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
    });

    this.formContato.patchValue({
      id: this.contatoFormVM.id,
      nome: this.contatoFormVM.nome,
      telefone: this.contatoFormVM.telefone,
      email: this.contatoFormVM.email,
      empresa: this.contatoFormVM.empresa,
      cargo: this.contatoFormVM.cargo,
    });
  }

  get nome() {
    return this.formContato.get('nome');
  }

  get telefone() {
    return this.formContato.get('telefone');
  }

  get email() {
    return this.formContato.get('email');
  }

  get empresa() {
    return this.formContato.get('empresa');
  }

  get cargo() {
    return this.formContato.get('cargo');
  }

  public gravar() {
    if (this.formContato.invalid) return;

    this.contatoFormVM = Object.assign(
      {},
      this.contatoFormVM,
      this.formContato.value
    );

    this.contatoService.editar(this.contatoFormVM).subscribe({
      next: (contatoEditado) => this.processarSucesso(contatoEditado),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(tarefa: FormsContatoViewModel): void {
    this.router.navigate(['/contatos/listar']);
    this.notificador.mensagemSucesso('Contato editado com sucesso!');
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro('Erro ao editar contato!');
    }
  }
}
