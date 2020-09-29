let list = (function() {
  let show = function(options = {}) {
    let {
      page = 1,
      per = 20,
      data = {},
      day = null,
      month = null,
      year  = null
    } = options

    // <span class="item pre-btn">昨天</span>
    // <span class="item next-btn">明天</span>
    let options_html = `
      <div class="list-operation">
        <span id="list-today" class="item today" data-year=${year} data-month=${month} data-day=${day} >${year}年${month}月${day}</span>
        <span id="list-all-btn" class="item list-all-btn">全部</span>
        </div>
    `

    let html = ''
    if(!!data) {
      Object.values(data).forEach((item, index) => {
        let itemHtml = `
          <li>${itemHtmlHandler(item, year, month, day)}</>
        `
        html += itemHtml
      })
    }

    document.getElementById('list-content').innerHTML = options_html + html;

    addBtnHtml = `
      <div class='add-row'><span class='add-btn'>添加</span></div>
    `
    document.getElementById('add-content').innerHTML = addBtnHtml;
    // bindEvents('edit-btn', editItem);
    bindEvents('destroy-btn', destroyItem);
    bindEvents('mark-complete', markComplete);
    bindEvents('add-btn', newItem);
    bindEvents('list-all-btn', showAll)
  };

  let bindEvents = function(btnClass, handlerMethod) {
    if(!btnClass || !handlerMethod) {return ; }
  
    let btns = document.getElementsByClassName(btnClass);
    let btns_len = btns.length;

    for(i = 0; i < btns_len; i++) {
      btns[i].removeEventListener('click', handlerMethod)
      btns[i].addEventListener('click', handlerMethod)
      // btns[i].onclick = handlerMethod;
    }
  }

  let destroyItem = function(ev) {
    let id = ev.target.parentNode.dataset.id
    let listDate = ev.target.dataset

    if (!id) {
      this.parentNode.parentNode.remove()
      return
    }

    if(!confirm("确定删除?")) {
      return
    }

    let ListData = new todoListData()
    let deleteState = ListData.deleteData(id, listDate.year, listDate.month, listDate.day)

    if (deleteState) {
      this.parentNode.parentNode.remove()
    }
  };

  let editItem = function() {
    
  };

  let saveItem = function(ev) {
    let newIteminput = this.parentNode.previousElementSibling.firstElementChild
    let newItemContent = newIteminput.value

    let id = Window.getStamp();
    let listDate = document.getElementById('list-today').dataset

    if (!newItemContent) {
      // newIteminput.style.borderColor = 'red'
      newIteminput.placeholder = '不能为空'
      return
    }

    let data = {
      id: id,
      content: newItemContent,
      state: 0
    }

    let ListData = new todoListData()
    ListData.setData(data, listDate.year, listDate.month, listDate.day)

    ev.target.parentNode.parentNode.innerHTML = itemHtmlHandler(data, listDate.year, listDate.month, listDate.day)
    bindEvents('edit-btn', editItem);
    bindEvents('destroy-btn', destroyItem);
    bindEvents('mark-complete', markComplete);
  }

  let newItem = function() {
    let itemHtml = `
      <div id='new-content' class="content"><input id="new-input" class='new-input' type='text'/> </div>
      <div class="operation-btns">
        <span class='btn new-item-save-btn'>保存</span>
        <span class='btn new-item-destroy-btn'>取消</span>
      </div>
    `

    let itemNode = document.createElement("LI");
    itemNode.innerHTML = itemHtml;
    document.getElementById('list-content').appendChild(itemNode)
    bindEvents('new-item-destroy-btn', destroyItem)
    bindEvents('new-item-save-btn', saveItem)
  };

  let itemHtmlHandler = function(itemDate = {}, year, month, day) {
    let operationBtns = '';
    ['删除'].forEach((item, index) => {
      let btnClass = 'destroy-btn';
      let btn = `<span class='btn ${btnClass}' data-year=${year} data-month=${month} data-day=${day}>${item}</span>`;
      operationBtns += btn;
    })

    let itemHtml = `
      <div class='checkbox'>
        <input ${itemDate.state == 1 ? 'checked=checked' : ''} type='checkbox' class='mark-complete' value=${itemDate.id} data-year=${year} data-month=${month} data-day=${day}>
      </div>
      <div class='content' style='${itemDate.state == 1 ? 'text-decoration:line-through' : ''}' >${itemDate.content}</div>
      <div class='operation-btns' data-id=${itemDate.id}>${operationBtns}</div>
    `
    return itemHtml
  }

  let markComplete = function(ev) {
    let state = 0
    if(this.checked) {
      this.parentNode.parentNode.getElementsByClassName('content')[0].style.setProperty('text-decoration', 'line-through')
      state = 1
    } else {
      this.parentNode.parentNode.getElementsByClassName('content')[0].style.setProperty('text-decoration', 'none')
      state = 0
    }
    let dataId = this.value
    let ListData = new todoListData()
    let listDate = ev.target.dataset
  
    ListData.updateData(dataId, {state: state}, listDate.year, listDate.month, listDate.day)
  };

  let showAll = function() {
    let ListData = new todoListData()
    let allData = ListData.getData()
    timeLineShow(allData)
  }

  let timeLineShow = function(allData = {}) {
    let html = ''

    Object.keys(allData).forEach((item, index) => {
      let dateInfo = item.split("-")

      if (Object.values(allData[item]).length == 0) {
        return
      }

      let options_html = `
        <div class="list-operation">
          <span id="" class="item today list-today" data-year=${dateInfo[0]} data-month=${dateInfo[1]} data-day=${dateInfo[2]} >${dateInfo[0]}年${dateInfo[1]}月${dateInfo[2]}</span>
        </div>
      `

      html = html + options_html + dayShow(allData[item], dateInfo[0], dateInfo[1], dateInfo[2])
    })

    document.getElementById('list-content').innerHTML = html
    document.getElementById('add-content').innerHTML = ''

    bindEvents('destroy-btn', destroyItem);
    bindEvents('mark-complete', markComplete);
    return
  }

  let dayShow = function(data = {}, year, month, day) {
    let html = ''
    Object.values(data).forEach((item, index) => {
      let itemHtml = `
          <li>${itemHtmlHandler(item, year, month, day)}</li>
        `
      html += itemHtml
    })
    return html
  }

  return {
    show: show
  }
})();

// let data = [
//   {id: 1, content: '这是第一个任务'},
//   {id: 1, content: '这是第二个任务'}
// ]
// list.show({data: data})