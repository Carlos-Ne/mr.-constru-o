import { ProdutosListPage } from '../pages/ProdutosListPage';
import { ProdutoFormPage } from '../pages/ProdutoFormPage';
import { ClientesListPage } from '../pages/ClientesListPage';
import { ClienteFormPage } from '../pages/ClienteFormPage';
import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './paths';
import { MainLayout } from '../components/layout/MainLayout';

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <h2>Painel Inicial</h2> },
      { path: AppRoutes.PRODUCTS_LIST, element: <ProdutosListPage /> },
      { path: AppRoutes.PRODUCTS_NEW, element: <ProdutoFormPage /> },
      { path: AppRoutes.PRODUCTS_EDIT, element: <ProdutoFormPage /> },
      { path: AppRoutes.CLIENTS_LIST, element: <ClientesListPage /> },
      { path: AppRoutes.CLIENTS_NEW, element: <ClienteFormPage /> },
      { path: AppRoutes.CLIENTS_EDIT, element: <ClienteFormPage /> },
    ],
  },
]);