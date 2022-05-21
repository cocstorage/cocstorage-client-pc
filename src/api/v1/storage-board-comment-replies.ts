import { StorageBoardReply } from '@dto/storage-board-comment-replies';
import Axios from '@library/axios';

const BASE_PATH = '/storages';

export async function postNonMemberStorageBoardReply(
  storageId: number,
  id: number,
  commentId: number,
  data: PostStorageBoardReplyData
) {
  const { data: response } = await Axios.post<StorageBoardReply, PostStorageBoardReplyData>(
    `${BASE_PATH}/${storageId}/boards/${id}/comments/${commentId}/replies/non-members`,
    data
  );

  return response;
}

export async function deleteNonMemberStorageBoardReply(
  storageId: number,
  id: number,
  commentId: number,
  replyId: number,
  password: string
) {
  const { data: response } = await Axios.delete<StorageBoardReply>(
    `${BASE_PATH}/${storageId}/boards/${id}/comments/${commentId}/replies/non-members/${replyId}`,
    {
      data: {
        password
      }
    }
  );

  return response;
}

export interface PostStorageBoardReplyData {
  nickname?: string | null;
  password?: string | null;
  content: string | null;
}
