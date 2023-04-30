// import authApi from "src/api/authApi";
// import { getAuth, signOut } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   getDocs,
//   collection,
// } from "firebase/firestore";
// import { LocalStorage } from "quasar";

// export const checkAuthentication = async ({ commit }) => {
//   try {
//     const { accessToken } = LocalStorage.getItem("dataUser");
//     if (!accessToken) {
//       return { success: false };
//     }
//     await authApi.post(":lookup", { idToken: accessToken });
//     return { success: true };
//   } catch (Ex) {
//     console.log("checkAuthentication " + Ex.message);
//     commit("logOut");
//     return { success: false };
//   }
// };

// export const checkDataInit = async ({ commit }) => {
//   try {
//     const { accessToken, displayName } = LocalStorage.getItem("dataUser");
//     await authApi.post(":lookup", { idToken: accessToken });
//     commit("setDataInit", { displayName }); //Llamo la mutacion
//     return { success: true };
//   } catch (Ex) {
//     console.log("checkDataInit " + Ex.message);
//     commit("logOut");
//     return { success: false };
//   }
// };

// export const signInOut = async ({ commit }) => {
//   try {
//     const auth = getAuth();
//     signOut(auth);
//     commit("logOut");
//     return { success: true };
//   } catch (Ex) {
//     console.log("signInOut " + Ex.message);
//     commit("logOut");
//     return { success: false };
//   }
// };
