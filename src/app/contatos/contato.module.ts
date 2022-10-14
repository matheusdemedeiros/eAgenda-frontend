import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contato-routing.module';
import { ContatoAppComponent } from './contato-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarContatoComponent } from './listar/listar-contato.component';
import { ContatoService } from './services/contato.service';
import { InserirContatoComponent } from './inserir/inserir-contato.component';
import { EditarContatoComponent } from './editar/editar-contato.component';
import { FormsContatoResolver } from './services/forms-contato.resolver';


@NgModule({
  declarations: [
    ContatoAppComponent,
    ListarContatoComponent,
    InserirContatoComponent,
    EditarContatoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ContatoService, FormsContatoResolver]
})
export class ContatoModule { }
