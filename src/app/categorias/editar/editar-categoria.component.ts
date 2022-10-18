import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificadorService } from 'src/shared/notificador.service';
import { CategoriaService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../view-models/forms-categoria.view-model';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
})
export class EditarCategoriaComponent implements OnInit {

  public formCategoria: FormGroup;
  public categoriaFormVM: FormsCategoriaViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificador: NotificadorService,
    private categoriaService: CategoriaService
  ) {
    titulo.setTitle('Editar Categoria - e-Agenda');
  }

  ngOnInit(): void {
    this.categoriaFormVM = this.route.snapshot.data['categoria'];

    this.formCategoria = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.formCategoria.patchValue({
      id: this.categoriaFormVM.id,
      titulo: this.categoriaFormVM.titulo,
    });
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }

  public gravar() {
    if (this.formCategoria.invalid) return;

    this.categoriaFormVM = Object.assign(
      {},
      this.categoriaFormVM,
      this.formCategoria.value
    );

    this.categoriaService.editar(this.categoriaFormVM).subscribe({
      next: (categoriaEditada) => this.processarSucesso(categoriaEditada),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(categoria: FormsCategoriaViewModel): void {
    this.router.navigate(['/categorias/listar']);
    this.notificador.mensagemSucesso('Categoria editada com sucesso!');
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro('Erro ao editar categoria!');
    }
  }
}
