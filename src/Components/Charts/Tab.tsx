// Type definition for the props of Tab Component

interface TabProps {
  value: "3m" | "6m" | "1y";
  activeTab: string;
  onTabChange: (value: "3m" | "6m" | "1y") => void;
  label: string;
}

export default function Tab({
  value,
  activeTab,
  onTabChange,
  label,
}: TabProps) {
  return (
    <>
      <button
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === value
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-muted-foreground hover:text-blue-500"
        }`}
        onClick={() => onTabChange(value)}
      >
        {label}
      </button>
    </>
  );
}
