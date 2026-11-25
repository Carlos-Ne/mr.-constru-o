import { Outlet, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../routes/paths';
export function MainLayout() {
  return (
    <div>
      <header>
        <h1>Mr. Construção</h1>
      </header>

      <aside>
        <nav>
          <NavLink to={AppRoutes.HOME}>Início</NavLink>
          <NavLink to={AppRoutes.PRODUCTS_LIST}>Produtos</NavLink>
          <NavLink to={AppRoutes.CLIENTS_LIST}>Clientes</NavLink>
        </nav>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}