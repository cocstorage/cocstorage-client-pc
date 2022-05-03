import Axios from '@library/axios';

import { IssueKeywordRank } from '@dto/issue-keywords';

const BASE_PATH = '/issue-keywords';

export async function fetchIssueKeywordRank() {
  const response = await Axios.get<IssueKeywordRank>(`${BASE_PATH}/rank`);

  if (response) return (await response).data;

  return {
    id: 0,
    date: '',
    ranks: []
  };
}

export default fetchIssueKeywordRank;
