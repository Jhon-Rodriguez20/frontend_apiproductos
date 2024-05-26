import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'moment/locale/es';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { store } from './states/store';
import { getAutenticacionToken } from './connections/helpers/token';
import { ProductosPage } from './pages/productos/ProductosPage';
import { IniciarSesion } from './pages/auth/IniciarSesionPage';
import { Navigation } from './layouts/Navigation';
import { CrearUsuario } from './pages/auth/CrearUsuarioPage';
import { MisProductos } from './pages/productos/MisProductosPage';
import { RutaPrivada } from './routes/RutaPrivada';
import { CrearProducto } from './pages/productos/CrearProductoPage';
import { EditarProducto } from './pages/productos/ActualizarProductoPage';
import { Footer } from './layouts/Footer';

getAutenticacionToken();

function App() {
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path='/' element={<ProductosPage />} />
                        <Route path='/usuario/loguearse' element={<IniciarSesion />} />
                        <Route path='/usuario/registrar' element={<CrearUsuario />} />
                        <Route element={<RutaPrivada />}>
                            <Route path='/producto/crear' element={<CrearProducto />} />
                            <Route path='/usuario/leerMisProductos' element={<MisProductos />} />
                            <Route path='/producto/editar/:id' element={<EditarProducto />} />
                        </Route>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </SnackbarProvider>
        </Provider>
    );
}

export default App;