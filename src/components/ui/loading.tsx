interface LoadingProps {
  university?: string;
  error?: string;
  className?: string;
  variant?: "university" | "simple";
  message?: string;
}

export default function Loading({
  university,
  error,
  className = "",
  variant = "university",
  message = "Loading...",
}: LoadingProps) {
  if (variant === "simple") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center">
          {/* Simple loading animation */}
          <div className="relative mb-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          <p className="text-gray-600 text-sm">{message}</p>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        {/* Custom loading animation */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* University branding - dynamic based on URL */}
        <div className="mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
            {university ? university.toUpperCase() : "..."}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {university
              ? `${
                  university.charAt(0).toUpperCase() + university.slice(1)
                } University`
              : "Loading University"}
          </h2>
          <p className="text-sm text-gray-600">Document Repository</p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
}
