import { ItemTarefaViewModel } from './forms-item-tarefa.view-model';
import { PrioridadeTarefaEnum } from './prioridade-tarefa.enum';

export class FormsTarefaViewModel {
  id: string;
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[] = [];
}

export class InserirTarefaViewModel{
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[] = [];
}

export class EditarTarefaViewModel{
  id: string;
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[] = [];
}
