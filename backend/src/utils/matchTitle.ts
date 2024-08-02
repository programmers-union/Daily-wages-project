import SubCategoryItem, { ISubCategoryItems } from '../models/SubCategoryItems';


const countMatchingWords = (a: string, b: string): number => {
  const wordsA = a.toLowerCase().split(' ');
  const wordsB = b.toLowerCase().split(' ');

  const matchingWords = wordsA.filter(word => wordsB.includes(word));
  return matchingWords.length;
};

const findClosestJobTitle = async (jobTitle: string): Promise<ISubCategoryItems | null> => {
  const subCategoryItems = await SubCategoryItem.find();

  if (!subCategoryItems || subCategoryItems.length === 0) {
    return null;
  }

  let closestItem: ISubCategoryItems | null = null;
  let maxMatchingWords = 0;

  for (const item of subCategoryItems) {
    const matchingWords = countMatchingWords(jobTitle, item.jobTitle);
    if (matchingWords > maxMatchingWords) {
      maxMatchingWords = matchingWords;
      closestItem = item;
    }
  }

  return closestItem;
};

export default findClosestJobTitle;