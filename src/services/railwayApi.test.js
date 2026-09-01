import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * railwayApi 는 모듈 로드 시점에 import.meta.env.VITE_API_URL 을 한 번만 읽는다.
 * 따라서 환경별 동작을 검증하려면 stubEnv 후 resetModules + 동적 import 를 써야 한다.
 */
async function loadApi(apiUrl) {
  vi.resetModules()
  if (apiUrl === undefined) {
    vi.stubEnv('VITE_API_URL', '')
  } else {
    vi.stubEnv('VITE_API_URL', apiUrl)
  }
  return import('./railwayApi.js')
}

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('isRailwayApiEnabled', () => {
  it('VITE_API_URL 이 없으면 false 를 돌려준다', async () => {
    const { isRailwayApiEnabled } = await loadApi(undefined)
    expect(isRailwayApiEnabled()).toBe(false)
  })

  it('VITE_API_URL 이 있으면 true 를 돌려준다', async () => {
    const { isRailwayApiEnabled } = await loadApi('https://api.example.com')
    expect(isRailwayApiEnabled()).toBe(true)
  })
})

describe('request', () => {
  it('VITE_API_URL 미설정 시 네트워크를 타지 않고 즉시 실패한다', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const { railwayApi } = await loadApi(undefined)
    await expect(railwayApi.getProposals()).rejects.toThrow('VITE_API_URL is not configured')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('base URL 과 경로를 이어 붙이고 JSON 헤더를 붙인다', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1 }],
    })
    vi.stubGlobal('fetch', fetchSpy)

    const { railwayApi } = await loadApi('https://api.example.com')
    await expect(railwayApi.getProposals()).resolves.toEqual([{ id: 1 }])

    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://api.example.com/api/proposals')
    expect(options.headers['Content-Type']).toBe('application/json')
  })

  it('응답이 실패면 본문을 담아 예외를 던진다', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not Found',
    }))

    const { railwayApi } = await loadApi('https://api.example.com')
    await expect(railwayApi.getProposals()).rejects.toThrow('Not Found')
  })

  it('본문이 비어 있으면 상태 코드를 담아 예외를 던진다', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => '',
    }))

    const { railwayApi } = await loadApi('https://api.example.com')
    await expect(railwayApi.getProposals()).rejects.toThrow('API request failed: 500')
  })

  it('PATCH 는 메서드와 본문을 전달한다', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 7 }) })
    vi.stubGlobal('fetch', fetchSpy)

    const { railwayApi } = await loadApi('https://api.example.com')
    await railwayApi.updateGuide(7, { status: 'Active' })

    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://api.example.com/api/guides/7')
    expect(options.method).toBe('PATCH')
    expect(JSON.parse(options.body)).toEqual({ status: 'Active' })
  })
})
