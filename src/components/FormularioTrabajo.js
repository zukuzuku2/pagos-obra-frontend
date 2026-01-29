import React from 'react';

const FormularioTrabajo = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  editingId, 
  onCancelar, 
  loading 
}) => {
  const tiposTrabajos = [
    { value: '', label: 'Seleccionar trabajo', icon: '🔧' },
    { value: 'Ladrillo', label: 'Ladrillo', icon: '🧱' },
    { value: 'Cerramento', label: 'Cerramento', icon: '🏗️' },
    { value: 'Puertas', label: 'Puertas', icon: '🚪' },
    { value: 'Ventana', label: 'Ventana', icon: '🪟' },
    { value: 'Salpicado', label: 'Salpicado', icon: '🎨' }
  ];

  return (
    <div className="form-container">
      <h2>✨ {editingId ? 'Editar Trabajo' : 'Agregar Nuevo Trabajo'}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre del Trabajo</label>
            <select
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
              disabled={loading}
            >
              {tiposTrabajos.map(trabajo => (
                <option key={trabajo.value} value={trabajo.value}>
                  {trabajo.icon} {trabajo.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Tipo de Medida</label>
            <select
              value={formData.tipoMedida}
              onChange={(e) => setFormData({...formData, tipoMedida: e.target.value})}
              disabled={loading}
            >
              <option value="metros_cuadrados">Metros Cuadrados (m²)</option>
              <option value="metros_lineales">Metros Lineales (m)</option>
              <option value="unidad">Por Unidad</option>
            </select>
          </div>
          <div className="form-group">
            <label>Precio Unitario ($)</label>
            <input
              type="number"
              value={formData.precioUnitario}
              onChange={(e) => setFormData({...formData, precioUnitario: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="number"
              value={formData.cantidad}
              onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="form-group" style={{marginBottom: '25px'}}>
          <label>Descripción (opcional)</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            rows="3"
            disabled={loading}
          />
        </div>
        <div style={{textAlign: 'center', display: 'flex', gap: '15px', justifyContent: 'center'}}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Guardando...' : (editingId ? '💾 Actualizar Trabajo' : '➕ Agregar Trabajo')}
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={onCancelar} disabled={loading}>
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioTrabajo;