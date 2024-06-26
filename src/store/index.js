import  { create, createStore } from 'zustand';
import useUserInputStore from './userInputSlice';

// Combine all the stores into a single store
const useStore = create((set) => ({
   ...useUserInputStore(set)
  // Add other slices here in the future
}));

export default useStore;
