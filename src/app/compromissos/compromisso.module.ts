import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompromissoRoutingModule } from './compromisso-routing.module';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { CompromissoAppComponent } from './compromisso-app.component';
import { CompromissoService } from './services/compromisso.service';
import { InserirCompromissoComponent } from './inserir/inserir-compromisso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContatoModule } from '../contatos/contato.module';
import { EditarCompromissoComponent } from './editar/editar-compromisso.component';
import { FormsCompromissoResolver } from './services/forms-compromisso.resolver';
import { ExcluirCompromissoComponent } from './excluir/excluir-compromisso.component';
import { VisualizarCompromissoResolver } from './services/visualizar-compromisso.resolver';

@NgModule({
  declarations: [
    ListarCompromissoComponent,
    CompromissoAppComponent,
    InserirCompromissoComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent,
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    ContatoModule,
  ],
  providers: [
    CompromissoService,
    FormsCompromissoResolver,
    VisualizarCompromissoResolver,
  ],
})
export class CompromissoModule {}
