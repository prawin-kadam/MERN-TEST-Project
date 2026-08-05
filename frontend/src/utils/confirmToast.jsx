import toast from "react-hot-toast";

export const confirmToast = ({
  title = "Are you sure?",
  message = "",
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  return new Promise((resolve) => {
    toast.custom(
      (t) => (
        <div
          className={`w-[380px] bg-base-100 rounded-xl shadow-2xl border border-base-300 p-5 transition-all duration-200 ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <h2 className="text-lg font-bold text-base-content">
            {title}
          </h2>

          <p className="mt-2 text-sm text-base-content/70">
            {message}
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              {cancelText}
            </button>

            <button
              className="btn btn-sm btn-error text-white"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Wait until user clicks
      }
    );
  });
};