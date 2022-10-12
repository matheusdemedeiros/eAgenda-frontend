import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/auth/services/local-storage.service';
import { NotificadorService } from 'src/shared/notificador.service';
import { TarefaService } from '../services/tarefa.service';
import { ItemTarefaViewModel } from '../view-models/forms-item-tarefa.view-model';
import { FormsTarefaViewModel } from '../view-models/Forms-tarefa.view-model';
import { PrioridadeTarefaEnum } from '../view-models/prioridade-tarefa.enum';
import { StatusItemTarefa } from '../view-models/status-item-tarefa.enum';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
})
export class InserirTarefaComponent implements OnInit {
  public formTarefa: FormGroup;
  public formItens: FormGroup;
  public tarefaFormVM: FormsTarefaViewModel = new FormsTarefaViewModel();

  // public prioridades: string[] = ['Baixa', 'Normal', 'Alta'];
  public prioridades = Object.values(PrioridadeTarefaEnum).filter(
    (v) => !Number.isFinite(v)
  );
  public prioridadeSelecionada: number;
  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private notificador: NotificadorService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar tarefa - e-Agenda');
  }

  ngOnInit(): void {
    this.formTarefa = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['', [Validators.required]],
    });

    this.formItens = this.fb.group({
      tituloItem: [''],
    });
  }

  get titulo() {
    return this.formTarefa.get('titulo');
  }

  get prioridade() {
    return this.formTarefa.get('prioridade');
  }
  get tituloItem() {
    return this.formItens.get('tituloItem');
  }

  public adicionarItem(): void {
    if (!this.tituloItem?.value) return;

    const titulo = this.tituloItem?.value;

    if (
      !this.tarefaFormVM.itens.find(
        (x) => x.titulo.toLowerCase() === titulo.toLowerCase()
      )
    ) {
      let item = new ItemTarefaViewModel();
      item.titulo = titulo;
      item.status = StatusItemTarefa.Adicionado;

      this.tarefaFormVM.itens.push(item);
      this.formItens.reset();

      // this.tarefaFormVM.itens.push({
      //   id: '',
      //   titulo: this.tituloItem?.value,
      //   concluido: false,
      //   status: 1,
      // });

      // console.log(this.tarefaFormVM.itens);
    }
  }

  public removerItem(item: ItemTarefaViewModel) {
    this.tarefaFormVM.itens.forEach((x, index) => {
      if (x === item) this.tarefaFormVM.itens.splice(index, 1);
    });

    // const index = this.tarefaFormVM.itens.findIndex((x) => x === item);

    // this.tarefaFormVM.itens.splice(index, 1);

    // console.log(this.tarefaFormVM.itens);
  }

  public gravar() {
    if (this.formTarefa.invalid) return;

    this.tarefaFormVM = Object.assign(
      {},
      this.tarefaFormVM,
      this.formTarefa.value
    );

    let resultado = this.tarefaService.inserir(this.tarefaFormVM).subscribe({
      next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
      error: (erro) => this.processarFalha(erro),
    });

    console.log(resultado);
    this.router.navigate(['/dashboard']);
  }

  private processarSucesso(tarefa: FormsTarefaViewModel): void {
    this.router.navigate(['/tarefas/listar']);
    this.notificador.mensagemSucesso("Tarefa cadastrada com sucesso!");
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro("Erro ao cadastrar tarefa!");
      console.error(erro);
    }
  }
}
