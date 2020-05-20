import querystring from "querystring";

export const encode = (obj) => {
  return "?" + querystring.encode(obj);
};

export const decode = (str) => {
  return querystring.decode(str.slice(1));
};
