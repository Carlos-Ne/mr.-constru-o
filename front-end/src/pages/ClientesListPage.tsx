import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes/paths';
import { useGetClientesQuery, useDeleteClienteMutation } from '../services/api';

export function ClientesListPage() {
  const { data: clientes = [], isLoading, isError } = useGetClientesQuery();
  const [deleteCliente, { isLoading: isDeleting }] = useDeleteClienteMutation();

  if (isLoading) {
    return <p>A carregar clientes...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar clientes.</p>;
  }

  return (
    <div>
      <div>
        <h2>Clientes</h2>
        <Link to={AppRoutes.CLIENTS_NEW}>Novo Cliente</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nomeCliente}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.cidade ?? '-'}</td>
              <td>{cliente.bairro ?? '-'}</td>
              <td>
                <Link to={AppRoutes.CLIENTS_EDIT.replace(':id', String(cliente.id))}>
                  Editar
                </Link>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => deleteCliente(cliente.id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}