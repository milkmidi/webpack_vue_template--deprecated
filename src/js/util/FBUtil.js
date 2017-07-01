/**
 * @author milkmidi
 * @version 1.0.0
 */
let fbAppID;
let isInit = false;
let accessToken;
let userID;
function handleSessionResponse(res) {
  console.log(res);
  if (res.response.status === 'connected') {
    userID = res.authResponse.userID;
    accessToken = res.authResponse.accessToken;
    return true;
  }
  return false;
}
function fbAsyncInit() {
  FB.init({
    appId: fbAppID,
    xfbml: true,
    version: 'v2.6',
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(handleSessionResponse);
}

/**
 * @param {string} fbID
 */
export function init(fbID) {
  console.log('init', fbID);
  if (isInit) {
    return;
  }
  isInit = true;
  fbAppID = fbID;
    /* eslint-disable */
    window.fbAsyncInit = fbAsyncInit;
    (function (d, s, id) {
        var js,fjs = d.getElementsByTagName(s)[0];        
        if ( d.getElementById( id ) ) { return; }
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/zh_TW/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* eslint-enable */
}
/**
 * scripe
 * @param {string} url
 */
export function scrape(url) {
  return new Promise((resolve, reject) => {
    console.log('scrape', url);
    $.ajax({
      url: 'https://graph.facebook.com/',
      type: 'POST',
      data: { id: url, scrape: true },
            // data: { id: encodeURIComponent(url), scrape: true },
      success(res) {
        console.log(res);
        resolve();
      },
      fail(err) {
        console.log(err);
        reject();
      },
    });
  });
}

/**
 * fb share
 * @param {string} url
 */
export function share(url) {
  return new Promise((resolve) => {
    FB.ui(
      {
        method: 'share',
        href: url,
                mobile_iframe   : true, // eslint-disable-line
      },
            (response) => {
              console.log(response);
              resolve();
            },
        );
  });
}

/**
 * @param {string} link
 * @param {string} redirectUri
 */
export function redirectFeed(link, redirectUri) {
  const url = `https://www.facebook.com/dialog/feed?app_id=${fbAppID}&link=${link}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = url;
}
/**
 * @param {string} url share url
 */
export function sharer(url) {
  window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
}

/**
 * @param {string} scope
 * @return {Promise}
 */
export function login(scope) {
  return new Promise((resolve, reject) => {
    FB.login((res) => {
      const isFBLogin = handleSessionResponse(res);
      if (isFBLogin) resolve();
      else reject();
    }, { scope });
  });
}

export function getAccessToken() {
  return accessToken;
}
export function getUserID() {
  return userID;
}
