import { RunFrameWithApi } from "lib/components/RunFrameWithApi/RunFrameWithApi"
import { useState, useEffect } from "react"

export default () => {
  useEffect(() => {
    setTimeout(async () => {
      fetch("/api/files/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_path: "main.tsx",
          text_content: `
import manualEdits from "./manual-edits.json"

export default () => (
  <board width="10mm" height="10mm" manualEdits={manualEdits}>
    <resistor name="R1" resistance="1k" footprint="0402" />
    <capacitor name="C1" capacitance="1uF" footprint="0603" />
    <trace from=".R1 .pin1" to=".C1 .pin1" />
  </board>
)
`,
        }),
      })
      fetch("/api/files/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_path: "manual-edits.json",
          text_content: JSON.stringify({
            pcb_placements: [
              {
                selector: "R1",
                center: {
                  x: 5,
                  y: 5,
                },
                relative_to: "group_center",
              },
            ],
            edit_events: [],
            manual_trace_hints: [],
          }),
        }),
      })
    }, 500)
  }, [])

  if (
    typeof window !== "undefined" &&
    window.location.origin.includes("vercel.app")
  ) {
    return (
      <div>
        <h1>RunFrame with API</h1>
        <p>
          We don't currently deploy the API to vercel, try locally! The vite
          plugin will automatically load it.
        </p>
      </div>
    )
  }

  return <RunFrameWithApi debug />
}
