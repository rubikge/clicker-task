interface UpgradeButtonProps {
  nextLevelCost: number;
  onUpgrade: () => void;
  disabled: boolean;
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({ nextLevelCost, onUpgrade, disabled }) => {
  return nextLevelCost > 0 && (
    <button
      onClick={onUpgrade}
      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg
        transform active:scale-95 transition-all text-sm font-semibold
        shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      Upgrade ({nextLevelCost} clicks)
    </button>
  );
}; 