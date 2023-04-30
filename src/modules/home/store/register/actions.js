import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

import authApi from "src/api/authApi";
import { setDatetime } from "src/helpers/setFormatDates";
import { LocalStorage } from "quasar";
import { setRolDesc } from "src/helpers/setDisplayLabels";

export const getUsers = async ({ commit }) => {
  try {
    const db = getFirestore();
    let arrUser = [];
    const respUsers = await getDocs(collection(db, "usuarios"));
    respUsers.forEach((doc) => {
      let users = {
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        rol: setRolDesc(doc.data().rol),
        creado: doc.data().creado,
        fecha_creado: setDatetime(doc.data().fecha_creado),
        modificado: doc.data().modificado,
        fecha_modificado: setDatetime(doc.data().fecha_modificado),
        telefono: doc.data().telefono,
        activo: doc.data().activo,
      };
      arrUser.push(users);
    });
    return { success: true, arrUser: arrUser };
  } catch (Ex) {
    console.log("getUsers: " + Ex.message);
    return { success: false };
  }
};

export const saveUser = async ({ commit }, user) => {
  try {
    const { name, rol, email, password, telefono, activo } = user;
    const auth = getAuth();
    const db = getFirestore();

    const userAuth = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userAuth.user.uid != null) {
      await updateProfile(userAuth.user, {
        displayName: name,
      });

      const { accessToken } = LocalStorage.getItem("dataUser");
      if (!accessToken) {
        return { success: false };
      }
      const { data } = await authApi.post(":lookup", { idToken: accessToken });
      const { displayName } = data.users[0];

      await setDoc(doc(db, "usuarios", userAuth.user.uid), {
        activo: activo,
        creado: displayName,
        fecha_creado: serverTimestamp(),
        email: email,
        name: name,
        rol: rol,
        telefono: telefono,
        fecha_modificado: "",
        modificado: "",
      });

      await sendEmailVerification(auth.currentUser);
    }
    return { success: true };
  } catch (Ex) {
    console.log("RegisterUser: " + Ex.message);
    return { success: false };
  }
};

export const editUser = async ({ commit }, user) => {
  try {
    debugger;
    const { id, name, rol, telefono, activo } = user;
    const auth = getAuth();
    const db = getFirestore();

    const { accessToken } = LocalStorage.getItem("dataUser");
    if (!accessToken) {
      return { success: false };
    }
    const { data } = await authApi.post(":lookup", { idToken: accessToken });
    const { displayName } = data.users[0];

    await updateDoc(doc(db, "usuarios", id), {
      activo: activo,
      modificado: displayName,
      fecha_modificado: serverTimestamp(),
      name: name,
      rol: rol,
      telefono: telefono,
    });
    return { success: true };
  } catch (Ex) {
    console.log("editUser: " + Ex.message);
    return { success: false };
  }
};

export const deleteUser = async ({ commit }, uid) => {
  try {
    getAuth().getUser(uid);
    return { success: true };
  } catch (Ex) {
    console.log("deleteUser: " + Ex.message);
    return { success: false };
  }
};
