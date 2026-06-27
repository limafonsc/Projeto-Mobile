import React, { createContext, useState } from 'react';
import api from '../services/api';

export const CepContext = createContext({});

export function CepProvider({ children }) {
  const [cepData, setCepData] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  async function buscarCep(cep) {
    if (!cep || cep.length !== 8) {
      setErro(true);
      setCepData(null);
      return;
    }
    
    setLoading(true);
    setErro(false);
    
    try {
      const response = await api.get(`${cep}/json/`);
      
      if (response.data.erro === true || response.data.erro === 'true') {
        setErro(true);
        setCepData(null);
      } else {
        setErro(false);
        setCepData(response.data);
        setHistorico((antigos) => [response.data, ...antigos]);
      }
    } catch (e) {
      setErro(true);
      setCepData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CepContext.Provider value={{ cepData, historico, buscarCep, loading, erro }}>
      {children}
    </CepContext.Provider>
  );
}