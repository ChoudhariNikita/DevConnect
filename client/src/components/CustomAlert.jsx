import Swal from "sweetalert2";
export const showAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title,
      text,
      confirmButtonText: "OK",
      confirmButtonColor: "#0a66c2", // LinkedIn blue
      customClass: {
        popup: "rounded-4 shadow",
        confirmButton: "btn btn-primary px-4",
      },
    });
  };