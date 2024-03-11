import { filesSelectors, useFileStore } from '@/store/file';

export const open_api_tongue = 'https://tme.aazen.com/open/tcm/analysis/tongue/v2';

class PreChatService {
  public async fetchTongueLabel(preprocessMsgs: any[]) {
    let files = preprocessMsgs.at(-1).files;
    if (!files) return;

    const imageList = filesSelectors.getImageUrlOrBase64ByList(files)(useFileStore.getState());

    if (imageList.length === 0) return;

    const bodyParams = {
      base64Image: imageList[0].url,
      type: 'tongue',
    };

    const resp = await fetch(open_api_tongue, {
      body: JSON.stringify({ ...bodyParams }),
      headers: {
        'Content-Type': 'application/json',
        'secretKey': '45ccff20-0db5-464d-a410-9700c25d04a1',
      },
      method: 'POST',
    });
    return resp.json();
  }
}

export const preChatService = new PreChatService();
