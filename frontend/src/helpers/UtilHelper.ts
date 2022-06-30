import Swal from 'sweetalert2'

type ToastType = "error" | "success";

export function fireToast(type: ToastType, message: string) {

    const color: {[key in ToastType]: string} = {
        error: '#dc3545',
        success: '#198754'
    };

    Swal.fire({
        toast: true,
        position: "top-end",
        text: message,
        timer: 2500,
        timerProgressBar: true,
        background: color[type],
        color: 'white',
        showConfirmButton: false,
        padding: "0.5em 0.3em"
    })
}
