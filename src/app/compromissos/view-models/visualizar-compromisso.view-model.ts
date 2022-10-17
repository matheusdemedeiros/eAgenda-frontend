import { VisualizarContatoViewModel } from "src/app/contatos/view-models/visualizar-contato.view-model";

export class VisualizarCompromissoViewModel{

  id	:string;
  assunto:	string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contato:	VisualizarContatoViewModel;
  tipoLocalizacao:	string;

  local:	string;
  link:	string;

}
