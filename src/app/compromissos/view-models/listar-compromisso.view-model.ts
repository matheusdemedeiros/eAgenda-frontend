import { Time } from '@angular/common';
import { VisualizarContatoViewModel } from 'src/app/contatos/view-models/visualizar-contato.view-model';

export class ListarCompromissoViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  contato: VisualizarContatoViewModel;
}
