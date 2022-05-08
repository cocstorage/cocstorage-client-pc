import Axios from '@library/axios';

import { IssueKeywordRank } from '@dto/issue-keywords';

const BASE_PATH = '/issue-keywords';

export async function fetchIssueKeywordRank() {
  const { data } = await Axios.get<IssueKeywordRank>(`${BASE_PATH}/rank`);

  return data;
}
