let todoListData = function() {
  this.init();
}

todoListData.prototype = {
  init:function() {
    this.keyName = 'TodoList';
  },

  getData:function(year=null, month=null, day=null) {
    let data = localStorage.getItem(this.keyName);
    if (!data) {
      return {};
    }
    data = JSON.parse(data)

    if (!year || !month || !day) {
      return this.sortData(data, 'desc')
    }
    let key = this.formatKey(year, month, day)
    return  this.sortData(data[key], 'desc')
  },
  getStatistics:function(year, month, day=null) {
    let data = localStorage.getItem(this.keyName);
    data = JSON.parse(data) || {}
    if (day) {
      let key = this.formatKey(year, month, day)
      let count = Object.keys(data[key]).length
      return { date: key, count: count }
    } else {
      let days = Window.getMonthDays(year, month).length
      let rtn = {}
      for( var i = 1; i < days+1; i++) {
        let key = this.formatKey(year, month, i)
        if (data[key]) {
          rtn[key] = Object.keys(data[key]).length
        } else {
          rtn[key] = 0
        }
      }

      return rtn
    }
  },
  setData:function(data, year, month, day) {
    let oldData = JSON.parse(localStorage.getItem(this.keyName));
    if (!oldData) {
      oldData = {}
    }
    let key = this.formatKey(year, month, day)
    if (!oldData[key]) {
      oldData[key] = {}
    } 
    oldData[key][data.id] = data
    localStorage.setItem(this.keyName, JSON.stringify(oldData));
    return oldData
  },
  deleteData:function(dataId, year=null, month=null, day=null) {
    let key = this.formatKey(year, month, day)
    let data = JSON.parse(localStorage.getItem(this.keyName));

    if(!data || !data[key]){
      return false
    }
    
    delete(data[key][parseInt(dataId)])
    localStorage.setItem(this.keyName, JSON.stringify(data));

    return true
  },

  updateData:function(dataId, updateOptions, year, month, day) {
    let key = this.formatKey(year, month, day)
    let data = JSON.parse(localStorage.getItem(this.keyName));

    if(!data || !data[key]){
      return false
    }

    let itemData = data[key][parseInt(dataId)]
    if (!itemData) {
      return false
    }
    datakeys = Object.keys(itemData)
    updateOptionskeys = Object.keys(updateOptions)

    let intersection = datakeys.filter(v => updateOptionskeys.includes(v))
    intersection.forEach((k, _) => {
      itemData[k] = updateOptions[k]
    })

    data[key][parseInt(dataId)] = itemData
    localStorage.setItem(this.keyName, JSON.stringify(data))
  },

  sortData:function(data = {}, direction = 'asc') {
    let keys = Object.keys(data)
    let newData = {}
    keys = keys.sort((item1, item2) => {
      if(direction == 'desc') {
        if(item1 >item2) {
          return -1
        } else {
          return 1
        }
      } else {
        if (item1 >item2) {
          return 1
        } else {
          return -1
        }
      }
    })

    for(var i=0; i<keys.length; i++) {
      let key = keys[i]
      newData[key] = data[key]
    } 
    return newData
  },

  formatKey:function(year, month, day) {
    let _month = Window.prefixInteger(month, 2)
    let _day = Window.prefixInteger(day, 2)

    return year+"-"+_month+"-"+_day
  }
}
// Window.todoListData = todoListData