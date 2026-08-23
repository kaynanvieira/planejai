import { useState, useEffect } from 'react'

export interface SimulationData {
  income: number
  fixedCosts: number
  debts: number
  goal: string
}

export interface Simulation {
  id: string
  createdAt: string
  formData: SimulationData
  rawFormData?: Record<string, any>
}

const HISTORY_KEY = 'planejai_history_list'

export function useSimulation() {
  const [simulations, setSimulations] = useState<Simulation[]>([])

  const loadSimulations = () => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY)
      if (stored) {
        setSimulations(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Erro ao ler histórico:', error)
    }
  }

  useEffect(() => {
    loadSimulations()
  }, [])

  const deleteSimulation = (id: string) => {
    try {
      const updated = simulations.filter((item) => item.id !== id)
      setSimulations(updated)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
      localStorage.removeItem(`@planejai:simulation:${id}`)
    } catch (error) {
      console.error('Erro ao excluir simulação:', error)
    }
  }

  return {
    simulations,
    deleteSimulation,
  }
}

export function saveSimulationToHistory(formData: Record<string, any>, customId?: string) {
  try {
    const id = customId || crypto.randomUUID()

    // Espelha os dados no formato nativo da aplicação
    localStorage.setItem(`@planejai:simulation:${id}`, JSON.stringify(formData))
    localStorage.setItem('@planejai:simulation', JSON.stringify(formData))

    const parseCurrency = (val: any) => {
      if (typeof val === 'number') return val
      if (typeof val === 'string') {
        const cleaned = val.replace(/[^\d,-]/g, '').replace(',', '.')
        return parseFloat(cleaned) || 0
      }
      return 0
    }

    const values = Object.values(formData)

    const newEntry: Simulation = {
      id,
      createdAt: new Date().toISOString(),
      rawFormData: formData,
      formData: {
        income: parseCurrency(formData.income || formData['renda-bruta'] || values[0]),
        fixedCosts: parseCurrency(formData.fixedCosts || formData['custos-fixos'] || values[1]),
        debts: parseCurrency(formData.debts || formData['dividas-parcelas'] || values[2]),
        goal: String(formData.goal || formData['objetivo-financeiro'] || values[3] || 'Simulação Financeira'),
      },
    }

    const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    const updated = [newEntry, ...existing]
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))

    return id
  } catch (error) {
    console.error('Erro ao gravar simulação no histórico:', error)
    return ''
  }
}