import { ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { LocalStorage } from "quasar";

const useRegister = () => {
  const $q = useQuasar();
  const store = useStore();
  const listUsers = ref([]);
  let listRoles = ref([]);

  const loadUsers = async () => {
    $q.loading.show({
      message: "Procesando información, Espere un momento por favor...",
    });
    debugger;
    const { roles } = LocalStorage.getItem("dataUser");
    listRoles.value = roles;

    //Ejecuto accion para obtener los usuarios
    const { success, arrUser } = await store.dispatch("register/getUsers");
    listUsers.value = arrUser;

    $q.loading.hide();
    if (!success) {
      $q.notify({
        icon: "report_problem",
        position: "bottom",
        type: "negative",
        message: "Error al cargar datos",
      });
    }
  };

  const saveUser = async (user) => {
    const { modoNav } = user;
    let resp = null;
    if (modoNav == "I") {
      resp = await store.dispatch("register/saveUser", user); //Ejecuto accion
    } else {
      resp = await store.dispatch("register/editUser", user); //Ejecuto accion
    }
    return resp;
  };

  const deleteUser = async (uid) => {
    const resp = await store.dispatch("register/deleteUser", uid); //Ejecuto accion
    return resp;
  };

  return {
    listRoles,
    listUsers,
    loadUsers,
    saveUser,
    deleteUser,
  };
};

export default useRegister;
