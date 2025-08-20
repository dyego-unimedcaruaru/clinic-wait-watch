import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WaitTimeCardProps {
  titulo: string;
  tempoMinutos: number;
  pacientesAguardando: number;
  icone?: React.ReactNode;
  cor?: 'primary' | 'secondary' | 'warning';
  ultimaAtualizacao: Date;
}

export const WaitTimeCard = ({
  titulo,
  tempoMinutos,
  pacientesAguardando,
  icone,
  cor = 'primary',
  ultimaAtualizacao,
}: WaitTimeCardProps) => {
  const formatarTempo = (minutos: number) => {
    if (minutos < 60) {
      return `${minutos} min`;
    }
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}min`;
  };

  const obterCorCard = () => {
    switch (cor) {
      case 'secondary':
        return 'border-secondary bg-secondary/5';
      case 'warning':
        return 'border-warning bg-warning/5';
      default:
        return 'border-primary bg-primary/5';
    }
  };

  const obterCorTexto = () => {
    switch (cor) {
      case 'secondary':
        return 'text-secondary';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={cn('w-full', obterCorCard())}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold">
          {icone && <span className={obterCorTexto()}>{icone}</span>}
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={cn('text-6xl font-bold mb-2', obterCorTexto())}>
            {formatarTempo(tempoMinutos)}
          </div>
          <p className="text-lg text-muted-foreground">Tempo Estimado de Espera</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span className="text-lg">
            {pacientesAguardando} paciente{pacientesAguardando !== 1 ? 's' : ''} aguardando
          </span>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-4">
          <Clock className="h-4 w-4 inline mr-1" />
          Atualizado às {ultimaAtualizacao.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </CardContent>
    </Card>
  );
};