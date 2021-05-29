const navigation = document.getElementById('navigation');
let achor = navigation.querySelectorAll('a');
const ActiveLinks = (e) => {
  let achorActive = navigation.querySelectorAll('a.active');
  console.log('achorActive : ', achorActive);
  [...achorActive].map(item => item.classList.remove('active'))
  e.classList.add('active')
}