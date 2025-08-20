import { Paciente, TempoEspera, EstadoSistema } from '@/types/patient';

// Configuração da API .NET 8
const API_BASE_URL = process.env.VITE_API_URL || 'https://localhost:7001/api';

class PatientService {
  private async apiCall<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro ao chamar ${endpoint}:`, error);
      throw error;
    }
  }

  async obterTemposEspera(): Promise<TempoEspera> {
    return this.apiCall<TempoEspera>('/dashboard/tempos-espera');
  }

  async obterPacientesAguardando(): Promise<Paciente[]> {
    return this.apiCall<Paciente[]>('/dashboard/pacientes-aguardando');
  }

  async obterEstadoSistema(): Promise<EstadoSistema> {
    return this.apiCall<EstadoSistema>('/dashboard/estado-sistema');
  }

  // Simulação para desenvolvimento (remover quando integrar com .NET 8)
  async obterDadosSimulados(): Promise<{
    tempos: TempoEspera;
    pacientes: Paciente[];
    estado: EstadoSistema;
  }> {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const agora = new Date();
    
    return {
      tempos: {
        consulta: {
          tempoMedio: Math.floor(Math.random() * 30) + 15, // 15-45 min
          pacientesAguardando: Math.floor(Math.random() * 8) + 2,
          ultimaAtualizacao: agora,
        },
        medicacao: {
          tempoMedio: Math.floor(Math.random() * 15) + 5, // 5-20 min
          pacientesAguardando: Math.floor(Math.random() * 5) + 1,
          ultimaAtualizacao: agora,
        },
      },
      pacientes: this.gerarPacientesSimulados(),
      estado: {
        online: Math.random() > 0.1, // 90% online
        ultimaConexao: agora,
        totalPacientes: Math.floor(Math.random() * 20) + 10,
      },
    };
  }

  private gerarPacientesSimulados(): Paciente[] {
    const nomes = ['Maria Silva', 'João Santos', 'Ana Costa', 'Carlos Oliveira', 'Lucia Pereira'];
    const pacientes: Paciente[] = [];
    
    for (let i = 0; i < 5; i++) {
      const chegada = new Date();
      chegada.setMinutes(chegada.getMinutes() - Math.random() * 120);
      
      pacientes.push({
        id: `PAC${String(i + 1).padStart(3, '0')}`,
        nome: nomes[i],
        numeroFicha: String(Math.floor(Math.random() * 999) + 1).padStart(3, '0'),
        horarioChegada: chegada,
        status: ['aguardando_consulta', 'em_consulta', 'aguardando_medicacao'][Math.floor(Math.random() * 3)] as any,
      });
    }
    
    return pacientes;
  }
}

export const patientService = new PatientService();