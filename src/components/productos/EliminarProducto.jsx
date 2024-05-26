import axios from "axios";
import { useState } from "react";
import { MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ELIMINAR_PRODUCTO_DELETE_ENDPOINT } from '../../connections/helpers/endpoints';
import { DeleteForever } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import useAlertas from "../alertas/Alertas";
import { BackDropProgreso } from "../common/BackDropProgreso";
import PropTypes from 'prop-types';

function EliminarProductoMenuItem({ id, nombreProducto }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    const confirmarEliminacionProducto = () => {
        enqueueSnackbar(`¿Desea eliminar el producto "${nombreProducto}"?`, {
            variant: 'default',
            persist: true,
            action: (key) => (
                <>
                    <Button onClick={() => eliminarProducto(key)} color="error" className="confirm-button">
                        CONFIRMAR
                    </Button>
                    <Button onClick={() => closeSnackbar(key)} color="secondary"className="cancel-button">
                        CANCELAR
                    </Button>
                </>
            ),
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    };

    const eliminarProducto = async (key) => {
        setLoading(true);
        try {
            await axios.delete(`${ELIMINAR_PRODUCTO_DELETE_ENDPOINT}/${id}`);
            setLoading(false);
            navigate("/");
            closeSnackbar(key);
            mostrarAlertaExito("¡Producto eliminado con éxito!")
        } catch (error) {
            setLoading(false);
            mostrarAlertaError("Ocurrió un error al eliminar el producto.")
        }
    };

    return (
        <MenuItem onClick={confirmarEliminacionProducto} sx={{color: 'rgb(232, 5, 5)'}}>
            <BackDropProgreso open={loading} />
            <DeleteForever sx={{ color: 'rgb(232, 5, 5)'}} /> Eliminar
        </MenuItem>
    );
}

EliminarProductoMenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    nombreProducto: PropTypes.string.isRequired,
}

export { EliminarProductoMenuItem }