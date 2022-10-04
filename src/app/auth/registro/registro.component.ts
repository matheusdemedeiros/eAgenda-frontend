import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { RegistrarUsuarioViewModel } from '../view-models/registrar-usuario.view-model';
import { TokenViewModel } from '../view-models/token.view-model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  public form: FormGroup;
  private registroVM: RegistrarUsuarioViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    titulo.setTitle('Registro - e-Agenda');
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get nome() {
    return this.form.get('nome');
  }

  get email() {
    return this.form.get('email');
  }

  get senha() {
    return this.form.get('senha');
  }

  get confirmarSenha() {
    return this.form.get('confirmarSenha');
  }

  public registrar() {
    if (this.form.invalid) return;

    this.registroVM = Object.assign({}, this.registroVM, this.form.value);

    this.authService.registrarUsuario(this.registroVM).subscribe({
      next: (processoRealizado) => this.processarSucesso(processoRealizado),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(registroRealizado: TokenViewModel) {
    this.localStorageService.salvarDadosLocaisUsuario(registroRealizado);
  }

  private processarFalha(erro: any) {
    console.log(erro);
  }
}
