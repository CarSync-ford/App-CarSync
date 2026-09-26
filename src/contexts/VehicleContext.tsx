import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vehicle } from '@/src/types/veiculo';
import { PerfilIcone } from '@/src/types/perfil';
import { veiculosMock } from '@/src/data/veiculosMock';
import { perfilIconesMock } from '@/src/data/perfilIconesMock';

const STORAGE_KEY = '@carsync/preferencias';

interface VehicleContextType {
  veiculos: Vehicle[];
  perfilIcones: PerfilIcone[];
  veiculoSelecionado: Vehicle;
  perfilIconeSelecionado: PerfilIcone | null;
  salvarPreferencias: (veiculoId: string, perfilIconeId: string | null) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType>({} as VehicleContextType);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [veiculoId, setVeiculoId] = useState(veiculosMock[0].id);
  const [perfilIconeId, setPerfilIconeId] = useState<string | null>(null);

  useEffect(() => {
    const carregarPreferencias = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const dados = JSON.parse(raw);
        if (dados.veiculoId) setVeiculoId(dados.veiculoId);
        if (dados.perfilIconeId) setPerfilIconeId(dados.perfilIconeId);
      } catch (e) {
        console.error('[VehicleContext] Falha ao carregar preferências', e);
      }
    };
    carregarPreferencias();
  }, []);

  const salvarPreferencias = async (novoVeiculoId: string, novoPerfilIconeId: string | null) => {
    setVeiculoId(novoVeiculoId);
    setPerfilIconeId(novoPerfilIconeId);
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ veiculoId: novoVeiculoId, perfilIconeId: novoPerfilIconeId })
    );
  };

  const veiculoSelecionado = veiculosMock.find((v) => v.id === veiculoId) ?? veiculosMock[0];
  const perfilIconeSelecionado = perfilIconesMock.find((p) => p.id === perfilIconeId) ?? null;

  return (
    <VehicleContext.Provider
      value={{
        veiculos: veiculosMock,
        perfilIcones: perfilIconesMock,
        veiculoSelecionado,
        perfilIconeSelecionado,
        salvarPreferencias,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  return useContext(VehicleContext);
}
