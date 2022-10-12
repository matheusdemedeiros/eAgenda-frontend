import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contato-routing.module';
import { ContatoAppComponent } from './contato-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarContatoComponent } from './listar/listar-contato.component';
import { ContatoService } from './services/contato.service';
import { InserirContatoComponent } from './inserir/inserir-contato.component';


@NgModule({
  declarations: [
    ContatoAppComponent,
    ListarContatoComponent,
    InserirContatoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ContatoService]
})
export class ContatoModule { }
