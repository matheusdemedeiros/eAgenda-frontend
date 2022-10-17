import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { CompromissoAppComponent } from './compromisso-app.component';
import { EditarCompromissoComponent } from './editar/editar-compromisso.component';
import { InserirCompromissoComponent } from './inserir/inserir-compromisso.component';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { FormsCompromissoResolver } from './services/forms-compromisso.resolver';

const routes: Routes = [
  {
    path: '',
    component: CompromissoAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ListarCompromissoComponent },
      { path: 'inserir', component: InserirCompromissoComponent },
      {
        path: 'editar/:id',
        component: EditarCompromissoComponent,
        resolve: { compromisso: FormsCompromissoResolver },
      },
      // {
      //   path: 'excluir/:id',
      //   component: ExcluirContatoComponent,
      //   resolve: { contato: VisualizarContatoResolver },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompromissoRoutingModule { }
