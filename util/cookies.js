// import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const setProfileCookie = (value) =>  setCookie({key: 'profile', value});
export const getProfileCookie = () =>  getCookieFromBrowser('profile');
export const removeProfileCookie = () =>  removeCookie('profile');

export const setCartTokenCookie = (value) =>  setCookie({key: 'cartToken', value});
export const getCartTokenCookie = () =>  getCookieFromBrowser('cartToken');
export const removeCartTokenCookie = () =>  removeCookie('cartToken');

export const setCookie = ({key, value = '', expiration, domain = null, path = '/'} = {}) => {
  let expires;
  if (expiration) {
    const cookieDate = new Date();
    // cookieDate.setTime(cookieDate.getTime() + expiration);
    cookieDate.setTime(expiration);
    expires = cookieDate;
  }

  if (process.browser) {
    cookie.set(key, value, {
      expires,
      domain,
      path
    });
  }
};

export const removeCookie = (key, {domain, path = '/'} = {}) => {
  if (process.browser) cookie.remove(key, {domain, path})
};


export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
  return cookie.get(key) ?? null;
};

const getCookieFromServer = (key, req) => {
  if(!req) return null;
  if (!req.headers.cookie) {
    return null;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return null;
  }
  return rawCookie.split('=')[1];
};
