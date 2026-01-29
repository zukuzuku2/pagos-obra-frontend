import React from 'react';

const ResumenFinanciero = ({ trabajos, onGenerarPDFCompleto, onGenerarPDFAlbanil }) => {
  const calcularTotales = () => {
    const pendiente = trabajos.filter(t => !t.pagado).reduce((sum, t) => sum + t.total, 0);
    const pagado = trabajos.filter(t => t.pagado).reduce((sum, t) => sum + t.total, 0);
    return { pendiente, pagado, total: pendiente + pagado };
  };

  const totales = calcularTotales();

  return (
    <div className="total-summary">
      <div className="summary-grid">
        <div className="summary-item summary-pendiente">
          <div className="summary-value">${Math.round(totales.pendiente).toLocaleString('es-ES')}</div>
          <div className="summary-label">💰 Pendiente de Pago</div>
        </div>
        <div className="summary-item summary-pagado">
          <div className="summary-value">${Math.round(totales.pagado).toLocaleString('es-ES')}</div>
          <div className="summary-label">✅ Ya Pagado</div>
        </div>
        <div className="summary-item summary-total">
          <div className="summary-value">${Math.round(totales.total).toLocaleString('es-ES')}</div>
          <div className="summary-label">📊 Total General</div>
        </div>
      </div>
      
      <div style={{marginTop: '25px', textAlign: 'center', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
        <button className="btn btn-pdf" onClick={onGenerarPDFCompleto}>
          📄 Reporte Completo
        </button>
        <button className="btn btn-pdf-albanil" onClick={onGenerarPDFAlbanil}>
          👷 Reporte Albañil
        </button>
      </div>
    </div>
  );
};

export default ResumenFinanciero;