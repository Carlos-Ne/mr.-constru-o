import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../routes/paths';
import {
  useCreateClienteMutation,
  useGetClienteByIdQuery,
  useUpdateClienteMutation,
} from '../services/api';

export function ClienteFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const clienteId = id ?? '';

  const { data: cliente, isLoading: isLoadingCliente } = useGetClienteByIdQuery(
    clienteId,
    { skip: !isEditing || !clienteId }
  );

  const [createCliente, { isLoading: isCreating }] = useCreateClienteMutation();
  const [updateCliente, { isLoading: isUpdating }] = useUpdateClienteMutation();

  const [nomeCliente, setNomeCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');

  useEffect(() => {
    if (cliente) {
      setNomeCliente(cliente.nomeCliente ?? '');
      setTelefone(cliente.telefone ?? '');
      setRua(cliente.rua ?? '');
      setNumero(cliente.numero ?? '');
      setComplemento(cliente.complemento ?? '');
      setBairro(cliente.bairro ?? '');
      setCidade(cliente.cidade ?? '');
      setCep(cliente.cep ?? '');
      setPontoReferencia(cliente.pontoReferencia ?? '');
    }
  }, [cliente]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const payload = {
      nomeCliente,
      telefone,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      cep,
      pontoReferencia,
    };

    try {
      if (isEditing) {
        await updateCliente({ id: clienteId, data: payload }).unwrap();
      } else {
        await createCliente(payload).unwrap();
      }
      navigate(AppRoutes.CLIENTS);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente.');
    }
  }

  if (isEditing && isLoadingCliente) {
    return <p>A carregar dados do cliente...</p>;
  }

  const isSaving = isCreating || isUpdating;

  return (
    <div>
      <h2>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Cliente:</label>
          <input
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Rua:</label>
          <input
            type="text"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
        </div>

        <div>
          <label>Número:</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>

        <div>
          <label>Complemento:</label>
          <input
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>

        <div>
          <label>Bairro:</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>

        <div>
          <label>Cidade:</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>

        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>

        <div>
          <label>Ponto de Referência:</label>
          <input
            type="text"
            value={pontoReferencia}
            onChange={(e) => setPontoReferencia(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" disabled={isSaving}>
            {isSaving ? 'A guardar...' : 'Guardar'}
          </button>
          <Link to={AppRoutes.CLIENTS}>Cancelar</Link>
        </div>
      </form>
    </div>
  );
}