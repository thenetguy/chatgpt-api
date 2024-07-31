import { defineTool } from '@genkit-ai/ai'
import { z } from 'zod'

import type { AIFunctionLike } from '../types'
import { AIFunctionSet } from '../ai-function-set'

/**
 * Converts a set of Agentic stdlib AI functions to an array of Genkit-
 * compatible tools.
 */
export function createGenkitTools(...aiFunctionLikeTools: AIFunctionLike[]) {
  const fns = new AIFunctionSet(aiFunctionLikeTools)

  return fns.map((fn) =>
    defineTool(
      {
        name: fn.spec.name,
        description: fn.spec.description,
        inputSchema: fn.inputSchema,
        outputSchema: z.any()
      },
      fn.impl
    )
  )
}
