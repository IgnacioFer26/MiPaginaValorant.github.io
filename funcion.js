import { edit, getAll, remove, save, selectOne } from "./firestore.js";
let id = 0;

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length === 0) {
        const jugador = {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            usuario: document.getElementById('usuario').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            rol: document.getElementById('rol').value.trim(),
            agente: document.getElementById('agente').value.trim(),
            rango: document.getElementById('rango').value.trim()
        };

        if (document.getElementById('btnGuardar').value === 'Guardar') {
            await save(jugador);
        } else {
            await edit(id, jugador);
            id = 0;
        }

        limpiar();

        actualizarTabla();
    }
});

window.addEventListener('DOMContentLoaded', () => {

    actualizarTabla();
});

function actualizarTabla() {
    getAll(jugadores => {
        let tabla = '';
        jugadores.forEach(doc => {
            const item = doc.data();

            tabla += `<tr>
                <td>${item.nombre}</td>
                <td>${item.apellido}</td>
                <td>${item.usuario}</td>
                <td>${item.correo}</td>
                <td>${item.rol}</td>
                <td>${item.agente}</td>
                <td>${item.rango}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`;
        });

        document.getElementById('datosTabla').querySelector('tbody').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', async () => {
                const confirmacion = await Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                });

                if (confirmacion.isConfirmed) {
                    await remove(btn.id);
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Su registro ha sido eliminado.",
                        icon: "success"
                    });
                    
                    actualizarTabla();
                }
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const emp = await selectOne(btn.id);
                const item = emp.data();
                document.getElementById('nombre').value = item.nombre;
                document.getElementById('apellido').value = item.apellido;
                document.getElementById('usuario').value = item.usuario;
                document.getElementById('correo').value = item.correo;
                document.getElementById('rol').value = item.rol;
                document.getElementById('agente').value = item.agente;
                document.getElementById('rango').value = item.rango;
                document.getElementById('btnGuardar').value = 'Editar';
                document.getElementById('nombre').readOnly = true;
                id = btn.id;
            });
        });
    });
}

function limpiar() {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById('e-' + item.name).innerHTML = '';
    });
    document.getElementById('nombre').readOnly = false;
    document.getElementById('btnGuardar').value = 'Guardar';

    document.getElementById('rol').selectedIndex = 0;
    document.getElementById('rango').selectedIndex = 0;
}

function verificar(id) {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
    }
}
