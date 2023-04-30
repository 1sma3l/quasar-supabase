import { LocalStorage, SessionStorage } from "quasar";

export const loginUser = (state, { dataUser }) => {
  if (dataUser) {
    LocalStorage.set("dataUser", dataUser);
  }
};
