import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaAppComponent } from './categoria-app.component';
import { ListarCategoriaComponent } from './listar/listar-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from './services/categoria.service';
import { InserirCategoriaComponent } from './inserir/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir/excluir-categoria.component';
import { FormsCategoriaResolver } from './services/forms-categoria.resolver';
import { VisualizarCategoriaResolver } from './services/visualizar-categoria.resolver';


@NgModule({
  declarations: [
    CategoriaAppComponent,
    ListarCategoriaComponent,
    InserirCategoriaComponent,
    EditarCategoriaComponent,
    ExcluirCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    ReactiveFormsModule
  ],
  providers:[CategoriaService, FormsCategoriaResolver, VisualizarCategoriaResolver]
})
export class CategoriaModule { }
