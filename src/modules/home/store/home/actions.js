import { supabase } from "src/api/supabaseClient";
import { LocalStorage } from "quasar";

export const checkAuthentication = async ({ commit }) => {
  try {
    let accessToken = LocalStorage.getItem("accessToken");
    let refresh_token = LocalStorage.getItem("refresh_token");
    if (!accessToken) {
      return { success: false };
    }
    const { data } = await supabase.auth.refreshSession({
      refresh_token,
    });
    const { session } = data;
    if (session != null) {
      LocalStorage.set("accessToken", session.access_token);
      LocalStorage.set("refresh_token", session.refresh_token);
      return { success: true };
    } else {
      commit("logOut");
      return { success: false };
    }
  } catch (Ex) {
    console.log("checkAuthentication " + Ex.message);
    commit("logOut");
    return { success: false };
  }
};

export const checkDataInit = async ({ commit }) => {
  try {
    let refresh_token = LocalStorage.getItem("refresh_token");
    const { data } = await supabase.auth.refreshSession({
      refresh_token,
    });
    const { user } = data;
    let resp = await supabase.from("usuarios").select("*").eq("uuid", user.id);
    let infoData = resp.data;
    let displayName = infoData[0].name;
    commit("setDataInit", { displayName }); //Llamo la mutacion
    return { success: true };
  } catch (Ex) {
    console.log("checkDataInit " + Ex.message);
    commit("logOut");
    return { success: false };
  }
};

export const signInOut = async ({ commit }) => {
  try {
    const { error } = await supabase.auth.signOut();
    commit("logOut");
    return { success: true };
  } catch (Ex) {
    console.log("signInOut " + Ex.message);
    commit("logOut");
    return { success: false };
  }
};
