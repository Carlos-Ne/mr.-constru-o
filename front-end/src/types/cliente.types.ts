export interface Cliente {
  id: number;
  nomeCliente: string;
  telefone: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  pontoReferencia?: string;
}

export interface ClienteDTO {
  nomeCliente: string;
  telefone: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  pontoReferencia?: string;
}