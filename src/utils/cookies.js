// 액세스 토큰을 쿠키에 저장
function saveAccessTokenToCookie(value) {
  // document.cookie = `til_auth=${value}`;
  document.cookie = `til_auth=${value}; path=/; expires=${new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
  ).toUTCString()}; SameSite=Lax;`;
}
// 사용자 이메일을 쿠키에 저장
function saveUserToCookie(value) {
  // document.cookie = `til_user=${value}`;
  document.cookie = `til_user=${value}; path=/; expires=${new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
  ).toUTCString()}; SameSite=Lax;`;
}
// 리프레시 토큰을 쿠키에 저장
function saveRefreshTokenToCookie(value) {
  // document.cookie = `til_refresh=${value}`;
  document.cookie = `til_refresh=${value}; path=/; expires=${new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
  ).toUTCString()}; SameSite=Lax;`;
}

// 쿠키에서 액세스 토큰을 가져옴
function getAccessTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

// 쿠키에서 사용자 이메일을 가져옴
function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

// 쿠키에서 리프레시 토큰을 가져옴
function getRefreshTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_refresh\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

// 쿠키 삭제
function deleteCookie(name, path = '/', domain = window.location.hostname) {
  // const domain = window.location.hostname;
  document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;`;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;`;
}

export {
  saveAccessTokenToCookie,
  saveUserToCookie,
  saveRefreshTokenToCookie,
  getAccessTokenFromCookie,
  getUserFromCookie,
  getRefreshTokenFromCookie,
  deleteCookie,
};
