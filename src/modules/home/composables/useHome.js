import { ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

const useHome = () => {
  const $q = useQuasar();
  const store = useStore();
  const listUsers = ref([]);

  const checkDataInit = async () => {
    //Ejecuto accion para veririficar la session
    await store.dispatch("home/checkDataInit");
  };

  const logout = async () => {
    const resp = await store.dispatch("home/signInOut"); //Ejecuto accion para salir y eliminar credenciales de acceso
    return resp;
  };

  return {
    logout,
    checkDataInit,
  };
};

export default useHome;
