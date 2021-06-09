 let myMap;
let suggestViewFrom, suggestViewTo;
let from, to;
let multiRouteModel, routeTypeSelector;
let autoRouteItem, masstransitRouteItem, pedestrianRouteItem;

document.getElementById('run').addEventListener('click', function () {
  from = document.getElementById('from').value;
  console.log('from ', from);
  to = document.getElementById('to').value;
  console.log('to ', to);
 // Создаем модель мультимаршрута.


  // ymaps.route([from, to])
  //       .then(function (route) {
  //           myMap.geoObjects.add(route);
  //           console.log('route.editor.getLenght() ',route.properties.get("distance"));
  //       },
  //       function (error) {
  //           alert('Возникла ошибка: ' + error.message);
  //       });

});       
function init () {
    multiRouteModel = new ymaps.multiRouter.MultiRouteModel([
      from,
      to
    ], {
      // Путевые точки можно перетаскивать.
      // Маршрут при этом будет перестраиваться.
      wayPointDraggable: true,
      boundsAutoApply: true
    });
    
    // Создаём выпадающий список для выбора типа маршрута.
    routeTypeSelector = new ymaps.control.ListBox({
      data: {
          content: 'Как добраться'
      },
      items: [
          new ymaps.control.ListBoxItem({data: {content: "Авто"},state: {selected: true}}),
          new ymaps.control.ListBoxItem({data: {content: "Общественным транспортом"}}),
          new ymaps.control.ListBoxItem({data: {content: "Пешком"}})
      ],
      options: {
          itemSelectOnClick: false
      }
    }),
    // Получаем прямые ссылки на пункты списка.
    autoRouteItem = routeTypeSelector.get(0),
    masstransitRouteItem = routeTypeSelector.get(1),
    pedestrianRouteItem = routeTypeSelector.get(2);
    
    // Подписываемся на события нажатия на пункты выпадающего списка.
    autoRouteItem.events.add('click', function (e) { changeRoutingMode('auto', e.get('target')); });
    masstransitRouteItem.events.add('click', function (e) { changeRoutingMode('masstransit', e.get('target')); });
    pedestrianRouteItem.events.add('click', function (e) { changeRoutingMode('pedestrian', e.get('target')); });
    
    ymaps.modules.require([
    'MultiRouteCustomView'
    ], function (MultiRouteCustomView) {
    // Создаем экземпляр текстового отображения модели мультимаршрута.
    // см. файл custom_view.js
    new MultiRouteCustomView(multiRouteModel);
    });

  // Создаем карту с добавленной на нее кнопкой.
  var myMap = new ymaps.Map('map', {
          center: [42.86667, 74.56667],
          zoom: 10,
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

  function changeRoutingMode(routingMode, targetItem) {
      multiRouteModel.setParams({ routingMode: routingMode }, true);

      // Отменяем выбор элементов.
      autoRouteItem.deselect();
      masstransitRouteItem.deselect();
      pedestrianRouteItem.deselect();

      // Выбираем элемент и закрываем список.
      targetItem.select();
      routeTypeSelector.collapse();
  }
} 
ymaps.ready(init);
    