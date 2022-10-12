import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaAppComponent } from './tarefa-app.component';
import { TarefaService } from './services/tarefa.service';
import { InserirTarefaComponent } from './inserir/inserir-tarefa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListarTarefaComponent } from './listar/listar-tarefa.component';
import { EditarTarefaComponent } from './editar/editar-tarefa.component';
import { FormsTarefaResolver } from './services/forms-tarefa.resolver';
import { ExcluirTarefaComponent } from './excluir/excluir-tarefa.component';
import { VisualizarTarefaResolver } from './services/visualizar-tarefa.resolver';
import { NotificadorService } from 'src/shared/notificador.service';


@NgModule({
  declarations: [
    TarefaAppComponent,
    ListarTarefaComponent,
    InserirTarefaComponent,
    EditarTarefaComponent,
    ExcluirTarefaComponent
  ],
  imports: [
    CommonModule,
    TarefaRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,

  ],
  providers:[TarefaService, FormsTarefaResolver, VisualizarTarefaResolver]
})
export class TarefaModule { }
