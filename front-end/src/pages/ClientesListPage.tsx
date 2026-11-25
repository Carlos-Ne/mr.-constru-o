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

  async function handleDelete(id: string | number, nomeCliente: string) {
    const confirmed = window.confirm(
      `Tem certeza de que deseja apagar o cliente "${nomeCliente}"?`
    );
    if (!confirmed) return;

    try {
      await deleteCliente(id).unwrap();
    } catch (error) {
      console.error('Erro ao apagar cliente:', error);
      alert('Erro ao apagar cliente.');
    }
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
              <td>{cliente.nomeCliente || '-'}</td>
              <td>{cliente.telefone?.trim() || '-'}</td>
              <td>{cliente.cidade?.trim() || '-'}</td>
              <td>{cliente.bairro?.trim() || '-'}</td>
              <td>
                <Link to={AppRoutes.CLIENTS_EDIT.replace(':id', String(cliente.id))}>
                  Editar
                </Link>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDelete(cliente.id, cliente.nomeCliente)}
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