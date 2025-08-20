export interface Paciente {
  id: string;
  nome: string;
  numeroFicha: string;
  horarioChegada: Date;
  horarioInicioConsulta?: Date;
  horarioFimConsulta?: Date;
  horarioEntregaMedicacao?: Date;
  status: 'aguardando_consulta' | 'em_consulta' | 'aguardando_medicacao' | 'finalizado';
}

export interface TempoEspera {
  consulta: {
    tempoMedio: number; // em minutos
    pacientesAguardando: number;
    ultimaAtualizacao: Date;
  };
  medicacao: {
    tempoMedio: number; // em minutos
    pacientesAguardando: number;
    ultimaAtualizacao: Date;
  };
}

export interface EstadoSistema {
  online: boolean;
  ultimaConexao: Date;
  totalPacientes: number;
}