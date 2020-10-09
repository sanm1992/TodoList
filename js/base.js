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
  // 整型转字符串, 前置填充
  const PrefixInteger = function(num, len, fill="0") {
    return (Array(len).join(fill) + num).slice(-len);
  }

  $.PrefixInteger = PrefixInteger;
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