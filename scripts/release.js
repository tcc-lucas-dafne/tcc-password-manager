const { Octokit } = require('@octokit/core');
require('dotenv').config();

const { TOKEN, RELEASE_MAJOR, RELEASE_MINOR, RELEASE_PATCH } = process.env;
const octokit = new Octokit({ auth: TOKEN });

const now = new Date();
const year = now.getFullYear().toString();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');

const getLatestRelease = async () => {
  const releases = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: OWNER,
    repo: REPO,
  });
  if (releases?.data.length > 0) {
    return releases?.data?.[0]?.tag_name;
  }
  return '0.0.0';
};

const newTagName = async () => {
  let oldTag = await getLatestRelease();
  oldTag = oldTag.split('.');

  if (RELEASE_MAJOR === 'true') {
    const majorTagNum = parseInt(oldTag[0]) + 1;
    return `${majorTagNum}.0.0`;
  }
  if (RELEASE_MINOR === 'true') {
    const minorTagNum = parseInt(oldTag[1]) + 1;
    return `${oldTag[0]}.${minorTagNum}.0`;
  }
  if (RELEASE_PATCH === 'true') {
    const fixTagNum = parseInt(oldTag[2]) + 1;
    return `${oldTag[0]}.${oldTag[1]}.${fixTagNum}`;
  }
  const fixTagNum = parseInt(oldTag[2]) + 1;
  return `${oldTag[0]}.${oldTag[1]}.${fixTagNum}`;
};

const createRelease = async () => {
  const tag = await newTagName();
  const res = await octokit.request('POST /repos/{owner}/{repo}/releases', {
    owner: OWNER,
    repo: REPO,
    tag_name: tag,
    name: tag,
  });
  return [res?.data?.upload_url, tag];
};

const script = async () => {
  const release = await createRelease();
};

script();