import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../routes/paths';
import type { ProdutoDTO } from '../types/produto';
import {
  useGetProdutoByIdQuery,
  useCreateProdutoMutation,
  useUpdateProdutoMutation,
} from '../services/api';

const initialState: ProdutoDTO = {
  codigo: '',
  codigoBarras: '',
  nomeProduto: '',
  marca: '',
  familia: '',
  fornecedor: '',
  custo: 0,
  promocional: false,
  precoVenda: 0,
  descontoAvista: 0,
  precoPrazo: 0,
  taxaLucro: 0,
  estoqueMinimo: 0,
  estoqueAtual: 0,
  unidade: '',
};

const numericFields = [
  'custo',
  'precoVenda',
  'descontoAvista',
  'precoPrazo',
  'taxaLucro',
  'estoqueMinimo',
  'estoqueAtual',
];

export function ProdutoFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const produtoId = id ?? '';

  const [formData, setFormData] = useState<ProdutoDTO>(initialState);

  const { data: produtoExistente } = useGetProdutoByIdQuery(produtoId, {
    skip: !isEditing || !produtoId,
  });
  const [createProduto, { isLoading: isCreating }] = useCreateProdutoMutation();
  const [updateProduto, { isLoading: isUpdating }] = useUpdateProdutoMutation();

  useEffect(() => {
    if (produtoExistente) {
      setFormData({
        codigo: produtoExistente.codigo ?? '',
        codigoBarras: produtoExistente.codigoBarras ?? '',
        nomeProduto: produtoExistente.nomeProduto ?? '',
        marca: produtoExistente.marca ?? '',
        familia: produtoExistente.familia ?? '',
        fornecedor: produtoExistente.fornecedor ?? '',
        custo: produtoExistente.custo ?? 0,
        promocional: produtoExistente.promocional ?? false,
        precoVenda: produtoExistente.precoVenda ?? 0,
        descontoAvista: produtoExistente.descontoAvista ?? 0,
        precoPrazo: produtoExistente.precoPrazo ?? 0,
        taxaLucro: produtoExistente.taxaLucro ?? 0,
        estoqueMinimo: produtoExistente.estoqueMinimo ?? 0,
        estoqueAtual: produtoExistente.estoqueAtual ?? 0,
        unidade: produtoExistente.unidade ?? '',
      });
    }
  }, [produtoExistente]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : numericFields.includes(name)
            ? Number(value)
            : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (isEditing && produtoId) {
        await updateProduto({ id: produtoId, data: formData }).unwrap();
      } else {
        await createProduto(formData).unwrap();
      }

      navigate(AppRoutes.PRODUCTS_LIST);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto.');
    }
  }

  return (
    <div>
      <h2>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codigo">Código</label>
          <input
            id="codigo"
            name="codigo"
            type="text"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="codigoBarras">Código de Barras</label>
          <input
            id="codigoBarras"
            name="codigoBarras"
            type="text"
            value={formData.codigoBarras ?? ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="nomeProduto">Nome do Produto</label>
          <input
            id="nomeProduto"
            name="nomeProduto"
            type="text"
            value={formData.nomeProduto}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="marca">Marca</label>
          <input
            id="marca"
            name="marca"
            type="text"
            value={formData.marca ?? ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="familia">Família</label>
          <input
            id="familia"
            name="familia"
            type="text"
            value={formData.familia ?? ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="fornecedor">Fornecedor</label>
          <input
            id="fornecedor"
            name="fornecedor"
            type="text"
            value={formData.fornecedor ?? ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="unidade">Unidade</label>
          <input
            id="unidade"
            name="unidade"
            type="text"
            value={formData.unidade}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="custo">Custo</label>
          <input
            id="custo"
            name="custo"
            type="number"
            step="0.01"
            value={formData.custo ?? 0}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="precoVenda">Preço de Venda</label>
          <input
            id="precoVenda"
            name="precoVenda"
            type="number"
            step="0.01"
            value={formData.precoVenda}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="descontoAvista">Desconto à Vista</label>
          <input
            id="descontoAvista"
            name="descontoAvista"
            type="number"
            step="0.01"
            value={formData.descontoAvista ?? 0}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="precoPrazo">Preço a Prazo</label>
          <input
            id="precoPrazo"
            name="precoPrazo"
            type="number"
            step="0.01"
            value={formData.precoPrazo ?? 0}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="taxaLucro">Taxa de Lucro (%)</label>
          <input
            id="taxaLucro"
            name="taxaLucro"
            type="number"
            step="0.01"
            value={formData.taxaLucro ?? 0}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="estoqueMinimo">Estoque Mínimo</label>
          <input
            id="estoqueMinimo"
            name="estoqueMinimo"
            type="number"
            value={formData.estoqueMinimo ?? 0}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="estoqueAtual">Estoque Atual</label>
          <input
            id="estoqueAtual"
            name="estoqueAtual"
            type="number"
            value={formData.estoqueAtual}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="promocional">
            <input
              id="promocional"
              name="promocional"
              type="checkbox"
              checked={Boolean(formData.promocional)}
              onChange={handleChange}
            />
            Promocional
          </label>
        </div>

        <button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating ? 'A guardar...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={() => navigate(AppRoutes.PRODUCTS_LIST)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}