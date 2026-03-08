import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { exportAllJson } from '../lib/exportJson'

// Debounce timer to avoid multiple rapid exports
let exportTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Hook for collections: triggers JSON export after create/update
 */
export const afterChangeExportHook: CollectionAfterChangeHook = async ({
  req,
  operation,
}) => {
  if (operation === 'create' || operation === 'update') {
    scheduleExport(req.payload)
  }
}

/**
 * Hook for globals: triggers JSON export after update
 */
export const afterChangeGlobalExportHook: GlobalAfterChangeHook = async ({
  req,
}) => {
  scheduleExport(req.payload)
}

/**
 * Debounced export - waits 2 seconds before exporting to batch rapid changes
 */
function scheduleExport(payload: Parameters<typeof exportAllJson>[0]) {
  if (exportTimer) {
    clearTimeout(exportTimer)
  }

  exportTimer = setTimeout(async () => {
    try {
      await exportAllJson(payload)
    } catch (error) {
      payload?.logger?.error?.('JSON export failed:')
      payload?.logger?.error?.(error as Error)
    }
  }, 2000)
}
