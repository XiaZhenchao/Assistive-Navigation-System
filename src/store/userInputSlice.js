import { create, createStore } from 'zustand';

const useUserInputStore = (set => ({
  userInput: '',
  setUserInput: (input) => set({ userInput: input }),
}));

export default useUserInputStore;
