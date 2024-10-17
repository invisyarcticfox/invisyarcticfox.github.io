function AutoAge(birthYear, birthMonth, birthDay) {
  var birthdate = new Date(birthYear, birthMonth - 1, birthDay)
  var today = new Date()
  return Math.floor((today.getTime() - birthdate.getTime()) / 1000 / 60 / 60 / 24 / 365)
}

function showAge() {
  var i, elem, items = document.getElementsByClassName('age');
  for (i = 0; i < items.length; i++) {
    elem = items[i]
    elem.innerHTML = AutoAge(elem.dataset.year || 2005, elem.dataset.month || 5, elem.dataset.day || 4)
  }
}
showAge()