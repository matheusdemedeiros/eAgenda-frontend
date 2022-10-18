import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificadorService } from 'src/shared/notificador.service';
import { CategoriaService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../view-models/forms-categoria.view-model';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
})
export class InserirCategoriaComponent implements OnInit {
  public formCategoria: FormGroup;
  public categoriaFormVM: FormsCategoriaViewModel =
    new FormsCategoriaViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private notificador: NotificadorService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar categoria - e-Agenda');
  }

  ngOnInit(): void {
    this.formCategoria = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
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

    let resultado = this.categoriaService
      .inserir(this.categoriaFormVM)
      .subscribe({
        next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
        error: (erro) => this.processarFalha(erro),
      });

    console.log(resultado);
    this.router.navigate(['/dashboard']);
  }

  private processarSucesso(categoria: FormsCategoriaViewModel): void {
    this.router.navigate(['/categorias/listar']);
    this.notificador.mensagemSucesso('Categoria cadastrada com sucesso!');
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.notificador.mensagemErro('Erro ao cadastrar categoria!');
      console.error(erro);
    }
  }
}
