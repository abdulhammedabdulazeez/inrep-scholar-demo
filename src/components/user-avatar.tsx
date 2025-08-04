import { useUserStore } from "@/store/userStore";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  className?: string;
}

// Helper function to get initials from name
function getInitials(name: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-12 w-12 text-lg",
  xl: "h-24 w-24 text-2xl",
};

export default function UserAvatar({
  size = "md",
  showName = false,
  className = "",
}: UserAvatarProps) {
  const { name, role } = useUserStore((state) => state);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div
        className={`bg-blue-600 rounded-full flex items-center justify-center text-white font-medium ${sizeClasses[size]}`}
      >
        {getInitials(name)}
      </div>
      {showName && (
        <span className="text-sm text-gray-700">{name || "User"}</span>
      )}
    </div>
  );
}
