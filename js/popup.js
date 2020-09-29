let calendar = new Calendar('calendar');
calendar.dayClick = (e) => {
  let date = e.target.getAttribute('data-day').split('-')
  let year = date[0]
  let month = date[1]
  let day = date[2]
  let data = new todoListData()

  let activeDoms = document.getElementById('calendar-content').getElementsByClassName('click-active')

  for(var i=0; i<activeDoms.length; i++) {
    activeDoms[i].classList.remove('click-active')
  }
  e.target.classList.add('click-active')

  list.show({data: data.getData(year, month, day), year: year, month: month, day: day})
}
calendar.show()

// chrome.windows.create({
//   url:"popup.html",
//   type:"panel",
//   width:300,
//   height:200
// });