import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificadorService } from 'src/shared/notificador.service';
import { TarefaService } from '../services/tarefa.service';
import { ItemTarefaViewModel } from '../view-models/forms-item-tarefa.view-model';
import { FormsTarefaViewModel } from '../view-models/Forms-tarefa.view-model';
import { PrioridadeTarefaEnum } from '../view-models/prioridade-tarefa.enum';
import { StatusItemTarefa } from '../view-models/status-item-tarefa.enum';
@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styles: [],
})
export class EditarTarefaComponent implements OnInit {
  public formTarefa: FormGroup;
  public formItens: FormGroup;
  public prioridades = Object.values(PrioridadeTarefaEnum).filter(
    (v) => !Number.isFinite(v)
  );

  public tarefaFormVM: FormsTarefaViewModel = new FormsTarefaViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificador: NotificadorService,
    private tarefaService: TarefaService
  ) {
    titulo.setTitle('Editar Tarefa - e-Agenda');
  }

  ngOnInit(): void {
    this.tarefaFormVM = this.route.snapshot.data['tarefa'];

    this.formTarefa = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['', [Validators.required]],
    });

    this.formItens = this.fb.group({
      tituloItem: [''],
    });

    this.formTarefa.patchValue({
      id: this.tarefaFormVM.id,
      titulo: this.tarefaFormVM.titulo,
      prioridade: this.tarefaFormVM.prioridade,
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

  get itens(): ItemTarefaViewModel[] {
    return this.tarefaFormVM.itens.filter(
      (a) => a.status !== StatusItemTarefa.Removido
    );
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
    }
  }

  public removerItem(item: ItemTarefaViewModel): void {
    if (item) {
      this.tarefaFormVM.itens.forEach((x, index) => {
        if (x === item) item.status = StatusItemTarefa.Removido;
      });
    }
  }

  public atualizarItem(item: ItemTarefaViewModel): void {
    if (item) {
      this.tarefaFormVM.itens.forEach((x) => {
        if (x === item) item.concluido = !item.concluido;
      });
    }
  }

  public gravar() {
    if (this.formTarefa.invalid) return;

    this.tarefaFormVM = Object.assign(
      {},
      this.tarefaFormVM,
      this.formTarefa.value
    );

    this.tarefaService.editar(this.tarefaFormVM).subscribe({
      next: (tarefaEditada) => this.processarSucesso(tarefaEditada),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(tarefa: FormsTarefaViewModel): void {
    this.router.navigate(['/tarefas/listar']);
    this.notificador.mensagemSucesso('Tarefa editada com sucesso!');
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro('Erro ao editar tarefa!');
    }
  }
}
