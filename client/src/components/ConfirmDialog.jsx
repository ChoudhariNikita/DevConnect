export default function ConfirmDialog({
  show,
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmVariant = "danger",     // NEW 👈
  cancelVariant = "secondary"    // Optional
}) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow rounded-4 border-0">
          <div className={`modal-header bg-${confirmVariant} text-white rounded-top-4`}>
            <h5 className="modal-title fw-semibold">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-4 py-3 text-secondary">
            <p className="mb-0 fs-6">{message}</p>
          </div>
          <div className="modal-footer bg-light rounded-bottom-4">
            <button
              className={`btn btn-outline-${cancelVariant} px-4 me-2 rounded-pill`}
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className={`btn btn-${confirmVariant} px-4 rounded-pill fw-semibold`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
