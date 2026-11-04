    // Esperamos a que todo el HTML termine de cargar antes de ejecutar.
    // Si no, el JS buscaría elementos que todavía no existen.
    document.addEventListener('DOMContentLoaded', function () {

      // =====================================================
      // PARTE 0: Menú del celular (el mismo de las otras páginas)
      // =====================================================
      M.Sidenav.init(document.querySelectorAll('.sidenav'));


      // =====================================================
      // PARTE 1: CALCULAR EL PROGRESO GENERAL
      // =====================================================

      // Guardamos en "items" todos los avances de la lista
      // (cada <li class="collection-item">).
      var items = document.querySelectorAll('.collection-item');

      // "puntos" va sumando cuánto avance llevamos.
      var puntos = 0;

      // Recorremos los avances uno por uno.
      items.forEach(function (item) {
        // Leemos el atributo data-estado de cada <li>.
        // Completado suma 1 punto, en proceso suma medio punto,
        // pendiente no suma nada.
        if (item.dataset.estado === 'completado') puntos += 1;
        if (item.dataset.estado === 'proceso')    puntos += 0.5;
      });

      // Convertimos los puntos en porcentaje:
      // (puntos / total de avances) * 100, redondeado.
      var porcentaje = Math.round((puntos / items.length) * 100);

      // Mostramos el número en el texto "Progreso general: __%"
      document.getElementById('porcentaje').textContent = porcentaje;

      // Ajustamos el ancho de la barra roja al porcentaje calculado.
      document.getElementById('barra-progreso').style.width = porcentaje + '%';


      // =====================================================
      // PARTE 2: FILTRAR LOS AVANCES POR ESTADO
      // =====================================================

      // Guardamos los 4 chips (Todos, Completados, En proceso, Pendientes).
      var filtros = document.querySelectorAll('.filtro');

      // A cada chip le decimos qué hacer cuando le hacen clic.
      filtros.forEach(function (filtro) {
        filtro.addEventListener('click', function (e) {

          // Evita que el enlace "#!" mueva la página hacia arriba.
          e.preventDefault();

          // Quitamos la clase "activo" de todos los chips...
          filtros.forEach(function (f) { f.classList.remove('activo'); });
          // ...y se la ponemos solo al chip que se clicó (cambia su color).
          filtro.classList.add('activo');

          // Leemos qué filtro se eligió: "todos", "completado", etc.
          // (viene del atributo data-filtro del chip).
          var estado = filtro.dataset.filtro;

          // Recorremos los avances y decidimos cuáles se ven.
          items.forEach(function (item) {
            // Se muestra si el filtro es "todos" o si el estado coincide.
            var mostrar = (estado === 'todos') || (item.dataset.estado === estado);
            // '' deja el estilo normal, 'none' lo oculta.
            item.style.display = mostrar ? '' : 'none';
          });
        });
      });


      // =====================================================
      // PARTE 3: BOTÓN "VER MÁS / VER MENOS" EN LAS TARJETAS
      // =====================================================

      // Buscamos todos los botones "Ver más".
      document.querySelectorAll('.btn-detalle').forEach(function (boton) {
        boton.addEventListener('click', function () {

          // Desde el botón subimos a su tarjeta (.card) y buscamos
          // dentro de ella el párrafo con la descripción ampliada.
          var detalle = boton.closest('.card').querySelector('.detalle');

          // toggle: si tiene la clase "hide" se la quita (se ve),
          // y si no la tiene se la pone (se oculta).
          detalle.classList.toggle('hide');

          // Cambiamos el texto del botón según el estado.
          boton.textContent = detalle.classList.contains('hide') ? 'Ver más' : 'Ver menos';
        });
      });

    });