// GitHub API helper for the admin panel
// Commits changes directly to the repository

const REPO_OWNER = 'anatshapir'
const REPO_NAME = 'anatshapir.github.io'
const BRANCH = 'main'

function getToken(): string {
  const token = localStorage.getItem('github_token')
  if (!token) throw new Error('GitHub token not configured')
  return token
}

async function githubApi(path: string, options: RequestInit = {}) {
  const token = getToken()
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}${path}`, {
    ...options,
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub API error ${res.status}: ${body}`)
  }
  return res.json()
}

export async function getFileContent(filePath: string): Promise<{ content: string; sha: string }> {
  const data = await githubApi(`/contents/${filePath}?ref=${BRANCH}`)
  const content = atob(data.content.replace(/\n/g, ''))
  return { content, sha: data.sha }
}

export async function updateFile(filePath: string, content: string, message: string, sha: string): Promise<void> {
  await githubApi(`/contents/${filePath}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      sha,
      branch: BRANCH,
    }),
  })
}

export async function createFile(filePath: string, content: string, message: string): Promise<void> {
  await githubApi(`/contents/${filePath}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: BRANCH,
    }),
  })
}

export async function uploadBinaryFile(filePath: string, base64Content: string, message: string): Promise<void> {
  await githubApi(`/contents/${filePath}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: BRANCH,
    }),
  })
}

export async function validateToken(): Promise<boolean> {
  try {
    await githubApi('')
    return true
  } catch {
    return false
  }
}

export function setToken(token: string) {
  localStorage.setItem('github_token', token)
}

export function hasToken(): boolean {
  return !!localStorage.getItem('github_token')
}

export function clearToken() {
  localStorage.removeItem('github_token')
}
