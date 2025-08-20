import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Activity, Calendar } from 'lucide-react';
import { EstadoSistema } from '@/types/patient';

interface SystemStatusProps {
  estado: EstadoSistema;
}

export const SystemStatus = ({ estado }: SystemStatusProps) => {
  const agora = new Date();
  
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {estado.online ? (
                <Wifi className="h-5 w-5 text-secondary" />
              ) : (
                <WifiOff className="h-5 w-5 text-destructive" />
              )}
              <Badge variant={estado.online ? 'secondary' : 'destructive'}>
                {estado.online ? 'Sistema Online' : 'Sistema Offline'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span className="text-sm">
                {estado.totalPacientes} pacientes hoje
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {agora.toLocaleDateString('pt-BR', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};