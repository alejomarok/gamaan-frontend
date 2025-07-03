import React, { useState, useEffect } from 'react';
import '../styles/calculadorTasas.css';

const CalculadorTasas = () => {
  // Simulación de usuario - en producción vendría de tu sistema de auth
  const [user] = useState({
    role: 'admin', // Cambiar a 'user' para probar sin permisos
    name: 'Usuario Admin'
  });

  const [showConfig, setShowConfig] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("prendario");

  const defaultConfigs = {
    prendario: {
      minRate: 25,
      maxRate: 45,
      defaultRate: 35,
      minTerm: 6,
      maxTerm: 60,
      defaultTerm: 18,
      minAmount: 500000,
      maxAmount: 7000000,
      defaultAmount: 3500000,
    },
    personal: {
      minRate: 30,
      maxRate: 65,
      defaultRate: 45,
      minTerm: 6,
      maxTerm: 72,
      defaultTerm: 24,
      minAmount: 100000,
      maxAmount: 5000000,
      defaultAmount: 1500000,
    },
    hipotecario: {
      minRate: 8,
      maxRate: 25,
      defaultRate: 15,
      minTerm: 60,
      maxTerm: 360,
      defaultTerm: 180,
      minAmount: 2000000,
      maxAmount: 50000000,
      defaultAmount: 15000000,
    },
  };

  const [configs, setConfigs] = useState(defaultConfigs);

  const [loanData, setLoanData] = useState({
    prendario: {
      amount: configs.prendario.defaultAmount,
      term: configs.prendario.defaultTerm,
    },
    personal: {
      amount: configs.personal.defaultAmount,
      term: configs.personal.defaultTerm,
    },
    hipotecario: {
      amount: configs.hipotecario.defaultAmount,
      term: configs.hipotecario.defaultTerm,
    },
  });

  const [results, setResults] = useState({});

  // Función para calcular préstamos (Sistema Francés)
  const calculateLoan = (amount, annualRate, termMonths) => {
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment = (amount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) / 
                          (Math.pow(1 + monthlyRate, termMonths) - 1);
    const totalAmount = monthlyPayment * termMonths;
    const totalInterest = totalAmount - amount;

    return {
      monthlyPayment,
      totalInterest,
      totalAmount,
    };
  };

  // Recalcular cuando cambien los datos
  useEffect(() => {
    const newResults = {};
    Object.keys(loanData).forEach((loanType) => {
      const data = loanData[loanType];
      const rate = configs[loanType].defaultRate;
      newResults[loanType] = calculateLoan(data.amount, rate, data.term);
    });
    setResults(newResults);
  }, [loanData, configs]);

  const updateLoanData = (loanType, field, value) => {
    setLoanData(prev => ({
      ...prev,
      [loanType]: {
        ...prev[loanType],
        [field]: value,
      },
    }));
  };

  const updateConfig = (loanType, field, value) => {
    setConfigs(prev => ({
      ...prev,
      [loanType]: {
        ...prev[loanType],
        [field]: value,
      },
    }));
    setConfigSaved(false);
  };

  const saveConfiguration = () => {
    console.log('Configuración guardada:', configs);
    localStorage.setItem('loanConfigs', JSON.stringify(configs));
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDetailed = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLoanTypeTitle = (type) => {
    const titles = {
      prendario: "Crédito Prendario",
      personal: "Crédito Personal", 
      hipotecario: "Crédito Hipotecario",
    };
    return titles[type];
  };

  const handleSolicitarCredito = () => {
    const currentLoan = loanData[activeTab];
    const currentResult = results[activeTab];
    alert(`Solicitud de ${getLoanTypeTitle(activeTab)}:
Monto: ${formatCurrency(currentLoan.amount)}
Plazo: ${currentLoan.term} meses
Cuota mensual: ${formatCurrencyDetailed(currentResult.monthlyPayment)}
Total a pagar: ${formatCurrencyDetailed(currentResult.totalAmount)}`);
  };

  const isAdmin = user.role === 'admin';


  const getSliderBackground = (value, min, max) => {
  const percent = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #003226 0%, #003226 ${percent}%, #DBC5A8 ${percent}%, #DBC5A8 100%)`;
};


  return (
    <div className="loan-calculator">
      {/* Header con configuración */}
      <div className="admin-header">
        <div className="admin-info">
          <span>Usuario: {user.name} ({user.role})</span>
        </div>
        {isAdmin && (
          <button
            className={`config-button ${showConfig ? 'active' : ''}`}
            onClick={() => setShowConfig(!showConfig)}
          >
            <span className="settings-icon">⚙️</span>
            Configuración
          </button>
        )}
      </div>

      {/* Panel de configuración */}
      {showConfig && isAdmin && (
        <div className="config-panel">
          <div className="config-header">
            <h2>Configuración de Parámetros</h2>
            <p>Ajusta los rangos, tasas y valores por defecto para cada tipo de crédito</p>
          </div>
          <div className="config-content">
            <div className="config-grid">
              {Object.keys(configs).map((loanType) => (
                <div key={loanType} className="config-section">
                  <h3>{getLoanTypeTitle(loanType)}</h3>
                  <div className="config-inputs">
                    <div className="input-group">
                      <label>Tasa Mín. (%)</label>
                      <input
                        type="number"
                        value={configs[loanType].minRate}
                        onChange={(e) => updateConfig(loanType, "minRate", parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Tasa Máx. (%)</label>
                      <input
                        type="number"
                        value={configs[loanType].maxRate}
                        onChange={(e) => updateConfig(loanType, "maxRate", parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Tasa por Defecto (%)</label>
                      <input
                        type="number"
                        value={configs[loanType].defaultRate}
                        onChange={(e) => updateConfig(loanType, "defaultRate", parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Plazo Mín. (meses)</label>
                      <input
                        type="number"
                        value={configs[loanType].minTerm}
                        onChange={(e) => updateConfig(loanType, "minTerm", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Plazo Máx. (meses)</label>
                      <input
                        type="number"
                        value={configs[loanType].maxTerm}
                        onChange={(e) => updateConfig(loanType, "maxTerm", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Monto Mín.</label>
                      <input
                        type="number"
                        value={configs[loanType].minAmount}
                        onChange={(e) => updateConfig(loanType, "minAmount", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="input-group">
                      <label>Monto Máx.</label>
                      <input
                        type="number"
                        value={configs[loanType].maxAmount}
                        onChange={(e) => updateConfig(loanType, "maxAmount", parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="config-actions">
              <button 
                className={`save-button ${configSaved ? 'saved' : ''}`}
                onClick={saveConfiguration}
              >
                {configSaved ? '✅ Guardado' : '💾 Guardar Configuración'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulador de Crédito */}
      <div className="simulator-container">
        <div className="simulator-header">
          <div className="simulator-icon"></div>
          <div>
  <h1>Simulador de Crédito</h1>
  <p style={{ color: "#DBC5A8" }}>Calculá el monto de tus cuotas mensuales</p>
</div>

        </div>

        {/* Tabs de tipos de crédito */}
        <div className="credit-tabs">
          <button
            className={`credit-tab ${activeTab === 'prendario' ? 'active' : ''}`}
            onClick={() => setActiveTab('prendario')}
          >
            Crédito Prendario
          </button>
          <button
            className={`credit-tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Crédito Personal
          </button>
          <button
            className={`credit-tab ${activeTab === 'hipotecario' ? 'active' : ''}`}
            onClick={() => setActiveTab('hipotecario')}
          >
            Crédito Hipotecario
          </button>
        </div>

        {/* Controles del simulador */}
        <div className="simulator-controls">
          {/* Monto del préstamo */}
          <div className="control-group">
            <div className="control-header">
              <label>Monto del préstamo</label>
              <span className="control-value" >{formatCurrency(loanData[activeTab].amount)}</span>
            </div>
            <div className="slider-container">
              <input
  type="range"
  min={configs[activeTab].minAmount}
  max={configs[activeTab].maxAmount}
  step="50000"
  value={loanData[activeTab].amount}
  onChange={(e) => updateLoanData(activeTab, 'amount', parseInt(e.target.value))}
  className="slider amount-slider"
  style={{
    background: getSliderBackground(
      loanData[activeTab].amount,
      configs[activeTab].minAmount,
      configs[activeTab].maxAmount
    ),
  }}
/>

              <div className="slider-labels">
                <span>{formatCurrency(configs[activeTab].minAmount)}</span>
                <span>{formatCurrency(configs[activeTab].maxAmount)}</span>
              </div>
            </div>
          </div>

          {/* Plazo en meses */}
          <div className="control-group">
            <div className="control-header">
              <label>Plazo en meses</label>
              <span className="control-value">{loanData[activeTab].term} meses</span>
            </div>
            <div className="slider-container">
              <input
  type="range"
  min={configs[activeTab].minTerm}
  max={configs[activeTab].maxTerm}
  step="1"
  value={loanData[activeTab].term}
  onChange={(e) => updateLoanData(activeTab, 'term', parseInt(e.target.value))}
  className="slider term-slider"
  style={{
    background: getSliderBackground(
      loanData[activeTab].term,
      configs[activeTab].minTerm,
      configs[activeTab].maxTerm
    ),
  }}
/>

              <div className="slider-labels">
                <span>{configs[activeTab].minTerm} meses</span>
                <span>{configs[activeTab].maxTerm} meses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {results[activeTab] && (
          <div className="results-section">
            <div className="result-cards">
              <div className="result-card">
                <div className="result-label">Cuota mensual</div>
                <div className="result-amount">{formatCurrencyDetailed(results[activeTab].monthlyPayment)}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Total a pagar</div>
                <div className="result-amount">{formatCurrencyDetailed(results[activeTab].totalAmount)}</div>
              </div>
            </div>

            <button className="solicitar-button" onClick={handleSolicitarCredito}>
              Solicitar este préstamo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculadorTasas;