import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class NotificadorService{

constructor(private toastr:ToastrService){
}
  public mensagemSucesso(mensagem:string, titulo?:string){
    this.toastr.success(mensagem, titulo);
  }

  public mensagemErro(mensagem:string, titulo?:string){
    this.toastr.error(mensagem, titulo);
  }
}
