const getExp1Hour = (): number => {
  return Math.floor((Date.now() / 1000) + (60 * 60)); // 1 hr
};
const getExp7Days = (): number => {
  return Math.floor((Date.now() / 1000) + (60 * 60 * 24 * 7)); // 7 d
};

export { getExp1Hour, getExp7Days };
