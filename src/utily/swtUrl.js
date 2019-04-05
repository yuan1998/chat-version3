const getSwtUrl = (e = '' , url , data) => {
    if (typeof (openZoosUrl_UserDefine) == 'function') {
        if (openZoosUrl_UserDefine()) return;
    }
    if (typeof (LR_istate) != 'undefined') {
        LR_istate = 3;
    }
    var lr_url1 = url;
    if (typeof (LR_opentimeout) != 'undefined' && typeof (LR_next_invite_seconds) != 'undefined') LR_next_invite_seconds = 999999;
    if (url == 'sendnote') {
        url = LR_sysurl + 'LR/Chatwin2.aspx?siteid=' + LR_websiteid + '&cid=' + LR_cid + '&sid=' + LR_sid + '&lng=' + LR_lng + '&p=' + escape(location.href) + lr_refer5238();
    } else {
        url = ((LR_userurl0 && typeof (LR_userurl) != 'undefined') ? LR_userurl : (LR_sysurl + 'LR/Chatpre.aspx')) + '?id=' + LR_websiteid + '&cid=' + LR_cid + '&lng=' + LR_lng + '&sid=' + LR_sid + '&p=' + escape(location.href) + lr_refer5238();
    }
    if (LR_ssl && url.charAt(4) == ':') url = url.substring(0, 4) + 's' + url.substring(4, url.length);
    if (!data) {
        if (typeof (LR_explain) != 'undefined' && LR_explain != '') {
            url += '&e=' + escape(escape(LR_explain));
        } else if (typeof (LiveAutoInvite1) != 'undefined') {
            url += '&e=' + escape(escape(LiveAutoInvite1));
        }
    }
    if (e) {
        url += '&e=' + escape(escape(e));
    }
    if (typeof (LR_username) != 'undefined') {
        url += '&un=' + escape(LR_username);
    }
    if (typeof (LR_userdata) != 'undefined') {
        url += '&ud=' + escape(LR_userdata);
    }
    if (typeof (LR_ucd) != 'undefined') {
        url += '&ucd=' + escape(LR_ucd);
    }
    url += '&msg=' + escape(LR_msg);
    if (data) url += data;
    url += '&d=' + new Date().getTime();
    if (typeof (LR_imgint) != 'undefined') url += '&imgint=' + LR_imgint;
    if (lr_url1 == 'fchatwin') {
        LR_ClientEnd    = 0;
        window.location = url + '&f=1';
        return;
    }
    if (LR_sidexists != 2 && LiveReceptionCode_isonline && lr_url1 != 'bchatwin' && typeof (LR_pm003) != 'undefined' && LR_pm003 == 1 && !LR_pm010) {
        LR_HideInvite();
        LR_istate = 1;
        LR_showminiDiv();
        lrminiMax();
        return;
    }
    LR_ClientEnd = 0;
    return url;
    // window.location = url;
};

export default getSwtUrl;
