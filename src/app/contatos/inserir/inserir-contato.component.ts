import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificadorService } from 'src/shared/notificador.service';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
})
export class InserirContatoComponent implements OnInit {
  public formContato: FormGroup;
  public contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private notificador: NotificadorService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar contato - e-Agenda');
  }

  ngOnInit(): void {
    this.formContato = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      empresa: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get nome() {
    return this.formContato.get('nome');
  }
  get email() {
    return this.formContato.get('email');
  }
  get telefone() {
    return this.formContato.get('telefone');
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

    let resultado = this.contatoService.inserir(this.contatoFormVM).subscribe({
      next: (contatoInserido) => this.processarSucesso(contatoInserido),
      error: (erro) => this.processarFalha(erro),
    });

    console.log(resultado);
    this.router.navigate(['/dashboard']);
  }

  private processarSucesso(tarefa: FormsContatoViewModel): void {
    this.router.navigate(['/contatos/listar']);
    this.notificador.mensagemSucesso('Contato cadastrado com sucesso!');
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro('Erro ao cadastrar contato!');
      console.error(erro);
    }
  }
}
