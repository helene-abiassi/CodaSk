/**
 * Quill text editor saves its output in a form of html tags and
 * and text values between them. This function aims to find locations
 * where tags <pre>***</pre> are located and store its values separately.
 * Those are code snippets provided by the user. The purpose of that is that
 * we want to style them differenlty than other parts of text.
 * @param {String} quillText
 * @returns {Array} Array of objects in a shape [{type: "text"|"code", data: String}]
 */

export type EntriesType = {
  type: string;
  data: string;
};

export const divideString = (quillText: string): EntriesType[] => {
  // Locate indexes of all the places where they begin and end
  const regexp = /<pre/gi;
  const regexp2 = /pre>/gi;

  //   Match regex with incoming string and store result in []
  const codeStart = [...quillText.matchAll(regexp)];
  const CodeEnd = [...quillText.matchAll(regexp2)];

  //   Stores objects containing fields of type and data
  //   Possible types are "text", "code", and data is always a string
  const entries: EntriesType[] = [];

  // If there are no code snippets inside push all as text
  if (codeStart.length === 0) {
    entries.push({
      type: 'text',
      data: quillText,
    });
  } else {
    //   Logic for execution is a bit different for strings containing
    //   2 code snippets than other situations
    if (codeStart.length == 2) {
      for (let i = 0; i < codeStart.length; i++) {
        // For a first element get text before the code snippet, and code snippet
        if (i === 0) {
          entries.push({
            type: 'text',
            data: quillText.substring(0, codeStart[i].index),
          });
          entries.push({
            type: 'code',
            data: quillText.substring(
              codeStart[i].index!,
              CodeEnd[i].index! + 4
            ),
          });
          // For a second element same + text after a code snippet
        } else {
          entries.push({
            type: 'text',
            data: quillText.substring(
              CodeEnd[i - 1].index! + 4,
              codeStart[i].index
            ),
          });
          entries.push({
            type: 'code',
            data: quillText.substring(
              codeStart[i].index!,
              CodeEnd[i].index! + 4
            ),
          });
          entries.push({
            type: 'text',
            data: quillText.substring(CodeEnd[i].index! + 4, quillText.length),
          });
        }
      }
      // If a string contains 1, 3 or more code snippets do the following
    } else {
      for (let i = 0; i < codeStart.length; i++) {
        // For the first element get text before the code snippet, and code snippet
        if (i === 0) {
          entries.push({
            type: 'text',
            data: quillText.substring(0, codeStart[i].index),
          });
          entries.push({
            type: 'code',
            data: quillText.substring(
              codeStart[i].index!,
              CodeEnd[i].index! + 4
            ),
          });
          // For the last element do the same
        } else if (i === codeStart.length - 1) {
          entries.push({
            type: 'code',
            data: quillText.substring(
              codeStart[i].index!,
              CodeEnd[i].index! + 4
            ),
          });
          entries.push({
            type: 'text',
            data: quillText.substring(CodeEnd[i].index! + 4, quillText.length),
          });
          // This part deals with situations where before first and last there is more
        } else {
          {
            /*This is important part of logic. If there are 3 code snippets the logic is 
           to push text before the code snippet, code snippet and text after it. Which 
            works great for three code snippets but in case of 4 or more it will always 
            double text from the previous one (since one would return a sequence prev/code/next 
            next from the first one would contain same value as prev from the following one*/
          }
          // Therefore if previous entry closing text is same as previous for this one this part
          // Will return only current code and what follows
          if (
            entries[entries.length - 1].data ===
            quillText.substring(CodeEnd[i - 1].index! + 4, codeStart[i].index)
          ) {
            entries.push({
              type: 'code',
              data: quillText.substring(
                codeStart[i].index!,
                CodeEnd[i].index! + 4
              ),
            });
            entries.push({
              type: 'text',
              data: quillText.substring(
                CodeEnd[i].index! + 4,
                codeStart[i + 1].index
              ),
            });
            //  But if those strings don't match which will be the case where there are 3 code snippets
            //  Then add previous, code, next
          } else {
            entries.push({
              type: 'text',
              data: quillText.substring(
                CodeEnd[i - 1].index! + 4,
                codeStart[i].index
              ),
            });
            entries.push({
              type: 'code',
              data: quillText.substring(
                codeStart[i].index!,
                CodeEnd[i].index! + 4
              ),
            });
            entries.push({
              type: 'text',
              data: quillText.substring(
                CodeEnd[i].index! + 4,
                codeStart[i + 1].index
              ),
            });
          }
        }
      }
    }
  }

  return entries;
};
