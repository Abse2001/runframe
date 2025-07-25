import { Circuit } from "@tscircuit/core"

export const renderToCircuitJson = (board: React.ReactElement) => {
  const circuit = new Circuit()
  circuit.add(board)
  return circuit.getCircuitJson()
}

export const fullRenderToCircuitJson = async (board: React.ReactElement) => {
  const circuit = new Circuit()
  circuit.add(board)
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}
