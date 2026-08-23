import { Link, useNavigate } from 'react-router-dom'
import { useSimulation } from '@/hooks/useSimulation'

export function History() {
  const { simulations, deleteSimulation } = useSimulation()
  const navigate = useNavigate()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } catch {
      return 'Recente'
    }
  }

  const handleViewDetails = (sim: any) => {
    const dataToSave = sim.rawFormData || {
      'renda-bruta': String(sim.formData.income),
      'custos-fixos': String(sim.formData.fixedCosts),
      'dividas-parcelas': String(sim.formData.debts),
      'objetivo-financeiro': sim.formData.goal,
    }

    // Alimenta tanto a chave individual por ID quanto a chave global consumida pelo hook original
    localStorage.setItem(`@planejai:simulation:${sim.id}`, JSON.stringify(dataToSave))
    localStorage.setItem('@planejai:simulation', JSON.stringify(dataToSave))

    navigate(`/resultado/${sim.id}`)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Histórico de Simulações</h1>
          <p className="text-sm text-gray-400">
            Consulte ou exclua suas análises financeiras anteriores.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Nova Simulação
        </Link>
      </div>

      {simulations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/50 p-12 text-center">
          <div className="mb-4 text-4xl">🐷</div>
          <h2 className="text-lg font-semibold text-white">Nenhuma simulação salva</h2>
          <p className="mb-6 text-sm text-gray-400">
            Você ainda não realizou nenhuma simulação financeira.
          </p>
          <Link
            to="/"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Criar minha primeira simulação
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {simulations.map((sim) => (
            <div
              key={sim.id}
              className="flex flex-col justify-between rounded-xl border border-gray-800 bg-gray-900/80 p-5 transition-all hover:border-gray-700"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    📅 {formatDate(sim.createdAt)}
                  </span>
                  <button
                    onClick={() => deleteSimulation(sim.id)}
                    className="rounded p-1 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    title="Excluir simulação"
                  >
                    🗑️ Excluir
                  </button>
                </div>

                <h3 className="mb-2 text-base font-semibold text-white line-clamp-1">
                  {sim.formData?.goal || 'Simulação sem título'}
                </h3>

                <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-gray-950/60 p-3 text-xs">
                  <div>
                    <span className="block text-gray-500">Renda</span>
                    <span className="font-medium text-emerald-400">
                      {formatCurrency(sim.formData?.income)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Custos</span>
                    <span className="font-medium text-rose-400">
                      {formatCurrency(sim.formData?.fixedCosts)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Dívidas</span>
                    <span className="font-medium text-amber-400">
                      {formatCurrency(sim.formData?.debts)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(sim)}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 py-2 text-xs font-semibold text-gray-200 transition-colors hover:bg-gray-800"
              >
                Ver detalhes →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}