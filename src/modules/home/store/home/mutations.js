import { LocalStorage } from "quasar";

export const setDataInit = (state, { displayName }) => {
  state.displayName = displayName;
};

export const logOut = (state) => {
  state.displayName = "";
  //Limpiamos el localstorage del navegador
  LocalStorage.clear();
};
