// 配列の全順列を生成する関数
export const generatePermutations = (arr) => {
  if (arr.length === 0) return [[]];
  const firstEl = arr[0];
  const rest = arr.slice(1);
  const permsWithoutFirst = generatePermutations(rest);
  const allPermutations = [];
  permsWithoutFirst.forEach(perm => {
    for (let i = 0; i <= perm.length; i++) {
      const permWithFirst = [...perm.slice(0, i), firstEl, ...perm.slice(i)];
      allPermutations.push(permWithFirst);
    }
  });
  return allPermutations;
};

// 配列をシャッフルする関数
export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};