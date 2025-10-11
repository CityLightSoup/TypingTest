const typingStrings1 = [
  "you are a wonderful example",
"destruction of the rain forest",
"do you prefer a window seat",
"our housekeeper does a thorough job",
"stability of the nation",
"I can see the rings on Saturn",
"you should visit to a doctor",
"sign the withdrawal slip",
"pumping helps if the roads are slippery",
"the chancellor was very boring",
"the most beautiful sunset",
"get your priorities in order",
"I do not care if you do that",
"gas bills are sent monthly",
"do you like to go camping",
"fall is my favorite season",
"quick there is someone knocking",
"the facts get in the way",
"sad to hear that news",
"experience is hard to come by",
"limited warranty of two years",
"our fax number has changed",
"no kissing in the library",
"a good stimulus deserves a good response",
"you must be getting old",
"chemical spill took forever",
"never mix religion and politics",
"important news always seems to be late",
"important for political parties",
"good at addition and subtraction"
];
const typingStrings2 = [
  "her majesty visited our country",
"make my day you sucker",
"never too rich and never too thin",
"what you see is what you get",
"a feeling of complete exasperation",
"shivering is one way to keep warm",
"communicate through email",
"why do you ask silly questions",
"a subject one can really enjoy",
"suburbs are sprawling up everywhere",
"lydia wants to go home",
"there are winners and losers",
"olympic athletes use drugs",
"the trains are always late",
"rejection letters are discouraging",
"sharp cheese keeps the mind sharp",
"he is just like everyone else",
"the dog buried the bone",
"lie detector tests never work",
"my watch fell in the water",
"a fox is a very smart animal",
"great disturbance in the force",
"do a good deed to someone",
"you will loose your voice",
"the rationale behind the decision",
"healthy food is good for you",
"a most ridiculous thing",
"the acceptance speech was boring",
"want to join us for lunch",
"please take a bath this month"
];
const typingStrings3 = [
  "love means many things",
"the kids are very excited",
"I listen to the tape everyday",
"the registration period is over",
"staying up all night is a bad idea",
"that agreement is rife with problems",
"look in the syllabus for the course",
"do not lie in court or else",
"we are having spaghetti",
"we went grocery shopping",
"I will meet you at noon",
"I like baroque and classical music",
"elections bring out the best",
"did you have a good time",
"world population is growing",
"this is too much to handle",
"head shoulders knees and toes",
"sprawling subdivisions are bad",
"that is a very odd question",
"the treasury department is broke",
"you have my sympathy",
"good jobs for those with education",
"please provide your date of birth",
"everyone wants to win the lottery",
"make up a few more phrases",
"no exchange without a bill",
"neither a borrower nor a lender be",
"a steep learning curve in riding a unicycle",
"if you were not so stupid",
"the location of the crime"
];


export const allTypingStrings = [
    typingStrings1,
    typingStrings2,
    typingStrings3
]

// localStorageのキー
export const PERMUTATION_SET_KEY = 'typingPermutationSet';
export const CURRENT_SESSION_KEY = 'typingCurrentSession';
export const PERMUTATION_SET_KEY2 = 'typingPermutatonSet2';
export const CURRENT_SESSION_KEY2 = 'typingCurrentSession2';

// 総組み合わせ数 (順列生成関数もこちらに移動して計算)
const generatePermutations = (arr) => {
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

export const TOTAL_PERMUTATIONS = generatePermutations(Array.from(Array(allTypingStrings.length).keys())).length;