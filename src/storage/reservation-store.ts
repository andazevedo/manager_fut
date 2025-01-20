import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResponsibleStore } from "./responsible-store";

export type ReservationStore = [
  {
    id: string;
    enabled: number;
    init_hour: string;
    end_hour: string;
    observations?: string | null;
    responsible_id: string;
    sports_cout_id: string;
    responsible: ResponsibleStore[];
  }
];

type StateProps = {
  data: ReservationStore | null;
  save: (data: ReservationStore) => void;
  remove: () => void;
};

export const useReservationStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      save: (data: ReservationStore) => set(() => ({ data })),
      remove: () => set(() => ({ data: null })),
    }),
    {
      name: "manager.fut:districts",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
