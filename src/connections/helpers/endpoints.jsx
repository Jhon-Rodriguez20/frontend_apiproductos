export const API_URL = "http://localhost:8080";

// ENDPOINTS DE PRODUCTOS
export const CREARPRODUCTO_POST_ENDPOINT = API_URL + "/producto";
export const PRODUCTOS_GET_ENDPOINT = API_URL + "/productos";
export const DETALLE_PRODUCTO_GET_ENDPOINT = API_URL + "/producto";
export const ACTUALIZAR_PRODUCTO_PUT_ENDPOINT = API_URL + "/producto";
export const ELIMINAR_PRODUCTO_DELETE_ENDPOINT = API_URL + "/producto";


// ENDPOINTS DE USUARIO
export const SIGNIN_POST_ENDPOINT = API_URL + "/usuario/login";
export const SIGNUP_POST_ENDPOINT = API_URL + "/usuario/crearUsuario";
export const MISPRODUCTOS_GET_ENDPOINT = API_URL + "/usuario/misProductos";