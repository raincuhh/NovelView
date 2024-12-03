export const uppercaseify = (str: string): string => {
   let first: string = str.charAt(0);
   if (first !== first.toUpperCase()) {
      str = str.charAt(0).toUpperCase() + str.slice(1);
   }
   return str;
};

export const uppercaseifySentences = (str: string): string => {
   let words: string[] = str.split(" ");
   words.forEach((word: string, i: number) => {
      words[i] = uppercaseify(word);
   });
   return words.join(" ");
};
