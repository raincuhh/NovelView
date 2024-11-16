export function getUuid(): string {
   let pattern: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
   let result: string = "";

   for (let i = 0; i < pattern.length; i++) {
      let c: string = pattern[i];

      if (c === "x" || c === "y") {
         let r: number = Math.floor(Math.random() * 16);
         let v: number = c === "x" ? r : (r & 0x3) | 0x8;

         result += v.toString(16);
      } else {
         result += c;
      }
   }
   return result;
}

export function uppercaseify(str: string): string {
   let first: string = str.charAt(0);
   if (first !== first.toUpperCase()) {
      str = str.charAt(0).toUpperCase() + str.slice(1);
   }
   return str;
}

export function uppercaseifySentences(str: string): string {
   let words: string[] = str.split(" ");
   words.forEach((word: string, i: number) => {
      words[i] = uppercaseify(word);
   });
   return words.join(" ");
}
