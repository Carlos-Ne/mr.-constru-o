import { Outlet, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../routes/paths';

const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  display: 'inline-block',
  padding: '8px 14px',
  marginRight: '8px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: isActive ? 700 : 500,
  backgroundColor: isActive ? '#1e293b' : 'transparent',
  color: isActive ? '#ffffff' : '#1e293b',
  border: '1px solid #cbd5e1',
});

export function MainLayout() {
  return (
    <div>
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ margin: 0 }}>Mr. Construção</h1>
      </header>

      <aside style={{ padding: '12px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <nav style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <NavLink to={AppRoutes.HOME} style={linkStyle} end>
            Início
          </NavLink>
          <NavLink to={AppRoutes.PRODUCTS_LIST} style={linkStyle}>
            Produtos
          </NavLink>
          <NavLink to={AppRoutes.CLIENTS_LIST} style={linkStyle}>
            Clientes
          </NavLink>
        </nav>
      </aside>

      <main style={{ padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  );
}