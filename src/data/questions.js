// Google-tagged LeetCode: 105 questions. Links use company env for Google filter.
const LEETCODE_ENV = '?envType=company&envId=google&favoriteSlug=google-thirty-days';

const CATEGORIES = {
  'Arrays & Hashing': 'ðŸŸ¢',
  'Two Pointers': 'ðŸ”µ',
  'Sliding Window': 'ðŸŸ¡',
  'Stack': 'ðŸŸ£',
  'Binary Search': 'ðŸ”Ž',
  'Linked List': 'ðŸ”—',
  'Trees & Tries': 'ðŸŒ³',
  'Graphs & DSU': 'ðŸ•¸ï¸',
  'Dynamic Programming': 'ðŸ“ˆ',
  'Bit Manipulation & Math': 'ðŸ’Ž',
  'Backtracking': 'ðŸ”€',
  'Intervals': 'ðŸ“…',
  'Greedy': 'â­',
  'Design': 'âš™ï¸',
  'String': 'ðŸ“',
  'SQL': 'ðŸ—ƒï¸',
};

export const INITIAL_QUESTIONS = [
  { id: 1, title: 'Two Sum', link: `https://leetcode.com/problems/two-sum${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 2, title: 'Add Two Numbers', link: `https://leetcode.com/problems/add-two-numbers${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Medium' },
  { id: 3, title: 'Longest Substring Without Repeating Characters', link: `https://leetcode.com/problems/longest-substring-without-repeating-characters${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Medium' },
  { id: 4, title: 'Median of Two Sorted Arrays', link: `https://leetcode.com/problems/median-of-two-sorted-arrays${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Hard' },
  { id: 5, title: 'Longest Palindromic Substring', link: `https://leetcode.com/problems/longest-palindromic-substring${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 6, title: 'Reverse Integer', link: `https://leetcode.com/problems/reverse-integer${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Medium' },
  { id: 7, title: 'Palindrome Number', link: `https://leetcode.com/problems/palindrome-number${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 8, title: 'Regular Expression Matching', link: `https://leetcode.com/problems/regular-expression-matching${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 9, title: 'Container With Most Water', link: `https://leetcode.com/problems/container-with-most-water${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 10, title: 'Roman to Integer', link: `https://leetcode.com/problems/roman-to-integer${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 11, title: 'Longest Common Prefix', link: `https://leetcode.com/problems/longest-common-prefix${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 12, title: '3Sum', link: `https://leetcode.com/problems/3sum${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 13, title: '3Sum Closest', link: `https://leetcode.com/problems/3sum-closest${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 14, title: 'Letter Combinations of a Phone Number', link: `https://leetcode.com/problems/letter-combinations-of-a-phone-number${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 15, title: '4Sum', link: `https://leetcode.com/problems/4sum${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 16, title: 'Valid Parentheses', link: `https://leetcode.com/problems/valid-parentheses${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Easy' },
  { id: 17, title: 'Generate Parentheses', link: `https://leetcode.com/problems/generate-parentheses${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 18, title: 'Swap Nodes in Pairs', link: `https://leetcode.com/problems/swap-nodes-in-pairs${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Medium' },
  { id: 19, title: 'Substring with Concatenation of All Words', link: `https://leetcode.com/problems/substring-with-concatenation-of-all-words${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Hard' },
  { id: 20, title: 'Next Permutation', link: `https://leetcode.com/problems/next-permutation${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 21, title: 'Longest Valid Parentheses', link: `https://leetcode.com/problems/longest-valid-parentheses${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Hard' },
  { id: 22, title: 'Find First and Last Position of Element in Sorted Array', link: `https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 23, title: 'Combination Sum II', link: `https://leetcode.com/problems/combination-sum-ii${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 24, title: 'First Missing Positive', link: `https://leetcode.com/problems/first-missing-positive${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Hard' },
  { id: 25, title: 'Trapping Rain Water', link: `https://leetcode.com/problems/trapping-rain-water${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Hard' },
  { id: 26, title: 'Wildcard Matching', link: `https://leetcode.com/problems/wildcard-matching${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 27, title: 'Permutations', link: `https://leetcode.com/problems/permutations${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 28, title: 'Rotate Image', link: `https://leetcode.com/problems/rotate-image${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 29, title: 'Group Anagrams', link: `https://leetcode.com/problems/group-anagrams${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 30, title: 'N-Queens', link: `https://leetcode.com/problems/n-queens${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Hard' },
  { id: 31, title: 'Maximum Subarray', link: `https://leetcode.com/problems/maximum-subarray${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 32, title: 'Spiral Matrix', link: `https://leetcode.com/problems/spiral-matrix${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 33, title: 'Jump Game', link: `https://leetcode.com/problems/jump-game${LEETCODE_ENV}`, category: 'Greedy', difficulty: 'Medium' },
  { id: 34, title: 'Merge Intervals', link: `https://leetcode.com/problems/merge-intervals${LEETCODE_ENV}`, category: 'Intervals', difficulty: 'Medium' },
  { id: 35, title: 'Insert Interval', link: `https://leetcode.com/problems/insert-interval${LEETCODE_ENV}`, category: 'Intervals', difficulty: 'Medium' },
  { id: 36, title: 'Plus One', link: `https://leetcode.com/problems/plus-one${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 37, title: 'Add Binary', link: `https://leetcode.com/problems/add-binary${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 38, title: 'Climbing Stairs', link: `https://leetcode.com/problems/climbing-stairs${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Easy' },
  { id: 39, title: 'Simplify Path', link: `https://leetcode.com/problems/simplify-path${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 40, title: 'Set Matrix Zeroes', link: `https://leetcode.com/problems/set-matrix-zeroes${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 41, title: 'Search a 2D Matrix', link: `https://leetcode.com/problems/search-a-2d-matrix${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 42, title: 'Sort Colors', link: `https://leetcode.com/problems/sort-colors${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 43, title: 'Minimum Window Substring', link: `https://leetcode.com/problems/minimum-window-substring${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Hard' },
  { id: 44, title: 'Subsets', link: `https://leetcode.com/problems/subsets${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 45, title: 'Word Search', link: `https://leetcode.com/problems/word-search${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 46, title: 'Remove Duplicates from Sorted Array II', link: `https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 47, title: 'Merge Sorted Array', link: `https://leetcode.com/problems/merge-sorted-array${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 48, title: 'Subsets II', link: `https://leetcode.com/problems/subsets-ii${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 49, title: 'Same Tree', link: `https://leetcode.com/problems/same-tree${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Easy' },
  { id: 50, title: 'Binary Tree Level Order Traversal', link: `https://leetcode.com/problems/binary-tree-level-order-traversal${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Medium' },
  { id: 51, title: 'Maximum Depth of Binary Tree', link: `https://leetcode.com/problems/maximum-depth-of-binary-tree${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Easy' },
  { id: 52, title: "Pascal's Triangle", link: `https://leetcode.com/problems/pascals-triangle${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Easy' },
  { id: 53, title: 'Best Time to Buy and Sell Stock', link: `https://leetcode.com/problems/best-time-to-buy-and-sell-stock${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Easy' },
  { id: 54, title: 'Longest Consecutive Sequence', link: `https://leetcode.com/problems/longest-consecutive-sequence${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 55, title: 'Single Number', link: `https://leetcode.com/problems/single-number${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 56, title: 'Single Number II', link: `https://leetcode.com/problems/single-number-ii${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Medium' },
  { id: 57, title: 'Linked List Cycle', link: `https://leetcode.com/problems/linked-list-cycle${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Easy' },
  { id: 58, title: 'Binary Tree Preorder Traversal', link: `https://leetcode.com/problems/binary-tree-preorder-traversal${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Easy' },
  { id: 59, title: 'LRU Cache', link: `https://leetcode.com/problems/lru-cache${LEETCODE_ENV}`, category: 'Design', difficulty: 'Medium' },
  { id: 60, title: 'Reverse Words in a String', link: `https://leetcode.com/problems/reverse-words-in-a-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 61, title: 'Find Peak Element', link: `https://leetcode.com/problems/find-peak-element${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 62, title: 'Two Sum II - Input Array Is Sorted', link: `https://leetcode.com/problems/two-sum-ii-input-array-is-sorted${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 63, title: 'Majority Element', link: `https://leetcode.com/problems/majority-element${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 64, title: 'Combine Two Tables', link: `https://leetcode.com/problems/combine-two-tables${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Easy' },
  { id: 65, title: 'Second Highest Salary', link: `https://leetcode.com/problems/second-highest-salary${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Medium' },
  { id: 66, title: 'Duplicate Emails', link: `https://leetcode.com/problems/duplicate-emails${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Easy' },
  { id: 67, title: 'Rotate Array', link: `https://leetcode.com/problems/rotate-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 68, title: 'Reverse Bits', link: `https://leetcode.com/problems/reverse-bits${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 69, title: 'House Robber', link: `https://leetcode.com/problems/house-robber${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 70, title: 'Number of Islands', link: `https://leetcode.com/problems/number-of-islands${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Medium' },
  { id: 71, title: 'Isomorphic Strings', link: `https://leetcode.com/problems/isomorphic-strings${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 72, title: 'Reverse Linked List', link: `https://leetcode.com/problems/reverse-linked-list${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Easy' },
  { id: 73, title: 'Course Schedule', link: `https://leetcode.com/problems/course-schedule${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Medium' },
  { id: 74, title: 'Minimum Size Subarray Sum', link: `https://leetcode.com/problems/minimum-size-subarray-sum${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Medium' },
  { id: 75, title: 'Kth Largest Element in an Array', link: `https://leetcode.com/problems/kth-largest-element-in-an-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 76, title: 'Contains Duplicate', link: `https://leetcode.com/problems/contains-duplicate${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 77, title: 'Basic Calculator', link: `https://leetcode.com/problems/basic-calculator${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Hard' },
  { id: 78, title: 'Power of Two', link: `https://leetcode.com/problems/power-of-two${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 79, title: 'Implement Queue using Stacks', link: `https://leetcode.com/problems/implement-queue-using-stacks${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Easy' },
  { id: 80, title: 'Palindrome Linked List', link: `https://leetcode.com/problems/palindrome-linked-list${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Easy' },
  { id: 81, title: 'Lowest Common Ancestor of a Binary Tree', link: `https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Medium' },
  { id: 82, title: 'Search a 2D Matrix II', link: `https://leetcode.com/problems/search-a-2d-matrix-ii${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 83, title: 'Valid Anagram', link: `https://leetcode.com/problems/valid-anagram${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 84, title: 'Meeting Rooms II', link: `https://leetcode.com/problems/meeting-rooms-ii${LEETCODE_ENV}`, category: 'Intervals', difficulty: 'Medium' },
  { id: 85, title: 'Missing Number', link: `https://leetcode.com/problems/missing-number${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 86, title: 'Move Zeroes', link: `https://leetcode.com/problems/move-zeroes${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 87, title: 'Number of Islands II', link: `https://leetcode.com/problems/number-of-islands-ii${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Hard' },
  { id: 88, title: 'Count of Smaller Numbers After Self', link: `https://leetcode.com/problems/count-of-smaller-numbers-after-self${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 89, title: 'Reverse Vowels of a String', link: `https://leetcode.com/problems/reverse-vowels-of-a-string${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 90, title: 'Top K Frequent Elements', link: `https://leetcode.com/problems/top-k-frequent-elements${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 91, title: 'Intersection of Two Arrays', link: `https://leetcode.com/problems/intersection-of-two-arrays${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 92, title: 'Russian Doll Envelopes', link: `https://leetcode.com/problems/russian-doll-envelopes${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 93, title: 'Logger Rate Limiter', link: `https://leetcode.com/problems/logger-rate-limiter${LEETCODE_ENV}`, category: 'Design', difficulty: 'Easy' },
  { id: 94, title: 'Valid Perfect Square', link: `https://leetcode.com/problems/valid-perfect-square${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Easy' },
  { id: 95, title: 'Insert Delete GetRandom O(1)', link: `https://leetcode.com/problems/insert-delete-getrandom-o1${LEETCODE_ENV}`, category: 'Design', difficulty: 'Medium' },
  { id: 96, title: 'Ransom Note', link: `https://leetcode.com/problems/ransom-note${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 97, title: 'First Unique Character in a String', link: `https://leetcode.com/problems/first-unique-character-in-a-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 98, title: 'Decode String', link: `https://leetcode.com/problems/decode-string${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 99, title: 'Binary Watch', link: `https://leetcode.com/problems/binary-watch${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 100, title: 'Remove K Digits', link: `https://leetcode.com/problems/remove-k-digits${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 101, title: 'Third Maximum Number', link: `https://leetcode.com/problems/third-maximum-number${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 102, title: 'Longest Repeating Character Replacement', link: `https://leetcode.com/problems/longest-repeating-character-replacement${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Medium' },
  { id: 103, title: 'Find All Numbers Disappeared in an Array', link: `https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 104, title: 'Assign Cookies', link: `https://leetcode.com/problems/assign-cookies${LEETCODE_ENV}`, category: 'Greedy', difficulty: 'Easy' },
  { id: 105, title: 'Repeated Substring Pattern', link: `https://leetcode.com/problems/repeated-substring-pattern${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
];

export const STORAGE_KEYS = {
  DSA_PROGRESS: 'google-prep-dsa-progress',
  BEHAVIORAL_NOTES: 'google-prep-behavioral-notes',
  ACTIVE_TIMER: 'google-prep-active-timer',
};

/** User-scoped key so each logged-in user has separate Google prep data */
function getKey(baseKey, userId) {
  return userId ? `${baseKey}_user_${userId}` : baseKey;
}

export function getDefaultProgress() {
  return INITIAL_QUESTIONS.map((q) => ({
    id: q.id,
    completed: false,
    timeSpent: 0,
    runningSince: null,
  }));
}

export function loadProgress(userId = null) {
  try {
    const key = getKey(STORAGE_KEYS.DSA_PROGRESS, userId);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProgress(progress, userId = null) {
  try {
    const key = getKey(STORAGE_KEYS.DSA_PROGRESS, userId);
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (_) {}
}

export function loadActiveTimer(userId = null) {
  try {
    const key = getKey(STORAGE_KEYS.ACTIVE_TIMER, userId);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveActiveTimer(payload, userId = null) {
  try {
    const key = getKey(STORAGE_KEYS.ACTIVE_TIMER, userId);
    if (payload) localStorage.setItem(key, JSON.stringify(payload));
    else localStorage.removeItem(key);
  } catch (_) {}
}

export function loadBehavioralNotes(userId = null) {
  try {
    const key = getKey(STORAGE_KEYS.BEHAVIORAL_NOTES, userId);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveBehavioralNotes(notes, userId = null) {
  try {
    const key = getKey(STORAGE_KEYS.BEHAVIORAL_NOTES, userId);
    localStorage.setItem(key, JSON.stringify(notes));
  } catch (_) {}
}

export { CATEGORIES };
