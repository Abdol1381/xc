// TransactionModal Component
const TransactionStepsModal = ({ isOpen, steps, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#200052] rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#FBFAF9]">
            Transaction Progress
          </h2>
          <button
            onClick={onClose}
            className="text-[#FBFAF9] hover:text-[#A0055D] text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="mt-6">
          {steps.map((step, index) => {
            let circleClasses =
              "flex items-center justify-center w-8 h-8 rounded-full font-bold text-white";
            let display;
            if (step.status === "completed") {
              circleClasses += " bg-[#A0055D]";
              display = (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              );
            } else if (step.status === "current") {
              circleClasses += " bg-yellow-500";
              display = index + 1;
            } else if (step.status === "failed") {
              circleClasses += " bg-red-500";
              display = (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              );
            } else {
              circleClasses += " bg-gray-500";
              display = index + 1;
            }
            return (
              <div key={index} className="flex items-center mb-4">
                <div className={circleClasses}>{display}</div>
                <span
                  className={`ml-3 text-[#FBFAF9] ${
                    step.status === "current" ? "font-semibold" : ""
                  }`}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 bg-[#A0055D] text-[#FBFAF9] px-4 py-2 rounded hover:bg-[#A0055D]/80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionStepsModal;
