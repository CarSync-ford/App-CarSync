import { useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';

const VELOCIDADE_MIN = 12;
const VELOCIDADE_MAX = 30;

export function useVeiculoSimulado(velocidadeInicial: number, combustivelInicial: number, ativo: boolean) {
  const [velocidade, setVelocidade] = useState(velocidadeInicial);
  const [combustivel, setCombustivel] = useState(combustivelInicial);

  useEffect(() => {
    if (!ativo) return;

    const intervalo = setInterval(() => {
      setVelocidade((atual) => {
        const passo = Math.round(Math.random() * 2) - 1;
        return Math.min(VELOCIDADE_MAX, Math.max(VELOCIDADE_MIN, atual + passo));
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [ativo]);

  useEffect(() => {
    if (!ativo) return;

    const intervalo = setInterval(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCombustivel((atual) => Math.max(0, atual - 1));
    }, 10000);

    return () => clearInterval(intervalo);
  }, [ativo]);

  return { velocidade, combustivel };
}
