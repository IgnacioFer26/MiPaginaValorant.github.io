const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else{
        input.classList.add('is-valid')
        div.innerHTML = ''
    }

}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById('e-' + item.name).innerHTML = '';
    });
    document.getElementById('nombre').readOnly = false;
    document.getElementById('btnGuardar').value = 'Guardar';

    document.getElementById('rol').selectedIndex = 0;
    document.getElementById('rango').selectedIndex = 0;
};

const validaEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!formato.test(email))
        return false
    return true
}
