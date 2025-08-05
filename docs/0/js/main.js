window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    /*
    const author = 'ytyaru';
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/JS.BlueSky.API.post.20250805153030/`}, 'BlueSky.API.post')),
        van.tags.p(''),
//        van.tags.p('
'),
    );
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make());

    const a = new Assertion();
    a.t(true);
    a.f(false);
    a.e(TypeError, `msg`, ()=>{throw new TypeError(`msg`)});
    a.fin();
    */
    const bsky = new BlueSky();
    const names = 'handle appPw message post result'.split(' ');
    const [handle,appPw,message,post,result] = names.map(n=>document.querySelector(`[name="${n}"]`));
    post.addEventListener('click', async(e)=>{
        bsky.handle = handle.value;
        bsky.appPw = appPw.value;
        const succeed = await bsky.post(message.value);
        result.textContent = succeed ? '成功しました' : '失敗しました';
        result.style.color = succeed ? 'green' : 'red';
    });
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

