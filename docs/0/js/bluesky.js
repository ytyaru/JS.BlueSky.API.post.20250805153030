(function(){
class BlueSky {
    constructor(){this._={}}
    /*
    constructor(handle, appPw) {
        if (![handle, appPw].every(s=>Type.isStr(s) && 0 < s.length)) {throw new TypeError(`BlueSkyのハンドルとアプリパスワードを入力してください。`)}
        this._ = {handle:handle, appPw:appPw}
    }
    */
    set handle(v) {if (Type.isStr(v) && 0 < v.length){this._.handle=v}}
    set appPw(v) {if (Type.isStr(v) && 0 < v.length){this._.appPw=v}}
    async #createSession() {
        console.log(this._)
        const res = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            payload: JSON.stringify({
                identifier: this._.handle,
                password: this._.appPw
            })
        });
        console.log(res)
//        if (res.getResponseCode() === 200) {
        if (200===res.status) {
            //const sessionData = JSON.parse(res.getContentText());
            const json = await res.json();
            console.log(json)
            //const sessionData = JSON.parse(json);
            const sessionData = json;
            console.log('✅ Blueskyログイン成功！');
            return sessionData.accessJwt;
        } else {throw new Error(`ログイン失敗`, res);}
        //} else {throw new Error(`ログイン失敗: ${res.getContentText()}`);}
        /*
        catch (error) {
            console.error('❌ セッション作成エラー:', error);
            throw error;
        }
        */
    }
    async post(message) {
        try {
            const accessJwt = await this.#createSession();
            const response = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessJwt}`,
                    'Content-Type': 'application/json'
                },
                payload: JSON.stringify({
                    repo: this._.handle,
                    collection: 'app.bsky.feed.post',
                    record: {
                        text: message,
                        createdAt: new Date().toISOString()
                    }
                })
            });
            //return response.getResponseCode() === 200;
            return 200 === res.status;
        } catch (error) {
            console.error('❌ 投稿エラー:', error);
            return false;
        }
    }
}
window.BlueSky = BlueSky;
})();
