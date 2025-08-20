import { useState, useEffect } from 'react';
import { TempoEspera, Paciente, EstadoSistema } from '@/types/patient';
import { patientService } from '@/services/patientService';

export const usePatientData = () => {
  const [temposEspera, setTemposEspera] = useState<TempoEspera | null>(null);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [estadoSistema, setEstadoSistema] = useState<EstadoSistema | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      // Usar dados simulados para desenvolvimento
      const dados = await patientService.obterDadosSimulados();
      
      setTemposEspera(dados.tempos);
      setPacientes(dados.pacientes);
      setEstadoSistema(dados.estado);
      
      // Para produção, usar APIs separadas:
      // const [tempos, pacientesData, estado] = await Promise.all([
      //   patientService.obterTemposEspera(),
      //   patientService.obterPacientesAguardando(),
      //   patientService.obterEstadoSistema(),
      // ]);
      
    } catch (error) {
      setErro('Erro ao carregar dados do sistema');
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    // Carregamento inicial
    carregarDados();
    
    // Atualização automática a cada 5 minutos
    const intervalo = setInterval(carregarDados, 5 * 60 * 1000);
    
    return () => clearInterval(intervalo);
  }, []);

  return {
    temposEspera,
    pacientes,
    estadoSistema,
    carregando,
    erro,
    recarregar: carregarDados,
  };
};