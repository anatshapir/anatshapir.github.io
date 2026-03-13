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
    const body = await res.json().catch(() => ({}))
    if (res.status === 403) {
      throw new Error(
        'אין הרשאת כתיבה לטוקן.\n\n' +
        '• Fine-grained token: צריך הרשאת "Contents: Read and write"\n' +
        '• Classic token: צריך scope של "repo"\n\n' +
        'לכי ל-GitHub → Settings → Developer settings → Personal access tokens ותעדכני את ההרשאות.'
      )
    }
    if (res.status === 404) {
      throw new Error('הקובץ או ה-repo לא נמצאו. ודאי שה-token שייך לחשבון הנכון.')
    }
    throw new Error(`GitHub API error ${res.status}: ${body.message || JSON.stringify(body)}`)
  }
  return res.json()
}

// Validate token has WRITE access (not just read)
export async function validateToken(): Promise<{ valid: boolean; canWrite: boolean; error?: string }> {
  try {
    const token = getToken()
    // Check repo access
    const repoRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    if (!repoRes.ok) {
      return { valid: false, canWrite: false, error: 'טוקן לא תקין או אין גישה ל-repo' }
    }
    const repo = await repoRes.json()
    // Check permissions
    const canWrite = repo.permissions?.push === true || repo.permissions?.admin === true
    if (!canWrite) {
      return {
        valid: true,
        canWrite: false,
        error: 'לטוקן יש גישת קריאה בלבד. צריך הרשאת כתיבה:\n• Fine-grained token → Contents: Read and write\n• Classic token → scope: repo'
      }
    }
    return { valid: true, canWrite: true }
  } catch {
    return { valid: false, canWrite: false, error: 'שגיאה בבדיקת הטוקן' }
  }
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

export function setToken(token: string) {
  localStorage.setItem('github_token', token)
}

export function hasToken(): boolean {
  return !!localStorage.getItem('github_token')
}

export function clearToken() {
  localStorage.removeItem('github_token')
}
