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

       // 1. Inicializamos los modales de Materialize (¡Esto es obligatorio para que abra la ventana!)
      var elemsModal = document.querySelectorAll('.modal');
      var instanciasModal = M.Modal.init(elemsModal);

      // 2. Inicializamos el efecto de zoom para las imágenes dentro del modal
      var elemsImg = document.querySelectorAll('.materialboxed');
      var instanciasImg = M.Materialbox.init(elemsImg);

      // 3. Buscamos todos los botones "Ver más" y les asignamos la acción
      document.querySelectorAll('.btn-detalle').forEach(function (boton) {
        boton.addEventListener('click', function (e) {
          
          // Evitamos que el botón recargue la página
          e.preventDefault();

          // Buscamos la tarjeta a la que pertenece el botón
          var tarjeta = boton.closest('.card');
          
          // Leemos el título de la tarjeta (ej: "Wireframes", "Prototipo en Figma")
          var titulo = tarjeta.querySelector('.card-title').textContent.trim();

          // CONDICIÓN: Si el título es "Wireframes", abrimos la ventana con las fotos
          if (titulo === 'Wireframes') {
            var modalWireframe = document.getElementById('modal-wireframes');
            var instancia = M.Modal.getInstance(modalWireframe);
            instancia.open();
          } 
          // SI ES OTRA TARJETA: Hacemos lo que ya tenías (mostrar/ocultar texto)
          else {
            var detalle = tarjeta.querySelector('.detalle');
            detalle.classList.toggle('hide');
            boton.textContent = detalle.classList.contains('hide') ? 'Ver más' : 'Ver menos';
          }
          
        });
      });

    }); // 