import { create, createStore } from 'zustand';

const useUserInputStore = (set => ({
    userInput: '',
    destination: "",
    setUserInput: (input) => set({ userInput: input }),
    setDestination: (destination) => set({destination: destination}),
}));

export default useUserInputStore;
