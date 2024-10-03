import React from 'react'

export default function LoadingCards() {
  return (
    <div className="w-full max-w-xs p-4 border rounded-lg shadow animate-pulse">
      <div className="h-40 bg-gray-200 rounded-md" />
      <div className="mt-2 h-6 bg-gray-200 rounded w-3/4" />
      <div className="mt-1 h-4 bg-gray-200 rounded w-1/2" />
      <div className="mt-3 h-4 bg-gray-200 rounded w-1/4" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-20" />
    </div>
  )
}
