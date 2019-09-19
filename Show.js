function Show(o) {
    this.data = o.data
    this.ul = document.querySelector(o.ul)
    this.xinxi = document.querySelector(o.xinxi)
    this.box = document.querySelector(o.box)
    this.name = document.querySelector(o.name)
    this.xix = document.querySelector(o.xix)
    this.box2 = document.querySelector(o.box2)
    this.active = o.active
    this.ind = o.ind
    console.log(this.btn)
    this.init()
}
Show.prototype = {
    constructor: Show,
    init: function () {
        console.log(this.data)
        this.Reader()
        this.readXinxi(0)
        this.addEvent()
    },
    Reader: function () { //渲染ul
        this.ul.innerHTML = this.data.map(function (e, i) {
            return `<li style = "background:url(${e.src});" ind = ${i}></li>`
        }).join("")
    },
    addEvent: function () { //添加事件公用方法
        var that = this
        this.ul.onclick = function (e) { //事件委托给li绑定事件
            var tar = e.target
            if (tar.tagName === "LI") {

                that.tabCla(tar)
                that.readXinxi(tar.getAttribute("ind"))
                inds = tar.getAttribute("ind")
            }
        }

        this.xinxi.onclick = function (e) { //事件委托给btn绑定事件
            var tar = e.target
            if (tar.id === "btn") {
                that.box.style.display = "none"
                that.box2.style.display = "block"
                that.xix.innerHTML = `
                <p style="background: url(${that.data[inds].src})"></p>
                <li><span>影院:</span>${that.data[inds].name}</li>
                <li><span>影厅:</span>${that.data[inds].dizhi}</li>
                <li><span>票价</span><span id="danjia">${that.data[inds].mon}</span></li>
                `
            }
        }
    },
    readXinxi: function (ind) { //渲染下边信息列表
        this.name.innerHTML = this.data[ind].name
        this.xinxi.innerHTML = `
        <span>${this.data[ind].time}</span>
        <span>${this.data[ind].yy}</span>
        <span>${this.data[ind].mon}</span>
        <button id = "btn">选座购票</button>
        `
    },
    tabCla: function (tar) { //封装切换Li样式的方法
        var that = this;
        [...this.ul.children].forEach(function (e) {
            e.classList.remove(that.active)
        })
        tar.classList.add(this.active)
        tar.parentNode.style.background = tar.style.background
    }
}