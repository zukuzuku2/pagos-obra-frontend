import React, { useState, useEffect } from 'react';
import './App.css';

// Componentes
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ResumenFinanciero from './components/ResumenFinanciero';
import FormularioTrabajo from './components/FormularioTrabajo';
import ListaTrabajos from './components/ListaTrabajos';
import ConfirmModal from './components/ConfirmModal';

// Servicios
import apiService from './services/apiService';

// Utilidades
import { generarPDFCompleto, generarPDFAlbanil } from './utils/pdfGenerator';

function App() {
  const [trabajos, setTrabajos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [trabajoToDelete, setTrabajoToDelete] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipoMedida: 'metros_cuadrados',
    precioUnitario: '',
    cantidad: ''
  });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      setError(null);
      await apiService.fetchCsrfToken();
      await fetchTrabajos();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrabajos = async () => {
    try {
      const data = await apiService.fetchTrabajos();
      setTrabajos(data);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const trabajoData = {
        ...formData,
        precioUnitario: parseFloat(formData.precioUnitario),
        cantidad: parseFloat(formData.cantidad)
      };
      
      if (editingId) {
        await apiService.updateTrabajo(editingId, trabajoData);
      } else {
        await apiService.createTrabajo(trabajoData);
      }
      
      resetForm();
      await fetchTrabajos();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editarTrabajo = (trabajo) => {
    setFormData({
      nombre: trabajo.nombre,
      descripcion: trabajo.descripcion || '',
      tipoMedida: trabajo.tipoMedida,
      precioUnitario: trabajo.precioUnitario.toString(),
      cantidad: trabajo.cantidad.toString()
    });
    setEditingId(trabajo.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      tipoMedida: 'metros_cuadrados',
      precioUnitario: '',
      cantidad: ''
    });
    setEditingId(null);
  };

  const marcarPagado = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await apiService.markAsPaid(id);
      await fetchTrabajos();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarTrabajo = (id) => {
    const trabajo = trabajos.find(t => t.id === id);
    setTrabajoToDelete({ id, nombre: trabajo.nombre });
    setShowConfirmModal(true);
  };

  const confirmarEliminacion = async () => {
    try {
      setLoading(true);
      setError(null);
      await apiService.deleteTrabajo(trabajoToDelete.id);
      await fetchTrabajos();
      setShowConfirmModal(false);
      setTrabajoToDelete(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelarEliminacion = () => {
    setShowConfirmModal(false);
    setTrabajoToDelete(null);
  };

  const handleGenerarPDFCompleto = () => {
    try {
      generarPDFCompleto(trabajos);
    } catch (error) {
      setError('Error al generar el reporte PDF');
    }
  };

  const handleGenerarPDFAlbanil = () => {
    try {
      generarPDFAlbanil(trabajos);
    } catch (error) {
      setError('Error al generar el reporte PDF');
    }
  };

  if (loading && trabajos.length === 0) {
    return (
      <div className="container">
        <div className="header">
          <h1>Gestión de Pagos - Construcción</h1>
          <p>Control de trabajos del albañil</p>
        </div>
        <LoadingSpinner message="Cargando aplicación..." />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Gestión de Pagos - Construcción</h1>
        <p>Control de trabajos del albañil</p>
      </div>

      {error && (
        <ErrorMessage 
          error={error} 
          onRetry={() => {
            setError(null);
            initializeApp();
          }} 
        />
      )}

      <ResumenFinanciero 
        trabajos={trabajos}
        onGenerarPDFCompleto={handleGenerarPDFCompleto}
        onGenerarPDFAlbanil={handleGenerarPDFAlbanil}
      />

      <FormularioTrabajo 
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editingId={editingId}
        onCancelar={cancelarEdicion}
        loading={loading}
      />

      <ListaTrabajos 
        trabajos={trabajos}
        onEditar={editarTrabajo}
        onMarcarPagado={marcarPagado}
        onEliminar={eliminarTrabajo}
        loading={loading}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de eliminar el trabajo "${trabajoToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}

export default App;