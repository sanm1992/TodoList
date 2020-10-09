// let Calendar = (function() {

//   let getDayEnglish = (weeDay) => {
//     let arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//     return arr[weeDay];
//   }

//   let operaterDom = (month) => {
//     let dom = `
//       <span class="pre" id="pre-month-btn">上一月</span>
//       <span class="month">${month}</span>
//       <span class="next" id="next-month-btn">下一月</span>
//     `
//     return dom;
//   }

//   let monthDayDom = (year, month) => {
//     let daysArr = Window.getMonthDays(year, month);
//     let firstDay = Window.getWeekDay(year, month);
//     for(i = 1; i < firstDay; i++) {
//       daysArr.unshift('')
//     }
//     let owe = 42 - daysArr.length
//     for(i = 0; i < owe; i++) {
//       daysArr.push('')
//     }

//     let monthHtml = '';
//     let columnsDom = '';
//     daysArr.forEach((item, i) => {
//       index = i + 1;
//       let toDayClass = Window.getToday() === item ? 'today' : ''
//       let weekDayClass = (index % 7 === 0 || (index + 1) % 7 === 0) ? 'week-day' : '';

//       columnsDom += `<div class="column ${toDayClass} ${weekDayClass}">${item}</div>`;

//       if ((index % 7 === 0) || index === daysArr.length) {
//         let rowDom = `<div class="row month">${columnsDom}</div>`;
//         monthHtml += rowDom;
//         columnsDom = '';
//       }
//     })

//     return monthHtml;
//   }

//   let calendarDom = (year, month) => {
//     let weekDaysStr = '一二三四五六日';
//     let weekDaysArr = weekDaysStr.split('');
//     let weekDaysDom = '<div id="week-row" class="row week">';
//     weekDaysArr.forEach((item, index) => {
//       let itemHtml = `
//         <div class="column ${getDayEnglish(index)}">${item}</div>
//       `
//       weekDaysDom += itemHtml;
//     })

//     weekDaysDom += '</div>'

//     let dom = `
//       <div class="head">${operaterDom(month)}</div>
//       <div id="calendar-content" class="content">${weekDaysDom + monthDayDom(year, month)}</div>
//     `
//     return dom;
//   }

//   let bindEvent = (btnId, handlerMethod) => {
//     document.getElementById(btnId).addEventListener("click", handlerMethod)
//   }

//   let nextMoth = () => {
//     if (options.month > 11) {
//       options.month = 1;
//       options.year = 1;
//     } else {
//       options.year = options.year + 1;
//     }

//     // show({options});
//   }

//   let preMoth = () => {
//     if (options.month > 1) {
//       options.month = options.month - 1;
//     } else {
//       options.month = 1;
//       options.year = options.year - 1;
//     }

//     // show({options})
//   }

//   let show = (options = {}) => {
//     let date = new Date;
  
//     let {
//       rootId = 'calendar',
//       month   = date.getMonth() + 1,
//       year    = date.getFullYear()
//     } = options

//     root = document.getElementById(rootId)
//     if (!root) { return }
//     root.innerHTML = calendarDom(year, month);
//     bindEvent('next-month-btn', nextMoth)
//     bindEvent('pre-month-btn', preMoth)
//   };

//   return {
//     show: show
//   }
// })();

// Calendar.show({rootId: 'calendar'})

let Calendar = function (rootId, options={}) {
  this.init(rootId, options);
}
Calendar.prototype = {
  init:function(rootId, options = {}) {
    let date = new Date;
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.root = document.getElementById(rootId);
    this.options= options;
  },

  show:function(year=null, month=null) {
    year = year || this.year;
    month = month || this.month;
    let data = new todoListData();

    this.listStatistacs = data.getStatistics(year, month)
    this.root.innerHTML = this.calendarDom(year, month);

    this.bindEvent('next-month-btn', this.nextMoth);
    this.bindEvent('pre-month-btn', this.preMoth);

    let dayColums = document.getElementsByClassName('day-column');

    for(i = 0; i < dayColums.length; i++) {
      dayColums[i].addEventListener('click', this.dayClick)
    }

    list.show({data: data.getData(this.year, this.month, this.day), year: this.year, month: this.month, day: this.day})
  },

  getDayEnglish:function(weeDay) {
    let arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return arr[weeDay];
  },

  operaterDom:function(year, month) {
    let dom = `
      <span class="pre" id="pre-month-btn" data-year="${year}" data-month="${month}">上一月</span>
      <span class="month">${year}年${month}月</span>
      <span class="next" id="next-month-btn" data-year="${year}" data-month="${month}">下一月</span>
    `
    return dom;
  },

  monthDayDom:function(year, month) {
    let daysArr   = Window.getMonthDays(year, month);
    let firstDay  = Window.getWeekDay(year, month);
    let thisYear  = Window.getThisYear();
    let thisMonth = Window.getThisMonth();
    let thisDay   = Window.getToday();
    let itemTotal = 42;
    for(i = 1; i < firstDay; i++) {
      daysArr.unshift('')
    }

    if (daysArr.length < 29) {
      itemTotal = 28;
    } else if (daysArr.length < 36) {
      itemTotal = 35;
    }

    let owe = itemTotal - daysArr.length
    for(i = 0; i < owe; i++) {
      daysArr.push('')
    }

    let monthHtml = '';
    let columnsDom = '';
    daysArr.forEach((item, i) => {
      index = i + 1;

      let toDayClass = '';
      let key = year+"-"+Window.PrefixInteger(month, 2)+"-"+Window.PrefixInteger(item, 2)
      let listCount = this.listStatistacs[key]

      if (thisYear === year && thisMonth === month && thisDay === item) {
        toDayClass = 'today';
      }

      let weekDayClass = (index % 7 === 0 || (index + 1) % 7 === 0) ? 'week-day' : '';
      let dataDay = !!item ? ''+year+'-'+month+'-'+item : ''
      let dayColumClass = !!item ? 'day-column' : ''
      columnsDom += `<div class="column ${dayColumClass} ${toDayClass} ${weekDayClass}" data-day="${dataDay}">
        <span class="todo-list-count">${!!listCount && listCount != 0 ? listCount : ''}</span>
        ${item}
      </div>`

      if ((index % 7 === 0) || index === daysArr.length) {
        let rowDom = `<div class="row month">${columnsDom}</div>`;
        monthHtml += rowDom;
        columnsDom = '';
      }
    })

    return monthHtml;
  },

  calendarDom:function(year, month) {
    let weekDaysStr = '一二三四五六日';
    let weekDaysArr = weekDaysStr.split('');
    let weekDaysDom = '<div id="week-row" class="row week">';
    weekDaysArr.forEach((item, index) => {
      let itemHtml = `
        <div class="column ${this.getDayEnglish(index)}">${item}</div>
      `
      weekDaysDom += itemHtml;
    })

    weekDaysDom += '</div>'

    let dom = `
      <div class="head">${this.operaterDom(year, month)}</div>
      <div id="calendar-content" class="content">${weekDaysDom + this.monthDayDom(year, month)}</div>
    `
    return dom;
  },

  bindEvent:function(btnId, handlerMethod) {
    document.getElementById(btnId).addEventListener("click", handlerMethod.bind(this))
  },

  nextMoth:function (e) {
    let year  = e.target.getAttribute('data-year');
    let month = e.target.getAttribute('data-month');
    year = parseInt(year)
    month = parseInt(month)

    if (month > 11) {
      month = 1;
      year = year + 1;
    } else {
      month = month + 1;
    }

    this.show(year, month);
  },

  preMoth:function(e) {
    let year  = e.target.getAttribute('data-year');
    let month = e.target.getAttribute('data-month');
    year = parseInt(year)
    month = parseInt(month)

    if (month < 2) {
      month = 1;
      year = year - 1;
    } else {
      month = month - 1;
    }

    this.show(year, month);
  },

  dayClick:function(e) {
  },
  clear:function() {
    this.root.innerHTML = ''
  }
}

// let calendar = new Calendar('calendar');
// calendar.show()