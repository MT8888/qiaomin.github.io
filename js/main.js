let Main = function (o) {
    Object.assign(this, o);
    this.init();
}
Main.prototype = {
    constructor: Main,
    init: function () {
        this.render();
        this.addEvent();
    },
    render: function () {
        document.querySelector('.main').innerHTML = data.map(function (e) {
            return `
        <div class="main-item">
            <div class="logoC">
                <img src="${e.img}" alt="">
                ${e.num? "<span>" + e.num+"</span>" : ""}
            </div>
            <div class="msgC">
                <h4 class="${e.ding?"col":""}">${e.name}</h4>
                <p>${e.msg}</p>
            </div>
            <div class="timeC">
                <span>${e.time}</span>
            </div>
        </div>`
        }).join('');
    },
    addEvent: function () {
        this.myBtn.onclick = () => {
            new this.key({});
        }
    },
    addAlert: function () {
        var div = document.createElement('div');
        div.classList.add('start');
        div.innerHTML = `
            <i class="iShow"></i>
            正在加载
        `
        setTimeout(() => {
            div.classList.remove('show')
            setTimeout(() => {
                div.remove();
                //跳转页面
            }, 500);
        }, 1000);
        document.body.appendChild(div);
        div.classList.add('show');
    }
}