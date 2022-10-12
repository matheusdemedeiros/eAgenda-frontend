import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { ContatoAppComponent } from './contato-app.component';
import { InserirContatoComponent } from './inserir/inserir-contato.component';
import { ListarContatoComponent } from './listar/listar-contato.component';

const routes: Routes = [
  {
    path: '',
    component: ContatoAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ListarContatoComponent },
      { path: 'inserir', component: InserirContatoComponent },
      // {
      //   path: 'editar/:id',
      //   component: EditarTarefaComponent,
      //   resolve: { tarefa: FormsTarefaResolver },
      // },
      // { path: 'excluir/:id', component:ExcluirTarefaComponent,
      //   resolve: {tarefa: VisualizarTarefaResolver}}
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
