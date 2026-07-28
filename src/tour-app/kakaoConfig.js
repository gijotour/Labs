/**
 * 카카오 연동 설정.
 *
 * 외부 연동은 **카카오 채널 하나뿐**이다. (오픈채팅 연동은 사용하지 않는다)
 * 실제 URL은 소스에 하드코딩하지 않고 환경변수로 주입한다.
 *
 * - 로컬:    프로젝트 루트에 .env.local 생성 후 아래 키를 채운다
 * - Netlify: Site settings → Environment variables 에 등록 (빌드 시점 주입)
 *
 *   VITE_KAKAO_CHANNEL_URL=https://pf.kakao.com/_실제채널ID
 *
 * 값이 비어 있으면 카카오 관련 버튼을 렌더하지 않는다(깨진 링크 노출 방지).
 */

const raw = import.meta.env.VITE_KAKAO_CHANNEL_URL;

export const kakaoChannelUrl = typeof raw === 'string' ? raw.trim() : '';
export const hasKakaoChannel = kakaoChannelUrl.length > 0;

/** 카카오 채널을 새 탭으로 연다. 미설정이면 아무 일도 하지 않는다. */
export const openKakaoChannel = () => {
  if (!hasKakaoChannel) return false;
  window.open(kakaoChannelUrl, '_blank', 'noopener,noreferrer');
  return true;
};
