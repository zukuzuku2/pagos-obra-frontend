import React from 'react';

const ListaTrabajos = ({ trabajos, onEditar, onMarcarPagado, onEliminar, loading }) => {
  const getTipoMedidaText = (tipo) => {
    const tipos = {
      'metros_cuadrados': 'm²',
      'metros_lineales': 'm',
      'unidad': 'unidad'
    };
    return tipos[tipo] || tipo;
  };

  if (trabajos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No hay trabajos registrados</h3>
        <p>Agrega el primer trabajo usando el formulario de arriba</p>
      </div>
    );
  }

  return (
    <div className="trabajos-grid">
      {trabajos.map(trabajo => (
        <div key={trabajo.id} className={`trabajo-card ${trabajo.pagado ? 'pagado' : ''}`}>
          <div className="trabajo-header">
            <h3 className="trabajo-title">{trabajo.nombre}</h3>
            <span className={`trabajo-status ${trabajo.pagado ? 'status-pagado' : 'status-pendiente'}`}>
              {trabajo.pagado ? 'PAGADO' : 'PENDIENTE'}
            </span>
          </div>
          
          {trabajo.descripcion && (
            <p style={{marginBottom: '15px', color: '#666'}}>{trabajo.descripcion}</p>
          )}
          
          <div className="trabajo-details">
            <div className="detail-item">
              <span className="detail-label">Tipo de Medida</span>
              <span className="detail-value">{getTipoMedidaText(trabajo.tipoMedida)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Precio Unitario</span>
              <span className="detail-value">${trabajo.precioUnitario.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Cantidad</span>
              <span className="detail-value">{trabajo.cantidad.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total</span>
              <span className="detail-value" style={{fontSize: '1.3rem', color: '#667eea', fontWeight: '800'}}>
                ${Math.round(trabajo.total).toLocaleString('es-ES')}
              </span>
            </div>
          </div>
          
          <div className="trabajo-actions">
            <button 
              className="btn btn-edit"
              onClick={() => onEditar(trabajo)}
              disabled={loading}
            >
              ✏️ Editar
            </button>
            {!trabajo.pagado && (
              <button 
                className="btn btn-success"
                onClick={() => onMarcarPagado(trabajo.id)}
                disabled={loading}
              >
                {loading ? '⏳' : '✅'} Marcar Pagado
              </button>
            )}
            <button 
              className="btn btn-danger"
              onClick={() => onEliminar(trabajo.id)}
              disabled={loading}
            >
              {loading ? '⏳' : '🗑️'} Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaTrabajos;