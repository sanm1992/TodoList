(function($) {
  // 1.为了获得每个月的日期有多少，我们需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
  const isLeapYear = (year) => {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
  };

  // 2.获得每个月的日期有多少，注意 month - [0-11]
  const getMonthDays = (year, month) => {
    month -= 1;
    let arr = [
      31, null, 31, 30, 
      31, 30, 31, 31,
      30, 31, 30, 31
    ];
    let count = arr[month] || (isLeapYear(year) ? 29 : 28);
    return Array.from(new Array(count), (item, value) => value + 1);
  };
  
  // 3.获取某天是周几
  const getWeekDay = (year, month, day=null) => {
    let _day = day || 1
    let date = new Date(year, month - 1, _day);
    let weeDays = [7, 1, 2, 3, 4, 5, 6]
    return weeDays[date.getDay()];
  }
  // 4.获取今天是几号
  const getToday = () => {
    let date = new Date;
    return date.getDate();
  }

  // 5.获取今年是哪年
  const getThisYear = () => {
    let date = new Date;
    return date.getFullYear();
  }

  // 6.获取今月是哪月
  const getThisMonth = () => {
    let date = new Date;
    return date.getMonth() + 1;
  }
  // 7.获取今天是几号
  const getThisDay = () => {
    let date = new Date;
    return date.getDate();
  }
  // 8.获取今天完整日期
  const getThisDate = (splitStr='--') => {
    let date = new Date;
    return ''+date.getFullYear()+splitStr[0]+(date.getMonth() + 1)+splitStr[1]+date.getDate()+(splitStr[2] || '');
  }

  // 9.获取明天的日期信息
  const getTomorrow = (year, month, day) => {
    let thisMonthCount = getMonthDays(year, month).size
    let _day = day
    let _month = month
    let _year  = year

    if(day + 1 > thisMonthCount) {
      _day = 1
      _month = _month + 1
    } else {
      _day = day + 1
    }

    if (_month > 12) {
      _month = 1
      _year  = _year + 1
    }

    return {year: _year, month: _month, day: _day, week: getWeekDay(_year, _month, _day)}
  }
  // 10.获取前天的日期信息
  const getYesterday = (year, month, day) => {
    let _day = day
    let _month = month
    let _year  = year
    let needNewDay = false

    if (_day - 1  < 1) {
      _month = _month - 1
      needNewDay = true
    } else {
      _day = _day - 1
    }

    if (_month < 1) {
      _month = 12
      _year = _year - 1
    }

    if (needNewDay) {
      _day = getMonthDays(_year, _month).size
    }

    return {year: _year, month: _month, day: _day, week: getWeekDay(_year, _month, _day)}
  }
  // 获取时间戳
  const getStamp = () => {
    return (new Date()).valueOf()
  }

  $.getWeekDay = getWeekDay;
  $.getMonthDays = getMonthDays;
  $.isLeapYear = isLeapYear;
  $.getToday = getToday;
  $.getThisYear = getThisYear;
  $.getThisMonth = getThisMonth;
  $.getThisDay = getThisDay;
  $.thisDate = getThisDate;
  $.getStamp = getStamp;
  $.getTomorrow = getTomorrow;
  $.getYesterday = getYesterday;
})(Window);

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
    this.listStatistacs = data.getStatistics(this.year, this.month)
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
      let listCount = this.listStatistacs[year+"-"+month+"-"+item]

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