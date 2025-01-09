export const getDate = () => {
  const date = new Date();
  return `${
    (date.getDate()).toLocaleString().padStart(2, '0')
  }-${
    (date.getMonth() + 1).toLocaleString().padStart(2, '0')
  }-${
    date.getFullYear()
  }`;
};

export const getTime = () => {
  const date = new Date();
  return `${
    date.getHours()
  }-${
    date.getMinutes().toLocaleString().padStart(2, '0')
  }`;
};