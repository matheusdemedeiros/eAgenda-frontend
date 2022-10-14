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

@NgModule({
  declarations: [
    ListarCompromissoComponent,
    CompromissoAppComponent,
    InserirCompromissoComponent,
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    ContatoModule
  ],
  providers: [CompromissoService],
})
export class CompromissoModule {}
