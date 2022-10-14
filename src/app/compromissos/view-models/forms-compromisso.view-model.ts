import { TipoLocalizacaoCompromissoEnum } from "./TipoLocalizacaoEnum";

export class FormsCompromissoViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId?: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
}
