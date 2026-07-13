import { FaCheck, FaClock } from "react-icons/fa";

// A vertical timeline that shows the progress of an order.
// Each step has a circle and a label. Completed steps are highlighted.
//
// Props:
// - steps: array of step names (strings), e.g. ["Confirmed", "Preparing", ...]
// - currentStep: the index (1-based) of the current step
function OrderTimeline({ steps, currentStep }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
      <h3 className="mb-6 text-sm font-bold text-text">Order Tracking</h3>

      {/* Vertical timeline */}
      <div className="space-y-0">
        {steps.map((step, index) => {
          // Step numbers are 1-based, index is 0-based
          const stepNumber = index + 1;
          const isDone = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step} className="flex gap-4">
              {/* Circle + connecting line */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                    isDone
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-primary text-white shadow-soft"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isDone ? (
                    <FaCheck className="text-[10px]" />
                  ) : isCurrent ? (
                    <FaClock className="text-[10px]" />
                  ) : (
                    stepNumber
                  )}
                </div>

                {/* Vertical line (hidden on the last step) */}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 ${
                      isDone ? "bg-green-500" : "bg-gray-200"
                    }`}
                    style={{ minHeight: "28px" }}
                  ></div>
                )}
              </div>

              {/* Step label */}
              <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                <p
                  className={`text-xs font-medium ${
                    isCurrent
                      ? "text-primary"
                      : isDone
                      ? "text-text"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </p>
                {isCurrent && (
                  <p className="text-[10px] text-gray-500">In progress...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderTimeline;
