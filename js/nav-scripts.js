const navigation = document.getElementById('navigation');
let achor = navigation.querySelectorAll('a');
const ActiveLinks = (e) => {
  let achorActive = navigation.querySelectorAll('a.active');
  [...achorActive].map(item => item.classList.remove('active'))
  e.classList.add('active')
}
document.getElementById('run').addEventListener("click", function() {
  let from = document.getElementById('from').value;
  let to = document.getElementById('to').value;
  function init () {
  // Создаем модель мультимаршрута.
  var multiRouteModel = new ymaps.multiRouter.MultiRouteModel([
          from,
          to
      ], {
          // Путевые точки можно перетаскивать.
          // Маршрут при этом будет перестраиваться.
          wayPointDraggable: true,
          boundsAutoApply: true
      }),

      // Создаём выпадающий список для выбора типа маршрута.
      routeTypeSelector = new ymaps.control.ListBox({
          data: {
              content: 'Как добраться'
          },
          items: [
              new ymaps.control.ListBoxItem({data: {content: "Авто"},state: {selected: true}}),
          ],
          options: {
              itemSelectOnClick: false
          }
      }),
      // Получаем прямые ссылки на пункты списка.
      autoRouteItem = routeTypeSelector.get(0);


  ymaps.modules.require([
      'MultiRouteCustomView'
  ], function (MultiRouteCustomView) {
      // Создаем экземпляр текстового отображения модели мультимаршрута.
      // см. файл custom_view.js
      new MultiRouteCustomView(multiRouteModel);
  });

  // Создаем карту с добавленной на нее кнопкой.
  var myMap = new ymaps.Map('map', {
          center: [55.750625, 37.626],
          zoom: 7,
          controls: [routeTypeSelector]
      }, {
          buttonMaxWidth: 300
      }),

      // Создаем на основе существующей модели мультимаршрут.
      multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel, {
          // Путевые точки можно перетаскивать.
          // Маршрут при этом будет перестраиваться.
          wayPointDraggable: true,
          boundsAutoApply: true
      });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);
});

