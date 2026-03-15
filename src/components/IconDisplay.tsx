import React from 'react'

function isImageUrl(icon: string): boolean {
  return icon.startsWith('/') || icon.startsWith('http') || icon.startsWith('data:')
}

export function IconDisplay({ icon, className = '' }: { icon: string; className?: string }) {
  if (isImageUrl(icon)) {
    return (
      <img
        src={icon}
        alt=""
        className={`object-contain inline-block ${className}`}
        style={{ width: '1em', height: '1em' }}
      />
    )
  }
  return <span className={className}>{icon}</span>
}
