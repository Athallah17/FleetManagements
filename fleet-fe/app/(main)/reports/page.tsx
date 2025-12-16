export default function ReportPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900 px-6">
      <div className="w-full max-w-md text-center bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700">
          <span className="text-3xl">🚧</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Reports 
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-muted-foreground">
          This feature is currently under development.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200 dark:bg-zinc-700" />

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You’ll soon be able to manage and monitor all company assets,
          including vehicles, equipment, and ownership details.
        </p>

        {/* Badge */}
        <div className="mt-6 inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-4 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300">
          Coming Soon
        </div>
      </div>
    </div>
  );
}
