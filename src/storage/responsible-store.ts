import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ResponsibleStore = [
  {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
  }
];

type StateProps = {
  data: ResponsibleStore | null;
  save: (data: ResponsibleStore) => void;
  remove: () => void;
};

export const useResponsibleStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      save: (data: ResponsibleStore) => set(() => ({ data })),
      remove: () => set(() => ({ data: null })),
    }),
    {
      name: "manager.fut:responsible",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
