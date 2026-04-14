// Google-tagged LeetCode: 148 questions. Links use company env for Google filter.
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
  { id: 2, title: 'Merge Sorted Array', link: `https://leetcode.com/problems/merge-sorted-array${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 3, title: 'Create Hello World Function', link: `https://leetcode.com/problems/create-hello-world-function${LEETCODE_ENV}`, category: 'Design', difficulty: 'Easy' },
  { id: 4, title: 'Longest Common Prefix', link: `https://leetcode.com/problems/longest-common-prefix${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 5, title: 'Remove Duplicates from Sorted Array', link: `https://leetcode.com/problems/remove-duplicates-from-sorted-array${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 6, title: 'Top K Frequent Elements', link: `https://leetcode.com/problems/top-k-frequent-elements${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 7, title: 'Median of Two Sorted Arrays', link: `https://leetcode.com/problems/median-of-two-sorted-arrays${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Hard' },
  { id: 8, title: 'Container With Most Water', link: `https://leetcode.com/problems/container-with-most-water${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 9, title: 'Valid Parentheses', link: `https://leetcode.com/problems/valid-parentheses${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Easy' },
  { id: 10, title: 'Longest Consecutive Sequence', link: `https://leetcode.com/problems/longest-consecutive-sequence${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 11, title: 'Combine Two Tables', link: `https://leetcode.com/problems/combine-two-tables${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Easy' },
  { id: 12, title: 'Roman to Integer', link: `https://leetcode.com/problems/roman-to-integer${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 13, title: '3Sum', link: `https://leetcode.com/problems/3sum${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 14, title: 'Best Time to Buy and Sell Stock', link: `https://leetcode.com/problems/best-time-to-buy-and-sell-stock${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Easy' },
  { id: 15, title: 'Longest Substring Without Repeating Characters', link: `https://leetcode.com/problems/longest-substring-without-repeating-characters${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Medium' },
  { id: 16, title: 'Merge Intervals', link: `https://leetcode.com/problems/merge-intervals${LEETCODE_ENV}`, category: 'Intervals', difficulty: 'Medium' },
  { id: 17, title: 'Min Stack', link: `https://leetcode.com/problems/min-stack${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 18, title: 'Russian Doll Envelopes', link: `https://leetcode.com/problems/russian-doll-envelopes${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 19, title: 'Subarray Sum Equals K', link: `https://leetcode.com/problems/subarray-sum-equals-k${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 20, title: 'Add Two Numbers', link: `https://leetcode.com/problems/add-two-numbers${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Medium' },
  { id: 21, title: 'Longest Palindromic Substring', link: `https://leetcode.com/problems/longest-palindromic-substring${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 22, title: 'Palindrome Number', link: `https://leetcode.com/problems/palindrome-number${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 23, title: '4Sum', link: `https://leetcode.com/problems/4sum${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 24, title: 'Find the Index of the First Occurrence in a String', link: `https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 25, title: 'Number of Islands', link: `https://leetcode.com/problems/number-of-islands${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Medium' },
  { id: 26, title: 'Move Zeroes', link: `https://leetcode.com/problems/move-zeroes${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 27, title: 'Intersection of Two Arrays', link: `https://leetcode.com/problems/intersection-of-two-arrays${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 28, title: 'Next Greater Element II', link: `https://leetcode.com/problems/next-greater-element-ii${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 29, title: 'Daily Temperatures', link: `https://leetcode.com/problems/daily-temperatures${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 30, title: 'Concatenation of Array', link: `https://leetcode.com/problems/concatenation-of-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 31, title: 'Zigzag Conversion', link: `https://leetcode.com/problems/zigzag-conversion${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 32, title: 'Regular Expression Matching', link: `https://leetcode.com/problems/regular-expression-matching${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 33, title: 'Letter Combinations of a Phone Number', link: `https://leetcode.com/problems/letter-combinations-of-a-phone-number${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 34, title: 'Search in Rotated Sorted Array', link: `https://leetcode.com/problems/search-in-rotated-sorted-array${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 35, title: 'Trapping Rain Water', link: `https://leetcode.com/problems/trapping-rain-water${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Hard' },
  { id: 36, title: 'Permutations', link: `https://leetcode.com/problems/permutations${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 37, title: 'Group Anagrams', link: `https://leetcode.com/problems/group-anagrams${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 38, title: 'Add Binary', link: `https://leetcode.com/problems/add-binary${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 39, title: 'Sort Colors', link: `https://leetcode.com/problems/sort-colors${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Medium' },
  { id: 40, title: 'Maximum Product Subarray', link: `https://leetcode.com/problems/maximum-product-subarray${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 41, title: 'Majority Element', link: `https://leetcode.com/problems/majority-element${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 42, title: 'Happy Number', link: `https://leetcode.com/problems/happy-number${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 43, title: 'Kth Largest Element in an Array', link: `https://leetcode.com/problems/kth-largest-element-in-an-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 44, title: 'Power of Two', link: `https://leetcode.com/problems/power-of-two${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 45, title: 'Product of Array Except Self', link: `https://leetcode.com/problems/product-of-array-except-self${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 46, title: 'Lexicographically Smallest Generated String', link: `https://leetcode.com/problems/lexicographically-smallest-generated-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Hard' },
  { id: 47, title: 'Remove Element', link: `https://leetcode.com/problems/remove-element${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 48, title: 'Search Insert Position', link: `https://leetcode.com/problems/search-insert-position${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Easy' },
  { id: 49, title: 'Spiral Matrix', link: `https://leetcode.com/problems/spiral-matrix${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 50, title: 'Climbing Stairs', link: `https://leetcode.com/problems/climbing-stairs${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Easy' },
  { id: 51, title: 'Search a 2D Matrix', link: `https://leetcode.com/problems/search-a-2d-matrix${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 52, title: 'Remove Duplicates from Sorted List', link: `https://leetcode.com/problems/remove-duplicates-from-sorted-list${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Easy' },
  { id: 53, title: 'Same Tree', link: `https://leetcode.com/problems/same-tree${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Easy' },
  { id: 54, title: 'Valid Palindrome', link: `https://leetcode.com/problems/valid-palindrome${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 55, title: 'Surrounded Regions', link: `https://leetcode.com/problems/surrounded-regions${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Medium' },
  { id: 56, title: 'Single Number', link: `https://leetcode.com/problems/single-number${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 57, title: 'LRU Cache', link: `https://leetcode.com/problems/lru-cache${LEETCODE_ENV}`, category: 'Design', difficulty: 'Medium' },
  { id: 58, title: 'Reverse Words in a String', link: `https://leetcode.com/problems/reverse-words-in-a-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 59, title: 'Course Schedule', link: `https://leetcode.com/problems/course-schedule${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Medium' },
  { id: 60, title: 'Implement Queue using Stacks', link: `https://leetcode.com/problems/implement-queue-using-stacks${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Easy' },
  { id: 61, title: 'Search a 2D Matrix II', link: `https://leetcode.com/problems/search-a-2d-matrix-ii${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 62, title: 'Valid Anagram', link: `https://leetcode.com/problems/valid-anagram${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 63, title: 'Longest Increasing Subsequence', link: `https://leetcode.com/problems/longest-increasing-subsequence${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 64, title: 'Decode String', link: `https://leetcode.com/problems/decode-string${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 65, title: 'Managers with at Least 5 Direct Reports', link: `https://leetcode.com/problems/managers-with-at-least-5-direct-reports${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Medium' },
  { id: 66, title: 'Maximum Width of Binary Tree', link: `https://leetcode.com/problems/maximum-width-of-binary-tree${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Medium' },
  { id: 67, title: 'Koko Eating Bananas', link: `https://leetcode.com/problems/koko-eating-bananas${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 68, title: 'Rotting Oranges', link: `https://leetcode.com/problems/rotting-oranges${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Medium' },
  { id: 69, title: 'Max Consecutive Ones III', link: `https://leetcode.com/problems/max-consecutive-ones-iii${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Medium' },
  { id: 70, title: 'Car Pooling', link: `https://leetcode.com/problems/car-pooling${LEETCODE_ENV}`, category: 'Intervals', difficulty: 'Medium' },
  { id: 71, title: 'Running Sum of 1d Array', link: `https://leetcode.com/problems/running-sum-of-1d-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 72, title: 'Largest Submatrix With Rearrangements', link: `https://leetcode.com/problems/largest-submatrix-with-rearrangements${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 73, title: 'Check if Strings Can be Made Equal I', link: `https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-i${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 74, title: 'Check if Strings Can be Made Equal II', link: `https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 75, title: 'Equal Sum Grid Partition II', link: `https://leetcode.com/problems/equal-sum-grid-partition-ii${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Hard' },
  { id: 76, title: 'Construct Uniform Parity Array I', link: `https://leetcode.com/problems/construct-uniform-parity-array-i${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 77, title: 'Reverse Integer', link: `https://leetcode.com/problems/reverse-integer${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Medium' },
  { id: 78, title: 'String to Integer (atoi)', link: `https://leetcode.com/problems/string-to-integer-atoi${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 79, title: 'Integer to Roman', link: `https://leetcode.com/problems/integer-to-roman${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 80, title: 'Merge Two Sorted Lists', link: `https://leetcode.com/problems/merge-two-sorted-lists${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Easy' },
  { id: 81, title: 'Next Permutation', link: `https://leetcode.com/problems/next-permutation${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 82, title: 'Find First/Last Position in Sorted Array', link: `https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 83, title: 'Combination Sum', link: `https://leetcode.com/problems/combination-sum${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 84, title: 'Rotate Image', link: `https://leetcode.com/problems/rotate-image${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 85, title: 'Pow(x, n)', link: `https://leetcode.com/problems/powx-n${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Medium' },
  { id: 86, title: 'Maximum Subarray', link: `https://leetcode.com/problems/maximum-subarray${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 87, title: 'Length of Last Word', link: `https://leetcode.com/problems/length-of-last-word${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 88, title: 'Edit Distance', link: `https://leetcode.com/problems/edit-distance${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 89, title: 'Combinations', link: `https://leetcode.com/problems/combinations${LEETCODE_ENV}`, category: 'Backtracking', difficulty: 'Medium' },
  { id: 90, title: 'Maximal Rectangle', link: `https://leetcode.com/problems/maximal-rectangle${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 91, title: 'Binary Tree Zigzag Level Order Traversal', link: `https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Medium' },
  { id: 92, title: 'Balanced Binary Tree', link: `https://leetcode.com/problems/balanced-binary-tree${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Easy' },
  { id: 93, title: 'Word Ladder', link: `https://leetcode.com/problems/word-ladder${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Hard' },
  { id: 94, title: 'Reorder List', link: `https://leetcode.com/problems/reorder-list${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Medium' },
  { id: 95, title: 'Find Peak Element', link: `https://leetcode.com/problems/find-peak-element${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 96, title: 'Excel Sheet Column Title', link: `https://leetcode.com/problems/excel-sheet-column-title${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 97, title: 'Delete Duplicate Emails', link: `https://leetcode.com/problems/delete-duplicate-emails${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Easy' },
  { id: 98, title: 'House Robber', link: `https://leetcode.com/problems/house-robber${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 99, title: 'Binary Tree Right Side View', link: `https://leetcode.com/problems/binary-tree-right-side-view${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Medium' },
  { id: 100, title: 'Count Primes', link: `https://leetcode.com/problems/count-primes${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Medium' },
  { id: 101, title: 'Reverse Linked List', link: `https://leetcode.com/problems/reverse-linked-list${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Easy' },
  { id: 102, title: 'Implement Stack using Queues', link: `https://leetcode.com/problems/implement-stack-using-queues${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Easy' },
  { id: 103, title: 'Number of Digit One', link: `https://leetcode.com/problems/number-of-digit-one${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Hard' },
  { id: 104, title: 'Range Sum Query - Immutable', link: `https://leetcode.com/problems/range-sum-query-immutable${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 105, title: 'Coin Change', link: `https://leetcode.com/problems/coin-change${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 106, title: 'Longest Increasing Path in a Matrix', link: `https://leetcode.com/problems/longest-increasing-path-in-a-matrix${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 107, title: 'Reverse String', link: `https://leetcode.com/problems/reverse-string${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 108, title: 'Reverse Vowels of a String', link: `https://leetcode.com/problems/reverse-vowels-of-a-string${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 109, title: 'Find All Duplicates in an Array', link: `https://leetcode.com/problems/find-all-duplicates-in-an-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 110, title: 'Find All Numbers Disappeared in an Array', link: `https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 111, title: 'LFU Cache', link: `https://leetcode.com/problems/lfu-cache${LEETCODE_ENV}`, category: 'Design', difficulty: 'Hard' },
  { id: 112, title: 'Island Perimeter', link: `https://leetcode.com/problems/island-perimeter${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Easy' },
  { id: 113, title: 'Target Sum', link: `https://leetcode.com/problems/target-sum${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 114, title: 'Fibonacci Number', link: `https://leetcode.com/problems/fibonacci-number${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Easy' },
  { id: 115, title: 'Coin Change II', link: `https://leetcode.com/problems/coin-change-ii${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Medium' },
  { id: 116, title: 'Set Mismatch', link: `https://leetcode.com/problems/set-mismatch${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 117, title: 'Binary Search', link: `https://leetcode.com/problems/binary-search${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Easy' },
  { id: 118, title: 'Asteroid Collision', link: `https://leetcode.com/problems/asteroid-collision${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Medium' },
  { id: 119, title: 'Network Delay Time', link: `https://leetcode.com/problems/network-delay-time${LEETCODE_ENV}`, category: 'Graphs & DSU', difficulty: 'Medium' },
  { id: 120, title: 'Swap Adjacent in LR String', link: `https://leetcode.com/problems/swap-adjacent-in-lr-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 121, title: 'Find And Replace in String', link: `https://leetcode.com/problems/find-and-replace-in-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 122, title: 'Guess the Word', link: `https://leetcode.com/problems/guess-the-word${LEETCODE_ENV}`, category: 'String', difficulty: 'Hard' },
  { id: 123, title: 'Backspace String Compare', link: `https://leetcode.com/problems/backspace-string-compare${LEETCODE_ENV}`, category: 'Two Pointers', difficulty: 'Easy' },
  { id: 124, title: 'Middle of the Linked List', link: `https://leetcode.com/problems/middle-of-the-linked-list${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Easy' },
  { id: 125, title: 'Sort an Array', link: `https://leetcode.com/problems/sort-an-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 126, title: 'Subarray Sums Divisible by K', link: `https://leetcode.com/problems/subarray-sums-divisible-by-k${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 127, title: 'Capacity To Ship Packages Within D Days', link: `https://leetcode.com/problems/capacity-to-ship-packages-within-d-days${LEETCODE_ENV}`, category: 'Binary Search', difficulty: 'Medium' },
  { id: 128, title: 'Greatest Common Divisor of Strings', link: `https://leetcode.com/problems/greatest-common-divisor-of-strings${LEETCODE_ENV}`, category: 'String', difficulty: 'Easy' },
  { id: 129, title: 'Article Views I', link: `https://leetcode.com/problems/article-views-i${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Easy' },
  { id: 130, title: 'Reformat Department Table', link: `https://leetcode.com/problems/reformat-department-table${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Easy' },
  { id: 131, title: 'Time Needed to Inform All Employees', link: `https://leetcode.com/problems/time-needed-to-inform-all-employees${LEETCODE_ENV}`, category: 'Trees & Tries', difficulty: 'Medium' },
  { id: 132, title: 'Shuffle the Array', link: `https://leetcode.com/problems/shuffle-the-array${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 133, title: 'Can Make Arithmetic Progression From Sequence', link: `https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 134, title: 'Count Odd Numbers in an Interval Range', link: `https://leetcode.com/problems/count-odd-numbers-in-an-interval-range${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 135, title: 'Minimum Operations to Reduce X to Zero', link: `https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero${LEETCODE_ENV}`, category: 'Sliding Window', difficulty: 'Medium' },
  { id: 136, title: 'Recyclable and Low Fat Products', link: `https://leetcode.com/problems/recyclable-and-low-fat-products${LEETCODE_ENV}`, category: 'SQL', difficulty: 'Easy' },
  { id: 137, title: 'Get Biggest Three Rhombus Sums in a Grid', link: `https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 138, title: 'Number of Visible People in a Queue', link: `https://leetcode.com/problems/number-of-visible-people-in-a-queue${LEETCODE_ENV}`, category: 'Stack', difficulty: 'Hard' },
  { id: 139, title: 'Partition Array Into Two Arrays to Minimize Sum Difference', link: `https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference${LEETCODE_ENV}`, category: 'Dynamic Programming', difficulty: 'Hard' },
  { id: 140, title: 'Delete the Middle Node of a Linked List', link: `https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list${LEETCODE_ENV}`, category: 'Linked List', difficulty: 'Medium' },
  { id: 141, title: 'Add Two Integers', link: `https://leetcode.com/problems/add-two-integers${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Easy' },
  { id: 142, title: 'Move Pieces to Obtain a String', link: `https://leetcode.com/problems/move-pieces-to-obtain-a-string${LEETCODE_ENV}`, category: 'String', difficulty: 'Medium' },
  { id: 143, title: 'Timeout Cancellation', link: `https://leetcode.com/problems/timeout-cancellation${LEETCODE_ENV}`, category: 'Design', difficulty: 'Easy' },
  { id: 144, title: 'Matrix Similarity After Cyclic Shifts', link: `https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Easy' },
  { id: 145, title: 'Count Submatrices with Top-Left Element and Sum Less Than k', link: `https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 146, title: 'Equal Sum Grid Partition I', link: `https://leetcode.com/problems/equal-sum-grid-partition-i${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 147, title: 'Minimum Distance Between Three Equal Elements II', link: `https://leetcode.com/problems/minimum-distance-between-three-equal-elements-ii${LEETCODE_ENV}`, category: 'Arrays & Hashing', difficulty: 'Medium' },
  { id: 148, title: 'Minimum Operations to Transform Array into Alternating Prime', link: `https://leetcode.com/problems/minimum-operations-to-transform-array-into-alternating-prime${LEETCODE_ENV}`, category: 'Bit Manipulation & Math', difficulty: 'Medium' },
];

export const STORAGE_KEYS = {
  DSA_PROGRESS: 'google-prep-dsa-progress',
  BEHAVIORAL_NOTES: 'google-prep-behavioral-notes',
  ACTIVE_TIMER: 'google-prep-active-timer',
  CUSTOM_BEHAVIORAL_PROMPTS: 'google-prep-custom-behavioral-prompts',
  BEHAVIORAL_PROMPT_ORDER: 'google-prep-behavioral-prompt-order',
  DELETED_BEHAVIORAL_PROMPTS: 'google-prep-deleted-behavioral-prompts',
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
