const typingStrings1 = [ "he drinks tea before starting the day", "they walked to school in the light rain", "she forgot her keys on the kitchen table", "typing helps improve focus and accuracy", "we ate breakfast near the open window", "he checks emails before the meeting starts", "the train arrived six minutes late today", "i wrote a short note to my friend abroad", "she wore a red coat on a cold morning", "he smiled while reading an old message", "they studied together in the library", "my dog waited at the door patiently", "we watched a movie after dinner time", "the sun rose slowly behind the hill", "she likes writing with fountain pens", "he washed the dishes without being asked", "i brought an umbrella just in case", "we met again at the same small cafe", "she listened closely to the instructions", "he walks his dog every evening at six", "i took a photo of the quiet street", "they played cards on the rainy afternoon", "she enjoys listening to old jazz music", "the lights dimmed before the show began", "he packed a sandwich for the short trip", "she looked outside and saw fresh snow", "i read that book during summer break", "we ran to catch the last city bus", "he opened the window to let air in", "she laughed at the silly cartoon show" ];
const typingStrings2 = [ "she folded laundry while watching tv", "he boiled water to make some tea", "they played chess in the quiet room", "i cleaned the windows this morning", "he trimmed the plants on the balcony", "she took notes during the lecture", "we walked to the store before lunch", "he wrote his name on the notebook", "they waited outside the theater door", "i organized the books by color", "she turned on the lights before bed", "he brushed the dog in the backyard", "they shared snacks on the school trip", "he checked the time before leaving", "she answered every question politely", "i watered the plants in the kitchen", "he read the manual before installing", "they played music on the old radio", "she bought groceries after work", "i stretched before going for a run", "we took turns stirring the soup", "he opened the box with a small knife", "she found her scarf under the table", "they cleaned the garage last weekend", "i placed the bowl on the top shelf", "he charged his phone overnight", "we planned the trip over breakfast", "she ironed the shirt for tomorrow", "they set the alarm for seven", "i made a sandwich with ham and cheese" ];
const typingStrings3 = [ "she folded laundry while watching tv", "he boiled water to make some tea", "they played chess in the quiet room", "i cleaned the windows this morning", "he trimmed the plants on the balcony", "she took notes during the lecture", "we walked to the store before lunch", "he wrote his name on the notebook", "they waited outside the theater door", "i organized the books by color", "she turned on the lights before bed", "he brushed the dog in the backyard", "they shared snacks on the school trip", "he checked the time before leaving", "she answered every question politely", "i watered the plants in the kitchen", "he read the manual before installing", "they played music on the old radio", "she bought groceries after work", "i stretched before going for a run", "we took turns stirring the soup", "he opened the box with a small knife", "she found her scarf under the table", "they cleaned the garage last weekend", "i placed the bowl on the top shelf", "he charged his phone overnight", "we planned the trip over breakfast", "she ironed the shirt for tomorrow", "they set the alarm for seven", "i made a sandwich with ham and cheese" ];
// const typingStrings4 = [ "she folded laundry while watching tv", "he boiled water to make some tea", "they played chess in the quiet room", "i cleaned the windows this morning", "he trimmed the plants on the balcony", "she took notes during the lecture", "we walked to the store before lunch", "he wrote his name on the notebook", "they waited outside the theater door", "i organized the books by color", "she turned on the lights before bed", "he brushed the dog in the backyard", "they shared snacks on the school trip", "he checked the time before leaving", "she answered every question politely", "i watered the plants in the kitchen", "he read the manual before installing", "they played music on the old radio", "she bought groceries after work", "i stretched before going for a run", "we took turns stirring the soup", "he opened the box with a small knife", "she found her scarf under the table", "they cleaned the garage last weekend", "i placed the bowl on the top shelf", "he charged his phone overnight", "we planned the trip over breakfast", "she ironed the shirt for tomorrow", "they set the alarm for seven", "i made a sandwich with ham and cheese" ];

export const allTypingStrings = [
    typingStrings1,
    typingStrings2,
    typingStrings3
]

// localStorageのキー
export const PERMUTATION_SET_KEY = 'typingPermutationSet';
export const CURRENT_SESSION_KEY = 'typingCurrentSession';

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