import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDFCompleto = (trabajos) => {
  try {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString('es-ES');
    
    // Título
    doc.setFontSize(18);
    doc.text('REPORTE COMPLETO - CONSTRUCCION', 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 30);
    
    // Resumen financiero
    const pendiente = trabajos.filter(t => !t.pagado).reduce((sum, t) => sum + t.total, 0);
    const pagado = trabajos.filter(t => t.pagado).reduce((sum, t) => sum + t.total, 0);
    const total = pendiente + pagado;
    
    doc.text(`Total Pendiente: $${Math.round(pendiente).toLocaleString()}`, 20, 45);
    doc.text(`Total Pagado: $${Math.round(pagado).toLocaleString()}`, 20, 52);
    doc.text(`Total General: $${Math.round(total).toLocaleString()}`, 20, 59);
    
    // Tabla de trabajos
    const tableData = trabajos.map(trabajo => [
      trabajo.nombre || '',
      getTipoMedidaText(trabajo.tipoMedida),
      `$${(trabajo.precioUnitario || 0).toLocaleString()}`,
      (trabajo.cantidad || 0).toLocaleString(),
      `$${Math.round(trabajo.total || 0).toLocaleString()}`,
      trabajo.pagado ? 'PAGADO' : 'PENDIENTE',
      (trabajo.fechaCreacion || '').split('T')[0]
    ]);
    
    autoTable(doc, {
      startY: 70,
      head: [['Trabajo', 'Medida', 'Precio Unit.', 'Cantidad', 'Total', 'Estado', 'Fecha']],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [102, 126, 234] }
    });
    
    doc.save(`reporte-completo-${fecha.replace(/\//g, '-')}.pdf`);
  } catch (error) {
    console.error('Error generando PDF completo:', error);
    throw new Error('No se pudo generar el reporte completo');
  }
};

export const generarPDFAlbanil = (trabajos) => {
  try {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString('es-ES');
    
    // Título
    doc.setFontSize(18);
    doc.text('REPORTE DE TRABAJOS - ALBANIL', 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 30);
    
    // Solo total pendiente
    const pendiente = trabajos.filter(t => !t.pagado).reduce((sum, t) => sum + t.total, 0);
    doc.text(`Total por Cobrar: $${Math.round(pendiente).toLocaleString()}`, 20, 45);
    
    // Solo trabajos pendientes sin precios unitarios
    const trabajosPendientes = trabajos.filter(t => !t.pagado);
    
    if (trabajosPendientes.length === 0) {
      doc.text('No hay trabajos pendientes', 20, 70);
    } else {
      const tableData = trabajosPendientes.map(trabajo => [
        trabajo.nombre || '',
        getTipoMedidaText(trabajo.tipoMedida),
        (trabajo.cantidad || 0).toLocaleString(),
        `$${Math.round(trabajo.total || 0).toLocaleString()}`,
        trabajo.descripcion || '-'
      ]);
      
      autoTable(doc, {
        startY: 60,
        head: [['Trabajo', 'Medida', 'Cantidad', 'Total', 'Descripcion']],
        body: tableData,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [72, 187, 120] }
      });
    }
    
    doc.save(`trabajos-albanil-${fecha.replace(/\//g, '-')}.pdf`);
  } catch (error) {
    console.error('Error generando PDF albañil:', error);
    throw new Error('No se pudo generar el reporte para el albañil');
  }
};

const getTipoMedidaText = (tipo) => {
  const tipos = {
    'metros_cuadrados': 'm²',
    'metros_lineales': 'm',
    'unidad': 'unidad'
  };
  return tipos[tipo] || tipo || '';
};