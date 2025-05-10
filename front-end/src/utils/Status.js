// src/utils/status.js

export const statusOptions = [
    { label: "Emergency Hotline", color: "red" },
    { label: "Family & Friends", color: "limegreen" },
    { label: "Work Related", color: "blueviolet" },
    { label: "Jowa", color: "gold" },
    { label: "None", color: "gray" },
  ];
  
  export const getStatusDotColor = (label) => {
    const status = statusOptions.find((s) => s.label === label);
    if (!status) return "bg-gray-400";
  
    switch (status.color) {
      case "red":
        return "bg-red-500";
      case "limegreen":
        return "bg-lime-500";
      case "blueviolet":
        return "bg-violet-500";
      case "gold":
        return "bg-yellow-400";
      case "gray":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };
  