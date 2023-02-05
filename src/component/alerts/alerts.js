import Swal from "sweetalert2";

export const displayErrMsg = (err) => {
    Swal.fire({
        icon: "error",
        toast: true,
        showConfirmButton: false,
        text: err,
        position: "top-right",
    });
};

export const displaySuccMsg = (msg) => {
    Swal.fire({
        icon: "success",
        toast: true,
        showConfirmButton: false,
        text: msg,
        position: "top-right",
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

