import React, { createContext, useContext, useState, useEffect } from 'react'
import { staticMaterials, subcategoryMeta, type StaticMaterial } from '@/data/materials'

interface MaterialsData {
  materials: StaticMaterial[]
  meta: Record<string, { icon: string; color: string }>
  loading: boolean
}

const MaterialsContext = createContext<MaterialsData>({
  materials: staticMaterials,
  meta: subcategoryMeta,
  loading: true,
})

export function MaterialsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MaterialsData>({
    materials: staticMaterials,
    meta: subcategoryMeta,
    loading: true,
  })

  useEffect(() => {
    fetch('/materials.json?' + Date.now())
      .then(r => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then(json => {
        // Normalize materials (handle old subcategory format)
        const materials: StaticMaterial[] = (json.materials || []).map((m: any) => {
          if (m.path && m.path.length > 0) return m
          const path: string[] = []
          if (m.subcategory) path.push(m.subcategory)
          if (m.subSubcategory) path.push(m.subSubcategory)
          return { ...m, path }
        })
        setData({
          materials,
          meta: json.meta || subcategoryMeta,
          loading: false,
        })
      })
      .catch(() => {
        // Fallback to static data
        setData({ materials: staticMaterials, meta: subcategoryMeta, loading: false })
      })
  }, [])

  return (
    <MaterialsContext.Provider value={data}>
      {children}
    </MaterialsContext.Provider>
  )
}

export function useMaterials() {
  return useContext(MaterialsContext)
}
