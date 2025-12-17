"use client"

import React from "react"
import { AssetContent } from "@/components/asset/AssetContent"

export default function AssetPage() {

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-zinc-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Company Vehicles</h1>
      <AssetContent/>
    </div>
  )
}
