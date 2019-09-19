const Key = function (o) {
    Object.assign(this, o);
    this.init();
}
Key.prototype = {
    init: function () {
        this.render();
        this.addEvent();
    },
    render: function () {
        this.div = document.createElement('div');
        this.div.className = 'shopWrap';
        this.div.innerHTML = `
    <div class="header">
        <span class="header-left"><img src="./img/fanhui.png" />
            付款</span>
    </div>
    <div class="iptBox">
        <div class="msgTitle">
            <div class="left">
                <h3>付款给 仁和兴顺</h3>
                <p>老陈(*江)</p>
            </div>
            <div class="right">
                <img src="./img/canting.jpg" alt="">
            </div>
        </div>
        <div class="box">
            <p>金额</p>
            <div class="iptC" style="position: relative">
                <span>￥</span> <input type="text" placeholder="输入金额">
                <div class="iptC-wrap" style="position: absolute; top:0; left: 0; right: 0; bottom: 0;"></div>
            </div>
        </div>
    </div>
    <div class="keyC">
        <div class="title">
            添加备注
        </div>
        <div class="key">

            <div class="left">
                <button class="num">1</button>
                <button class="num">2</button>
                <button class="num">3</button>
                <button class="num">4</button>
                <button class="num">5</button>
                <button class="num">6</button>
                <button class="num">7</button>
                <button class="num">8</button>
                <button class="num">9</button>
                <button class="num">0</button>
                <button class="num">.</button>
            </div>
            <div class="right">
                <button class="delete"></button>
                <button class="submit">付款</button>
            </div>
        </div>
    </div>

        `
        this.ipt = this.div.querySelector('input')
        this.iptWrap = this.div.querySelector('.iptC-wrap')
        this.keyC = this.div.querySelector('.keyC')
        this.numS = this.div.querySelectorAll('.num')
        this.submit = this.div.querySelector('.submit')
        this.delete = this.div.querySelector('.delete')

        document.body.appendChild(this.div);
    },
    addEvent: function () {
        this.iptWrap.onclick = () => {
            this.keyC.classList.add('show');
        };

        [...this.numS].forEach((e) => {
            e.onclick = () => {
                this.submit.classList.add('col')
                e.classList.add('active');
                setTimeout(() => {
                    e.classList.remove('active');
                }, 50)
                this.ipt.value += e.innerHTML
            }
        });
        this.delete.onclick = () => {
            if (!this.ipt.value) {
                this.submit.classList.remove('col')
                return;
            }
            this.delete.classList.add('active');
            setTimeout(() => {
                this.delete.classList.remove('active');
            }, 50)
            var arr = this.ipt.value.split('');
            arr.length = arr.length - 1;
            this.ipt.value = arr.join('');
        }
        this.submit.onclick = () => {
            //跳转
            if (!this.ipt.value) {
                return;
            }
            this.addAlert(() => {
                this.keyC.classList.remove('show');
                this.addNewAlert();
            });
        }
    },
    addAlert: function (fn) {
        var div = document.createElement('div');
        div.classList.add('start');
        div.innerHTML = `
            <i class="iShow"></i>
            正在加载
        `
        setTimeout(() => {
            div.classList.remove('show')
            //跳转页面
            fn && fn();
            setTimeout(() => {

                div.remove();
            }, 200);
        }, this.random(800, 1000));
        document.body.appendChild(div);
        div.classList.add('show');
    },
    addNewAlert: function () {
        var div = document.createElement('div');
        div.classList.add('pos');
        div.innerHTML = `
        <div class="moreMsg">
            <div class="pos-title"><button class="delete"></button><button class="pass">使用密码</button></div>
            <div class="pos-msg">付款给仁和兴顺(*江)</div>
            <div class="pos-num"><sup>￥</sup>${(this.ipt.value*1).toFixed(2)}</div>
            <div class="pos-fangShi"><span>支付方式</span><span><i>￥</i>零钱 &gt;</span></div>
            <div class="pos-submitC"><button>确认支付</button></div>
        </div>
        `
        div.firstElementChild.children[0].firstElementChild.onclick = function () {
            div.remove();
        }
        div.firstElementChild.children[4].firstElementChild.onclick = () => {
            div.style.cssText = `background:transparent; transition:transform 0.5s; transform:scale(0)`
            setTimeout(() => {
                div.remove();
                this.addZhiFuAlert();
            }, 300);
        }
        document.body.appendChild(div);
    },
    addZhiFuAlert: function () { //支付弹窗
        var div = document.createElement('div');
        div.className = `zhiFuAlert`
        div.style.cssText = `   `
        div.innerHTML = `
            <i></i>
            <p><span></span><span></span><span></span></p>
        `
        var ind = 0;
        var timer = setInterval(() => {
            div.lastElementChild.children[ind].classList.remove('active');
            ind++
            if (ind === 3) {
                ind = 0
            }
            div.lastElementChild.children[ind].classList.add('active');
        }, 200);
        document.body.appendChild(div);
        setTimeout(() => {
            clearInterval(timer);
            div.remove();
            //跳转指纹
            this.addZhiWenAlert();
        }, this.random(1000, 1500));
    },
    addYesAlert: function () {
        var div = document.createElement('div')
        div.classList.add('yesAlert');
        div.innerHTML = `
        <div class="yesAlert-wrap">
            <i class="yes"></i>
            <p>支付成功</p>
            <h4><span>￥</span>${(this.ipt.value*1).toFixed(2)}</h4>
            <p>收款方</p>
            <i class="logo"></i>
            <p>仁和兴顺(*江)</p>
        </div>
        <a href="#"><button>完成</button></button>
        `
        document.body.appendChild(div);
        div.querySelector('button').onclick = function () {
            this.div.remove();
        }
        setTimeout(() => {
            div.classList.add('show');
        }, 100);
    },
    addZhiWenAlert: function () {
        var div = document.createElement('div');
        div.style.cssText = `
            position:fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            background:rgba(0,0,0,0.2);
            z-index:999;
        `
        div.innerHTML = `
            <div class="zhiWenAlert">
                <p><i>&nbsp;</i></p>
                <p><span></span></p>
                <p>请验证指纹</p>
            </div>
        `
        document.body.appendChild(div);



        setTimeout(() => {
            div.firstElementChild.classList.add("show");
        }, 10);

        setTimeout(() => {
            div.firstElementChild.classList.remove("show");

            setTimeout(() => {

                //跳转成功

                this.addAlert(() => {
                    div.remove();
                    this.addYesAlert();
                });
            }, 300);
        }, this.random(500, 800));
    },
    random: function (n, m) {
        return Math.random() * (m - n + 1) + n
    }
}