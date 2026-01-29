import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Oops! Algo salió mal</h3>
      <p className="error-message">{error}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          🔄 Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;