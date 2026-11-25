import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Produto, ProdutoDTO } from '../types/produto';
import type { Cliente, ClienteDTO } from '../types/cliente.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Produto', 'Cliente'],
  endpoints: (builder) => ({
    getProdutos: builder.query<Produto[], void>({
      query: () => 'api/produtos',
      providesTags: ['Produto'],
    }),
    getProdutoById: builder.query<Produto, number>({
      query: (id) => `api/produtos/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Produto', id }],
    }),
    createProduto: builder.mutation<Produto, ProdutoDTO>({
      query: (body) => ({
        url: 'api/produtos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Produto'],
    }),
    updateProduto: builder.mutation<Produto, { id: number; data: ProdutoDTO }>({
      query: ({ id, data }) => ({
        url: `api/produtos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, id) => ['Produto', { type: 'Produto', id }],
    }),
    deleteProduto: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/produtos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => ['Produto', { type: 'Produto', id }],
    }),
    getClientes: builder.query<Cliente[], void>({
      query: () => 'api/clientes',
      providesTags: ['Cliente'],
    }),
    getClienteById: builder.query<Cliente, number>({
      query: (id) => `api/clientes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Cliente', id }],
    }),
    createCliente: builder.mutation<Cliente, ClienteDTO>({
      query: (body) => ({
        url: 'api/clientes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cliente'],
    }),
    updateCliente: builder.mutation<Cliente, { id: number; data: ClienteDTO }>({
      query: ({ id, data }) => ({
        url: `api/clientes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, id) => ['Cliente', { type: 'Cliente', id }],
    }),
    deleteCliente: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/clientes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => ['Cliente', { type: 'Cliente', id }],
    }),
  }),
});

export const {
  useGetProdutosQuery,
  useGetProdutoByIdQuery,
  useCreateProdutoMutation,
  useUpdateProdutoMutation,
  useDeleteProdutoMutation,
  useGetClientesQuery,
  useGetClienteByIdQuery,
  useCreateClienteMutation,
  useUpdateClienteMutation,
  useDeleteClienteMutation,
} = api;