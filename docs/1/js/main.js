window.addEventListener('DOMContentLoaded', (event) => {
    const bsky = new BlueSky();
    const names = 'handle appPw message post result profile'.split(' ');
    const [handle,appPw,message,post,result,profile] = names.map(n=>document.querySelector(`[name="${n}"]`));
    handle.addEventListener('input', async(e)=>{
        profile.setAttribute('href', `https://bsky.app/profile/${e.target.value}`);
        profile.textContent = e.target.value;
        post.disabled = ![e.target,appPw].every(el=>0 < el.value.length);
//        if ([e.target,appPw].every(el=>0 < el.value.length)) {post.disabled=false}
    });
    appPw.addEventListener('input', async(e)=>{
//        if ([handle,e.target].every(el=>0 < el.value.length)) {post.disabled=false}
        post.disabled = ![e.target,appPw].every(el=>0 < el.value.length);
    });
    post.addEventListener('click', async(e)=>{
        bsky.handle = handle.value;
        bsky.appPw = appPw.value;
        const succeed = await bsky.post(message.value);
        result.textContent = succeed ? '成功しました' : '失敗しました';
        result.style.color = succeed ? 'green' : 'red';
    });
    handle.dispatchEvent(new Event('input'));
    handle.focus();
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

