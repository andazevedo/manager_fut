import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type DistrictStore = [
  {
    id: string;
    name: string;
    user_id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    sports_couts: SportCourt[];
  }
];

export type SportCourt = {
  id: string;
  name: string;
  opening: string;
  closest: string;
  district_id: string;
};

type StateProps = {
  data: DistrictStore | null;
  save: (data: DistrictStore) => void;
  remove: () => void;
};

export const useDistrictStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      save: (data: DistrictStore) => set(() => ({ data })),
      remove: () => set(() => ({ data: null })),
    }),
    {
      name: "manager.fut:districts",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
