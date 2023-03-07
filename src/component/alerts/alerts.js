import Swal from "sweetalert2";

export const displayErrMsg = (err, thenFuction) => {
  Swal.fire({
    icon: "error",
    toast: true,
    showConfirmButton: false,
    text: err,
    position: "top-right",
    timer: 4000,
    timerProgressBar: true,
  }).then(() => {
    thenFuction();
  });
};

export const displaySuccMsg = (msg, thenFunction) => {
  Swal.fire({
    icon: "success",
    toast: true,
    showConfirmButton: false,
    text: msg,
    position: "top-right",
    timer: 4000,
    timerProgressBar: true,
  }).then(() => {
    thenFunction();
  });
};

export const displayWarningMsg = (msg) => {
  Swal.fire({
    icon: "warning",
    toast: true,
    showConfirmButton: false,
    text: msg,
    position: "top-right",
  });
};

export const displayLoading = (msg) => {
  Swal.fire({
    title: msg,
    allowOutsideClick: false,
    // allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
    position: "top-right",
  });
};
