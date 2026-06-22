export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-100 dark:bg-slate-900">
      <div
        className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm text-slate-500 dark:text-slate-400">جاري التحميل...</p>
    </div>
  )
}
