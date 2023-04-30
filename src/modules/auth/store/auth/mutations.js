import { LocalStorage } from "quasar";

export const loginUser = (state, { dataUser }) => {
  if (dataUser) {
    LocalStorage.set("dataUser", dataUser);
    LocalStorage.set("accessToken", dataUser.accessToken);
    LocalStorage.set("refresh_token", dataUser.refresh_token);
  }
};
