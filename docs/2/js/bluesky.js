(function(){
class BlueSky {
    constructor(){this._={}}
    set handle(v) {if (Type.isStr(v) && 0 < v.length){this._.handle=v}}
    set appPw(v) {if (Type.isStr(v) && 0 < v.length){this._.appPw=v}}
    async #createSession() {
        console.log(this._)
        const res = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                identifier: this._.handle,
                password: this._.appPw
            })
        });
        console.log(res)
        if (200===res.status) {
            const json = await res.json();
            console.log(json)
            const sessionData = json;
            console.log('✅ Blueskyログイン成功！');
            return sessionData.accessJwt;
        } else {throw new Error(`ログイン失敗`, res);}
    }
    async post(message) {
        try {
            const accessJwt = await this.#createSession();
            const res = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessJwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    repo: this._.handle,
                    collection: 'app.bsky.feed.post',
                    record: {
                        text: message,
                        createdAt: new Date().toISOString()
                    }
                })
            });
            return 200 === res.status;
        } catch (error) {
            console.error('❌ 投稿エラー:', error);
            return false;
        }
    }
}
window.BlueSky = BlueSky;
})();
