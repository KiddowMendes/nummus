import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  hasSeenBreath: boolean;
  demoName: string;
  pin: string;
  setHasCompletedOnboarding: (value: boolean) => void;
  setHasSeenBreath: (value: boolean) => void;
  setDemoName: (name: string) => void;
  setPin: (pin: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      hasSeenBreath: false,
      demoName: "",
      pin: "",
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      setHasSeenBreath: (value) => set({ hasSeenBreath: value }),
      setDemoName: (name) => set({ demoName: name }),
      setPin: (pin) => set({ pin }),
      reset: () => set({
        hasCompletedOnboarding: false,
        hasSeenBreath: false,
        demoName: "",
        pin: "",
      }),
    }),
    {
      name: "nummus-onboarding",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);