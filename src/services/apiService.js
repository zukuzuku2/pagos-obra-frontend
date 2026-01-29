const API_URL = 'http://192.168.1.118:3001/api'; // Cambiar por IP del servidor en red

// Validación de URL para prevenir SSRF
const validateApiUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const allowedHosts = ['localhost', '127.0.0.1'];
    const allowedPorts = ['3001'];
    
    // Permitir IPs de red local
    const isLocalNetwork = /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(urlObj.hostname);
    
    if (!allowedHosts.includes(urlObj.hostname) && !isLocalNetwork) {
      throw new Error('Host no permitido');
    }
    
    if (!allowedPorts.includes(urlObj.port)) {
      throw new Error('Puerto no permitido');
    }
    
    return true;
  } catch (error) {
    throw new Error('URL no válida o no permitida');
  }
};

class ApiService {
  constructor() {
    this.csrfToken = '';
    // Validar URL base al inicializar
    validateApiUrl(API_URL);
  }

  async fetchCsrfToken() {
    // CSRF removido por deprecación de librería
    return Promise.resolve('');
  }

  async fetchTrabajos() {
    try {
      const url = `${API_URL}/trabajos`;
      validateApiUrl(url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al cargar trabajos');
      return await response.json();
    } catch (error) {
      throw new Error('Error de conexión con el servidor');
    }
  }

  async createTrabajo(trabajoData) {
    try {
      const response = await fetch(`${API_URL}/trabajos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(trabajoData)
      });
      if (!response.ok) throw new Error('Error al crear trabajo');
      return await response.json();
    } catch (error) {
      throw new Error('Error al guardar el trabajo');
    }
  }

  async updateTrabajo(id, trabajoData) {
    try {
      const response = await fetch(`${API_URL}/trabajos/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(trabajoData)
      });
      if (!response.ok) throw new Error('Error al actualizar trabajo');
      return await response.json();
    } catch (error) {
      throw new Error('Error al actualizar el trabajo');
    }
  }

  async markAsPaid(id) {
    try {
      const response = await fetch(`${API_URL}/trabajos/${id}/pagar`, {
        method: 'PATCH',
        headers: { 'X-CSRF-Token': this.csrfToken },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al marcar como pagado');
      return await response.json();
    } catch (error) {
      throw new Error('Error al procesar el pago');
    }
  }

  async deleteTrabajo(id) {
    try {
      const response = await fetch(`${API_URL}/trabajos/${id}`, {
        method: 'DELETE',
        headers: { 'X-CSRF-Token': this.csrfToken },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al eliminar trabajo');
      return await response.json();
    } catch (error) {
      throw new Error('Error al eliminar el trabajo');
    }
  }
}

export default new ApiService();