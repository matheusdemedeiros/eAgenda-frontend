import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from '../auth/view-models/token.view-model';
import { UsuarioService } from '../core/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public usuarioLogado$:Observable<UsuarioTokenViewModel | null>;
  constructor(
    private usuarioSevice:UsuarioService,

    ) { }

  ngOnInit(): void {
    this.usuarioLogado$ = this.usuarioSevice.usuarioLogado;
  }

}
