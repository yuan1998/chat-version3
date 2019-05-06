import Cookie                      from 'js-cookie';
import { queryOf, getUrlParamter } from '@/utily/util'
import getSwtUrl                   from "./swtUrl";
import { getReferrer }             from "./referrer";

class Bridge {

    /**
     * 在 iFrame 未加载之前,发送的消息将会被缓存在这里.
     * @type {Array}
     */
    messageBox = [];

    /**
     * 缓存iFrame
     * @type {null}
     */
    iFrame = null;

    /**
     * 缓存 iFrame.window
     * @type {null}
     */
    ifWindow = null;

    constructor(options) {

        /**
         * load 结束时触发
         */
        this.loadedCallback = options.loadedCallback;

        /**
         * 每次有消息回传时触发.
         * @type {undefined|function}
         */
        this.messageCallback = options.messageCallback;

        /**
         * 快商通聊天 标签
         */
        this.tagText = options.tag || '';

        // send Text
        this.text = options.text || '';

        /**
         * 是否保存 iframe 元素. 如果为一次性 则传入该参数.
         * 参数为字符串 'stop'
         * @type {*|boolean}
         */
        this.startChat = options.start;

        if (options.make) {
            return this.makeUrl(true)
        }
    }

    makeUrl(make) {
        let item = CONFIG.TYPE_OPTION;
        if (!item || !item.type) {
            console.warn('[Error] Create Bridge Option Not Exist !');
            return;
        }

        if (typeof this[ `${item.type}UrlGenerate` ] === 'function') {
            let url = this[ `${item.type}UrlGenerate` ](item);
            return make ? this.createIFrame(url) : url;
        }
        else {
            throw new Error("[Bridge Error] Generate Url Method Not Exist!");
        }

    }

    kstUrlGenerate(item) {
        let params = getUrlParamter(item.url);
        let cas    = params[ 'cas' ];
        cas        = cas && Cookie.get(`${cas}_KS_${cas}`);

        let query = {
            dp   : encodeURIComponent(window.location.href),
            sText: encodeURIComponent(this.tagText),
            vi   : (cas && decodeURI(cas[ 2 ])) || '',
            ref  : getReferrer(),
            ism  : 1
        };

        if (this.text) {
            query.cv = this.text;
        }

        query = queryOf(query);
        return `${item.url}&${query}`;

        // return make ? this.createIFrame(url) : url;
    }

    swtUrlGenerate() {
        if (typeof openZoosUrl !== 'function') {
            throw new Error('[Error Bridge] Generate swt Url not Found Method `openZoosUrl`');
        }

        return getSwtUrl(this.tagText, this.text);

        // return make ? this.createIFrame(url) : url;
    }

    /**
     * 创建 Iframe 元素 . 手动调用 或者 在 makeKstUrl 后调用
     * @param url 快商通 窗口链接.
     * @returns {Bridge} 返回this;
     */
    createIFrame(url) {
        const el = $('<iframe>')
            .attr('src', url)
            .attr('id', 'y-iframe')
            .attr('frameborder', 0)
            .attr('style', 'display:none;height:500px;')
            .attr('scrolling', 'no');

        el.appendTo($('body'));
        el.on('load', (evt) => {
            if (typeof this.loadedCallback === 'function') {
                this.loadedCallback(evt);
            }
            this.startChat !== 'stop' && this.saveIframe(evt.target);
        });
        return this;
    };

    /**
     * 保存 iframe 元素. 在 iframe load 后调用
     * @param iframe
     */
    saveIframe(iframe) {
        this.iFrame = iframe;
        this.addMessageEvent();
        this.postMessageToChild({ start: true });

        (this.messageBox || []).forEach((item) => {
            this.postMessageToChild(item);
        })
    };

    /**
     * 发送消息到子页面.
     * @param data
     */
    postMessageToChild(data) {
        if (typeof data === 'string') {
            data = {
                sendMessage: data
            }
        }

        if (this.iFrame) {
            data.isThisData = true;
            this.iFrame.contentWindow.postMessage(data, '*');
        }
        else {
            this.messageBox.push(data);
        }
    };

    /**
     * 添加 Message 事件,监听子页面回传的数据
     */
    addMessageEvent() {
        window.addEventListener("message", (evt) => {
            this.receiveMessageFromIframePage(evt);
        }, false);
    };

    /**
     * 解析子页面回传的数据,一般在message事件触发后调用
     * @param event
     */
    receiveMessageFromIframePage(event) {
        const data = event.data;
        if (!(data && data.isThisData)) {
            return;
        }

        if (data.message) {
            if (!data.message || data.message.length === 0) {
                console.info(" Not Change");
            }
            else {
                if (typeof this.messageCallback === 'function')
                    this.messageCallback(data.message, event);
                console.log("data.message :", data.message);
            }
        }
    };
}

export default Bridge;
