let suggestTaxiFrom, suggestTaxiTo, suggestParcelFrom, suggestParcelTo;


ymaps.ready(function() {
    suggestTaxiFrom = new ymaps.SuggestView('fromTaxi',{provider: 'yandex#map', kind: ''});
    suggestTaxiTo = new ymaps.SuggestView('toTaxi');
    
    suggestParcelFrom = new ymaps.SuggestView('fromParcel');
    suggestParcelTo = new ymaps.SuggestView('toParcel');

    
});

document.getElementById('calcTaxi').addEventListener('click', function() {
    console.log('suggestTaxiFrom : ',suggestTaxiFrom)

    calculateTaxi();

  });
  document.getElementById('calcParcel').addEventListener('click', function() {
    calculateParcel();
  });

function calculateTaxi() {
    ymaps.ready(init);
    function init() {
        // Стоимость за километр.S
        var DELIVERY_TARIFF = 3,
            BOARDING_COST = 70,
        // Минимальная стоимость.
            MINIMUM_COST = 70,
            routePanelControl = new ymaps.control.RoutePanel({
            options: {
                types: {auto: true}
            }
        });
        let myMap = new ymaps.Map('map', {
        center: [60.906882, 30.067233],
        zoom: 9,
        controls: []
        }),
        searchControl = new ymaps.control.SearchControl({
            options: {
                provider: 'yandex#search',
                position: {top: -45},
                
            }
        });
      
      let fromAddress = document.getElementById('fromTaxi').value,
          toAddress = document.getElementById('toTaxi').value;
      
      // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
      routePanelControl.routePanel.state.set({
          fromEnabled: true,
          toEnabled: true,
          from: fromAddress,
          to: toAddress
       });
       
      myMap.controls.add(routePanelControl).add(searchControl);
      // Получим ссылку на маршрут.
      routePanelControl.routePanel.getRouteAsync().then(function (route) {
    
        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({results: 1}, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {
            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                // Получим протяженность маршрута.
                var length = route.getActiveRoute().properties.get("distance"),
                    time = route.getActiveRoute().properties.get("duration"),
                // Вычислим стоимость доставки.
                    price = calculate(Math.round(length.value / 1000));
                // Создадим макет содержимого балуна маршрута.
                    console.log(length.text);
                    
                    document.getElementById('timeTaxi').value = time.text
                    document.getElementById('priceTaxi').value = `${price} сом`;
            }
        });
    
      });
      // Функция, вычисляющая стоимость доставки.
      function calculate(routeLength) {
          return Math.max(routeLength * DELIVERY_TARIFF + BOARDING_COST, MINIMUM_COST);
      }
      
    }
  }
  
  function calculateParcel() {
    ymaps.ready(init);
    function init() {
      // Стоимость за километр.S
      var DELIVERY_TARIFF = 3,
          BOARDING_COST = 70,
          weightParcel = document.getElementById('weightParcel').value,
      // Минимальная стоимость.
          MINIMUM_COST = 70,
          routePanelControl = new ymaps.control.RoutePanel({
            options: {
                types: {auto: true}
            }
        });
      let myMap = new ymaps.Map('map', {
        center: [60.906882, 30.067233],
        zoom: 9,
        controls: []
      }); 
      
      let fromAddress = document.getElementById('fromParcel').value,
          toAddress = document.getElementById('toParcel').value;
  
    
      // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
      routePanelControl.routePanel.state.set({
          fromEnabled: true,
          toEnabled: true,
          from: fromAddress,
          to: toAddress
       });
       
       myMap.controls.add(routePanelControl);
      // Получим ссылку на маршрут.
      routePanelControl.routePanel.getRouteAsync().then(function (route) {
    
          // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
          route.model.setParams({results: 1}, true);
    
          // Повесим обработчик на событие построения маршрута.
          route.model.events.add('requestsuccess', function () {
              var activeRoute = route.getActiveRoute();
              if (activeRoute) {
                  // Получим протяженность маршрута.
                  var length = route.getActiveRoute().properties.get("distance"),
                      time = route.getActiveRoute().properties.get("duration"),
                  // Вычислим стоимость доставки.
                      price = calculate(Math.round(length.value / 1000));
                  // Создадим макет содержимого балуна маршрута.
                     console.log(length.text);
                     document.getElementById('timeParcel').value = time.text
                     document.getElementById('priceParcel').value = `${price} сом`;
              }
          });
    
      });
      // Функция, вычисляющая стоимость доставки.
      function calculate(routeLength) {
          return Math.max(routeLength * (DELIVERY_TARIFF + parseInt(weightParcel)) + BOARDING_COST, MINIMUM_COST);
      }
      
    }
  } 