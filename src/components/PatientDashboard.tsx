import { usePatientData } from '@/hooks/usePatientData';
import { WaitTimeCard } from './WaitTimeCard';
import { SystemStatus } from './SystemStatus';
import { PatientQueue } from './PatientQueue';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { RefreshCw, Stethoscope, Pill, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PatientDashboard = () => {
  const { 
    temposEspera, 
    pacientes, 
    estadoSistema, 
    carregando, 
    erro, 
    recarregar 
  } = usePatientData();
  
  const { toast } = useToast();

  const handleRecarregar = () => {
    recarregar();
    toast({
      title: "Dados atualizados",
      description: "As informações foram atualizadas com sucesso.",
    });
  };

  if (carregando && !temposEspera) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="flex items-center gap-3">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <span className="text-lg">Carregando dados do sistema...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-xl font-semibold">Erro de Conexão</h2>
            <p className="text-muted-foreground">{erro}</p>
            <Button onClick={handleRecarregar} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Sistema de Gerenciamento de Fluxo
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitoramento em tempo real dos tempos de espera
            </p>
          </div>
          <Button 
            onClick={handleRecarregar} 
            variant="outline" 
            size="sm"
            disabled={carregando}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${carregando ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </header>

      {/* Status do Sistema */}
      <div className="container mx-auto px-6 py-4">
        {estadoSistema && <SystemStatus estado={estadoSistema} />}
      </div>

      {/* Cards de Tempo de Espera */}
      <main className="container mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {temposEspera && (
            <>
              <WaitTimeCard
                titulo="Consulta Médica"
                tempoMinutos={temposEspera.consulta.tempoMedio}
                pacientesAguardando={temposEspera.consulta.pacientesAguardando}
                icone={<Stethoscope className="h-8 w-8" />}
                cor="primary"
                ultimaAtualizacao={temposEspera.consulta.ultimaAtualizacao}
              />
              <WaitTimeCard
                titulo="Dispensação de Medicamentos"
                tempoMinutos={temposEspera.medicacao.tempoMedio}
                pacientesAguardando={temposEspera.medicacao.pacientesAguardando}
                icone={<Pill className="h-8 w-8" />}
                cor="secondary"
                ultimaAtualizacao={temposEspera.medicacao.ultimaAtualizacao}
              />
            </>
          )}
        </div>

        {/* Fila de Pacientes */}
        <PatientQueue pacientes={pacientes} />
      </main>
    </div>
  );
};