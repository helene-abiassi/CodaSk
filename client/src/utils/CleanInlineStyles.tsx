import {EntriesType} from './QuillTextProcessor';

export const deleteInlineStyles = (data: EntriesType[]) => {
  data.forEach((entry) => {
    if (entry.type === 'text') {
      entry.data = entry.data.replace(
        `<span style="color: rgb(0, 0, 0);">`,
        `<span>`
      );
    }
  });
  return data;
};
