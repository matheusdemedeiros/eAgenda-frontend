import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { ListarContatoViewModel } from 'src/app/contatos/view-models/listar-contato.view-model';
import { NotificadorService } from 'src/shared/notificador.service';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/forms-compromisso.view-model';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styles: [],
})
export class EditarCompromissoComponent implements OnInit {
  public formCompromisso: FormGroup;
  public compromissoFormVM: FormsCompromissoViewModel;
  public contatos$: Observable<ListarContatoViewModel[]>;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificador: NotificadorService,
    private contatoService: ContatoService,
    private compromissoService: CompromissoService
  ) {
    titulo.setTitle('Editar Compromisso - e-Agenda');
  }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];
    this.contatos$ = this.contatoService.selecionarTodos();
    console.log(this.compromissoFormVM);

    this.formCompromisso = this.fb.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contatoId: ['', []],
      tipoLocal: ['', [Validators.required]],
      local: ['', []],
      link: ['', []],
    });

    this.formCompromisso.patchValue({
      id: this.compromissoFormVM.id,
      assunto: this.compromissoFormVM.assunto,
      data: this.compromissoFormVM.data.toString().split('T')[0],
      horaInicio: this.compromissoFormVM.horaInicio,
      horaTermino: this.compromissoFormVM.horaTermino,
      contatoId: this.compromissoFormVM.contatoId,
      tipoLocal: this.compromissoFormVM.tipoLocal,
      local: this.compromissoFormVM.local,
      link: this.compromissoFormVM.link,
    });
  }
  get assunto() {
    return this.formCompromisso.get('assunto');
  }
  get data() {
    return this.formCompromisso.get('data');
  }
  get horaInicio() {
    return this.formCompromisso.get('horaInicio');
  }

  get horaTermino() {
    return this.formCompromisso.get('horaTermino');
  }
  get contatoId() {
    return this.formCompromisso.get('contatoId');
  }
  get tipoLocal() {
    return this.formCompromisso.get('tipoLocal');
  }
  get link() {
    return this.formCompromisso.get('link');
  }
  get local() {
    return this.formCompromisso.get('local');
  }


  public gravar() {
    if (this.formCompromisso.invalid) return;

    this.compromissoFormVM = Object.assign(
      {},
      this.compromissoFormVM,
      this.formCompromisso.value
    );

    console.log(this.compromissoFormVM);

    let resultado = this.compromissoService
      .editar(this.compromissoFormVM)
      .subscribe({
        next: (compromissoInserido) =>
          this.processarSucesso(compromissoInserido),
        error: (erro) => this.processarFalha(erro),
      });

    console.log(resultado);
    this.router.navigate(['/dashboard']);
  }

  private processarSucesso(compromisso: FormsCompromissoViewModel): void {
    this.router.navigate(['/compromissos/listar']);
    this.notificador.mensagemSucesso('Compromisso editado com sucesso!');
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro('Erro ao editar compromisso!');
      console.error(erro);
    }
  }
}
