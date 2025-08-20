import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock } from 'lucide-react';
import { Paciente } from '@/types/patient';

interface PatientQueueProps {
  pacientes: Paciente[];
}

export const PatientQueue = ({ pacientes }: PatientQueueProps) => {
  const obterCorStatus = (status: Paciente['status']) => {
    switch (status) {
      case 'aguardando_consulta':
        return 'warning';
      case 'em_consulta':
        return 'primary';
      case 'aguardando_medicacao':
        return 'secondary';
      case 'finalizado':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const obterTextoStatus = (status: Paciente['status']) => {
    switch (status) {
      case 'aguardando_consulta':
        return 'Aguardando Consulta';
      case 'em_consulta':
        return 'Em Consulta';
      case 'aguardando_medicacao':
        return 'Aguardando Medicação';
      case 'finalizado':
        return 'Finalizado';
      default:
        return 'Desconhecido';
    }
  };

  const calcularTempoEspera = (horarioChegada: Date) => {
    const agora = new Date();
    const diferenca = agora.getTime() - horarioChegada.getTime();
    const minutos = Math.floor(diferenca / (1000 * 60));
    
    if (minutos < 60) {
      return `${minutos} min`;
    }
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}min`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Fila de Pacientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pacientes.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum paciente na fila no momento
            </p>
          ) : (
            pacientes.map((paciente) => (
              <div
                key={paciente.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">#{paciente.numeroFicha}</span>
                    <span className="text-muted-foreground">
                      {paciente.nome}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Chegou há {calcularTempoEspera(paciente.horarioChegada)}
                  </div>
                </div>
                <Badge variant={obterCorStatus(paciente.status)}>
                  {obterTextoStatus(paciente.status)}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};