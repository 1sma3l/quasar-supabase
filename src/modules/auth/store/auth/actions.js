import { supabase } from "src/api/supabaseClient";

export const signInUser = async ({ commit }, dataForm) => {
  try {
    const { email, password } = dataForm;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    const { session, user } = data;
    if (session != null) {
      let dataUser = {};
      const { id } = user;
      const { access_token, refresh_token } = session;
      let idUser = id;
      dataUser.accessToken = access_token;
      dataUser.refresh_token = refresh_token;
      const { data } = await supabase
        .from("usuarios")
        .select("*")
        .eq("uuid", idUser);

      let userInfo = data[0];
      if (userInfo.active) {
        dataUser.rol = userInfo.rol;
        dataUser.displayName = userInfo.name;
        const { data } = await supabase.from("roles").select();
        let arrRoles = [];
        data.forEach((rolrow) => {
          arrRoles.push({ value: rolrow.id, label: rolrow.name });
        });
        dataUser.roles = arrRoles;
        //Ejecuto mutacion par que impacte al store
        commit("loginUser", { dataUser });
        return { success: true };
      } else {
        return { success: false, message: "Usuario inactivo" };
      }
    } else {
      if (error.toString() === "AuthApiError: Invalid login credentials") {
        return { success: false, message: "Usuario y/o contraseña incorrecta" };
      } else if (error.toString() === "AuthApiError: Email not confirmed") {
        return { success: false, message: "Usuario no verificado" };
      }
    }
  } catch (Ex) {
    console.error("Login: " + Ex.message);
    return {
      success: false,
      message: "Error inesperado contacte a su proveedor de servicio.",
    };
  }
};

// export const signInUser = async ({ commit }, user) => {
//   try {
//     const { email, password } = user;
//     const auth = getAuth();
//     const db = getFirestore();
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const { accessToken, emailVerified, uid } = userCredential.user;
//     if (emailVerified) {
//       const docRef = doc(db, "usuarios", `${uid}`);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         if (docSnap.data().activo) {
//           const { data } = await authApi.post(":lookup", {
//             idToken: accessToken,
//           });
//           let { localId } = data.users[0];
//           const docRef = doc(db, "usuarios", `${localId}`);
//           const docSnap = await getDoc(docRef);
//           let dataUser = {};
//           if (docSnap.exists()) {
//             dataUser.accessToken = accessToken;
//             dataUser.rol = docSnap.data().rol;
//             dataUser.displayName = docSnap.data().name;
//             let arrRoles = [];
//             const rolesRef = collection(db, "roles");
//             let respRol = null;
//             // if (docSnap.data().rol == "2") {
//             //   //Creador
//             //   let q = query(rolesRef, where("name", "==", "Usuario"));
//             //   respRol = await getDocs(q);
//             // } else {
//             //   respRol = await getDocs(rolesRef);
//             // }
//             respRol = await getDocs(rolesRef);
//             respRol.forEach((doc) => {
//               arrRoles.push({ value: doc.id, label: doc.data().name });
//             });
//             dataUser.roles = arrRoles;
//           }
//           //Ejecuto mutacion par que impacte al store
//           commit("loginUser", { dataUser });

//           return { success: true };
//         } else {
//           return { success: false, message: "Usuario desactivado" };
//         }
//       } else {
//         return { success: false, message: "Usuario no existe" };
//       }
//     } else {
//       return { success: false, message: "Usuario no verificado" };
//     }
//   } catch (Ex) {
//     console.log("Login: " + Ex.message);
//     if (Ex.message == "Firebase: Error (auth/user-disabled).") {
//       return { success: false, message: "Usuario deshabilitado" };
//     } else {
//       return { success: false };
//     }
//   }
// };

// export const resetPwd = async ({ commit }, data) => {
//   try {
//     const { email } = data;
//     const auth = getAuth();
//     await sendPasswordResetEmail(auth, email);
//     // const { data } = await authApi.post(":sendOobCode", {
//     //   requestType: "PASSWORD_RESET",
//     //   email,
//     // });
//     return { success: true };
//   } catch (Ex) {
//     console.log("ResetPwd: " + Ex.message);
//     return { success: false };
//   }
// };
