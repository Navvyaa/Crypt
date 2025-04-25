interface ToolTipProps {
    label: string;
    tooltip?: string;
  }
  
  const ToolTip = ({ label, tooltip }: ToolTipProps) => {
    if (!tooltip) return <span>{label}</span>;
  
    return (
      <div className="flex items-center gap-1 justify-center">
        <span>{label}</span>
        <div className="group relative">
        <img src="/assets/info.png" className="w-4 h-4" alt="" />
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-90
                       absolute z-50 -translate-x-1/2 left-1/2
                       mt-2 px-3 py-3 text-gray-800 text-sm  bg-gray-50 rounded-md
                       whitespace-nowrap transition-all duration-200 w-auto">
            {tooltip}
          </div>
        </div>
      </div>
    );
  };
  
  export default ToolTip;