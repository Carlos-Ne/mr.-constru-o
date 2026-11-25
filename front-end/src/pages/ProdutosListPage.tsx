import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes/paths';
import { useGetProdutosQuery, useDeleteProdutoMutation } from '../services/api';

const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function ProdutosListPage() {
  const { data: produtos = [], isLoading, isError } = useGetProdutosQuery();
  const [deleteProduto, { isLoading: isDeleting }] = useDeleteProdutoMutation();

  if (isLoading) {
    return <p>A carregar produtos...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar produtos.</p>;
  }

  async function handleDelete(id: string | number, nomeProduto: string) {
    const confirmed = window.confirm(
      `Tem certeza de que deseja apagar o produto "${nomeProduto}"?`
    );
    if (!confirmed) return;

    try {
      await deleteProduto(id).unwrap();
    } catch (error) {
      console.error('Erro ao apagar produto:', error);
      alert('Erro ao apagar produto.');
    }
  }

  return (
    <div>
      <div>
        <h2>Produtos</h2>
        <Link to={AppRoutes.PRODUCTS_NEW}>Novo Produto</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.codigo || '-'}</td>
              <td>{produto.nomeProduto || '-'}</td>
              <td>{produto.marca?.trim() || '-'}</td>
              <td>{formatCurrency.format(Number(produto.precoVenda) || 0)}</td>
              <td>{produto.estoqueAtual ?? '-'}</td>
              <td>
                <Link to={AppRoutes.PRODUCTS_EDIT.replace(':id', String(produto.id))}>
                  Editar
                </Link>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDelete(produto.id, produto.nomeProduto)}
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