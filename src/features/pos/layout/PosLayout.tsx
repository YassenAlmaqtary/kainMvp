import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function PosLayout() {
  useEffect(() => {
    document.documentElement.classList.add('pos-active')
    return () => document.documentElement.classList.remove('pos-active')
  }, [])

  return (
    <div className="pos-shell">
      <Outlet />
    </div>
  )
}
