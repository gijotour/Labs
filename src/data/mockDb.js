export const mockDb = {
  hero: {
    badge: "미래지향적 프리미엄 여행 설계 서비스",
    title: ["여행의 모든것,", "GIJO TOUR"],
    description: "단순한 예약을 넘어 당신의 기업을 위한 최고의 여행을 설계합니다. 전문 여행 설계사(Travel Designer)가 직접 비대면으로 제안하는 독창적인 선택지를 경험하세요.",
    cta: {
      primary: "비대면 여행 설계 상담",
      secondary: "주요 지역 둘러보기"
    },
    stats: [
      { value: "500+", label: "여행설계사" },
      { value: "1,200+", label: "Corporate Clients" },
      { value: "후후불 정산", label: "신뢰 기반 서비스" }
    ]
  },
  
  features: [
    {
      title: "후불 정산 시스템",
      description: "상품 만족도와 서비스에 이상이 없음을 확인한 후 설계사에게 비용을 지급합니다. 최고의 품질을 보장합니다.",
      icon: "💳"
    },
    {
      title: "최소 선불 부킹비",
      description: "예약 시 발생하는 선불 결제는 최소화하였습니다. 여행 자금 유동성을 고려한 최적의 시스템입니다.",
      icon: "🛡️"
    },
    {
      title: "완벽한 증빙 처리",
      description: "법인 카드 결제는 물론, 투명한 세금계산서 발행 시스템을 통해 정산 처리를 완벽하게 지원합니다.",
      icon: "📑"
    },
    {
      title: "설계사 전문성 관리",
      description: "검증된 '여행 설계사'들이 직접 비대면으로 선택지를 제안하며, 전문적인 관리팀이 뒤를 받쳐줍니다.",
      icon: "👔"
    }
  ],

  regions: [
    { name: "필리핀", cities: ["따가이다이", "마닐라", "클락"] },
    { name: "베트남", cities: ["다낭", "호이안", "호치민", "하노이"] },
    { name: "라오스", cities: ["비엔티엔"] },
    { name: "기타", cities: ["태국", "인도네시아", "일본"] }
  ],

  packages: [
    {
      designer: "Alex Kim",
      region: "필리핀 따가이다이",
      title: "프리미엄 화산 조망 럭셔리 힐링 투어",
      image: "/assets/tagaytay.png",
      youtubeUrl: "https://www.youtube.com/embed/5mHn9E5vKFA",
      features: ["따알 화산 조망권 레스토랑 예약", "럭셔리 프라이빗 차량", "비대면 실시간 케어"],
      rating: 4.9,
      reviewCount: 124,
      reviews: [
        { nickname: "여행구름", rating: 5, comment: "따가이다이의 석양은 정말 잊지 못할 추억이 되었습니다.", date: "2026-04-10" }
      ],
      detailedPlan: {
        itinerary: [
          { day: 1, title: "마닐라 도착 및 따가이다이 이동", content: "마닐라 공항 의전 서비스 후 전용 차량으로 이동하여 안토니오스 등 최고의 레스토랑에서 석양 다이닝을 즐깁니다." },
          { day: 2, title: "따알 화산 조망 & 힐링 스파", content: "침묵의 화산이라 불리는 따알 화산을 조망하며 호텔 내 최고급 스파에서 휴식을 취합니다." },
          { day: 3, title: "마닐라 시티 투어 및 귀국", content: "마닐라 시내의 역사적인 명소(인트라무로스) 탐방 후 쇼핑몰 방문 및 공항 배웅 서비스를 제공합니다." }
        ],
        pricing: "1인당 약 150만원 (항공권 별도)",
        inclusions: ["전 일정 프라이빗 전용차량", "5성급 호텔 숙박", "조식 및 특식 포함", "현지인 전담 케어"],
        exclusions: ["왕복 항공권", "개인 경비", "매너팁"],
        proTip: "따가이다이는 고산 지대라 저녁에 쌀쌀할 수 있으니 얇은 겉옷을 꼭 챙기세요!"
      }
    },
    {
      designer: "Sarah Lee",
      region: "베트남 다낭 & 호이안",
      title: "가족 맞춤형 VIP 프라이빗 테마 투어",
      image: "/assets/danang.png",
      youtubeUrl: "https://www.youtube.com/embed/W_N5fKOfv1s",
      features: ["어린이/어르신 맞춤 일정", "현지 세무 및 증빙 지원", "팀빌딩 액티비티 기획"],
      rating: 5.0,
      reviewCount: 89,
      reviews: [
        { nickname: "가족여행자", rating: 5, comment: "아이들과 함께했는데 너무 세심하게 챙겨주셨어요.", date: "2026-04-05" }
      ],
      detailedPlan: {
        itinerary: [
          { day: 1, title: "다낭 입성 및 야경 크루즈", content: "다낭 공항 미팅 후 호텔 체크인, 저녁엔 한강(Han River) 용다리 근처 야경 크루즈를 탑승합니다." },
          { day: 2, title: "바나힐 테마파크 & 호이안 올드타운", content: "종일 바나힐에서 즐거운 시간을 보낸 후, 저녁엔 등불이 아름다운 호이안 올드타운을 방문합니다." },
          { day: 3, title: "리조트 휴양 및 다낭 시내 쇼핑", content: "리조트 내 수영장에서 오전 휴식 후, 한시장 및 롯데마트 등에서 쇼핑 리스트를 완성합니다." }
        ],
        pricing: "1인당 약 120만원 (항공권 별도)",
        inclusions: ["전 일정 한국어 가능 전담 가이드", "테마파크 입장권", "프리미엄 리조트 숙박"],
        exclusions: ["항공권", "매너팁", "저녁 자유 선택식"],
        proTip: "호이안은 밤이 가장 아름답습니다. 가이드에게 예쁜 사진 포인트 공유를 꼭 요청하세요!"
      }
    },
    {
      designer: "John Smith",
      region: "라오스 비엔티엔",
      title: "에코 로컬 투어 & 프라이빗 힐링 투어",
      image: "/assets/laos.png",
      youtubeUrl: "https://www.youtube.com/embed/uP2A_1pXAnA",
      features: ["지속 가능한 여행 설계", "메콩강 선셋 디너 기획", "디지털 가이드북 제공"],
      rating: 4.8,
      reviewCount: 56,
      reviews: [
        { nickname: "백패커", rating: 4, comment: "현지 로컬 맛집 정보가 정말 유용했습니다.", date: "2026-04-08" }
      ],
      detailedPlan: {
        itinerary: [
          { day: 1, title: "비엔티엔 도착 및 사찰 탐방", content: "파탓루앙 등 주요 사원 방문 후 메콩강변 시장에서 로컬들의 활기를 느껴봅니다." },
          { day: 2, title: "로컬 오가닉 팜 체험 & 쿠킹 클래스", content: "현지 농장에서 재료를 직접 수확하고 라오스 전통 요리를 배워보는 시간을 가집니다." },
          { day: 3, title: "카페 투어 및 평화로운 귀국 준비", content: "라오스 특유의 느린 감성이 묻어나는 카페에서 시간을 보낸 후 공항으로 이동합니다." }
        ],
        pricing: "1인당 약 90만원 (항공권 별도)",
        inclusions: ["에코 숙소 연동 서비스", "쿠킹 클래스 비용", "전 일정 프라이빗 가이드"],
        exclusions: ["항공권", "개인 쇼핑 비용"],
        proTip: "라오스는 시간이 느리게 흐릅니다. 바쁜 일정보다 여유로운 걸음걸이로 즐겨보시길 추천해요."
      }
    },
    {
      designer: "Maria Garcia",
      region: "태국 방콕",
      title: "퍼스널 쇼퍼 & 루프탑 시티 나이트 투어",
      image: "/assets/bangkok.png",
      youtubeUrl: "https://www.youtube.com/embed/A8qUenW3jXY",
      features: ["단독 프라이빗 요트 대여", "유명 루프탑 바 우선 예약", "쇼핑 가이드 서비스"],
      rating: 4.7,
      reviewCount: 32,
      reviews: [
        { nickname: "시티라이프", rating: 5, comment: "방콕의 야경을 가장 멋지게 즐길 수 있는 방법이었어요.", date: "2026-04-12" }
      ],
      detailedPlan: {
        itinerary: [
          { day: 1, title: "방콕 체크인 및 프라이빗 요트 디너", content: "짜오프라야 강에서 단독 요트를 타고 화려한 야경을 감상하며 프라이빗 디너를 만끽합니다." },
          { day: 2, title: "퍼스널 쇼핑 가이드 & 루프탑 바", content: "시내 주요 쇼핑몰에서 퍼스널 가이드를 받고, 밤에는 방콕 최고의 루프탑에서 칵테일을 즐깁니다." },
          { day: 3, title: "고메 투어 및 귀국 서비스", content: "현지 미슐랭 식당 방문 후 스파 서비스로 피로를 풀고 의전 차량으로 공항까지 배웅해 드립니다." }
        ],
        pricing: "1인당 약 180만원 (항공권 별도)",
        inclusions: ["단독 요트 대여료", "루프탑 바 예약 대행", "고급 스파 이용권"],
        exclusions: ["항공권", "개인 식비", "주류 비용"],
        proTip: "방콕 루프탑 바는 복장 규정이 있을 수 있습니다. 스마트 캐주얼 의상을 준비해 주세요!"
      }
    }
  ],

  admin: {
    stats: [
      { label: "총 활동 여행설계사", value: "4명" },
      { label: "승인 대기 건수", value: "0" },
      { label: "누적 고객 평점", value: "4.8 / 5.0" }
    ],
    designers: [
      { id: 1, name: "Alex Kim", region: "필리핀", totalProposals: 45, rating: 4.9, reviewCount: 124, status: "Active", reviews: [] },
      { id: 2, name: "Sarah Lee", region: "베트남", totalProposals: 12, rating: 5.0, reviewCount: 89, status: "Active", reviews: [] },
      { id: 3, name: "John Smith", region: "라오스", totalProposals: 28, rating: 4.8, reviewCount: 56, status: "Active", reviews: [] },
      { id: 4, name: "Maria Garcia", region: "태국", totalProposals: 5, rating: 4.7, reviewCount: 32, status: "Active", reviews: [] },
    ]
  },

  designerDashboard: {
    stats: [
      { label: "대기중인 제안", value: "5건" },
      { label: "확정된 일정", value: "2건" },
      { label: "매칭 확률", value: "78%" }
    ],
    proposals: [
      { id: 1, designer: "Alex Kim", region: "태국 방콕", title: "프리미엄 고객 인센티브 투어", status: "검토중", date: "2026-04-12" },
      { id: 2, designer: "Sarah Lee", region: "베트남 다낭", title: "VIP 고객 맞춤 특화 여행", status: "확정", date: "2026-04-10" },
      { id: 3, designer: "John Smith", region: "필리핀 클락", title: "골프 & 비즈니스 투어 토탈 케어", status: "완료", date: "2026-04-05" },
    ],
    settlements: [
      { id: 1, date: "2026-04-01", project: "방콕 럭셔리 효도 관광", amount: "₩2,500,000", status: "지급완료" },
      { id: 2, date: "2026-03-25", project: "다낭 패밀리 서머 투어", amount: "₩1,800,000", status: "지급완료" },
      { id: 3, date: "2026-04-10", project: "마닐라 비즈니스 트립", amount: "₩4,200,000", status: "정산대기" },
    ],
    profile: {
      name: "홍길동 (Alex)",
      expertField: "태국/베트남 프리미엄 투어",
      contact: "010-1234-5678",
      availableRegions: "동남아 전역, 일본, 괌",
      bio: "15년 경력의 베테랑 여행 설계사입니다. 단순한 관광이 아닌, 고객의 가치관과 목적에 가장 부합하는 여정을 설계해 드립니다.",
      career: "- 관광통역안내사 (태국어, 영어)\n- 前 OO투어 동남아 팀장\n- 2,000건 이상의 인센티브 투어 기획 경험",
      bankInfo: "국민은행 123-4567-890 (예금주: 홍길동)"
    }
  },

  tv: [
    {
      id: 1,
      designer: "Alex Kim",
      title: "따가이다이 화산 투어의 모든 것 (VLOG)",
      thumbnail: "/assets/tagaytay.png",
      youtubeUrl: "https://www.youtube.com/embed/5mHn9E5vKFA",
      category: "필리핀",
      views: "1.2K",
      duration: "08:24"
    },
    {
      id: 2,
      designer: "Sarah Lee",
      title: "다낭 밤거리 100% 즐기기 (현지인 추천)",
      thumbnail: "/assets/danang.png",
      youtubeUrl: "https://www.youtube.com/embed/W_N5fKOfv1s",
      category: "베트남",
      views: "3.5K",
      duration: "12:45"
    },
    {
      id: 3,
      designer: "John Smith",
      title: "라오스 비엔티엔의 평화로운 아침",
      thumbnail: "/assets/laos.png",
      youtubeUrl: "https://www.youtube.com/embed/uP2A_1pXAnA",
      category: "라오스",
      views: "890",
      duration: "05:12"
    },
    {
      id: 4,
      designer: "Maria Garcia",
      title: "방콕 럭셔리 요트 투어 하이라이트",
      thumbnail: "/assets/bangkok.png",
      youtubeUrl: "https://www.youtube.com/embed/A8qUenW3jXY",
      category: "태국",
      views: "2.1K",
      duration: "10:30"
    }
  ],
  pendingDesigners: [],
  notices: [
    {
      id: 1,
      category: "NOTICE",
      title: "동남아시아 주요 지역 여행 안전 지침 업데이트",
      date: "2026-04-20",
      content: "필리핀 클락 및 베트남 일부 지역의 최신 안전 지침이 업데이트되었습니다. 설계사분들은 제안서 작성 시 참고 바랍니다."
    },
    {
      id: 2,
      category: "NEWS",
      title: "GIJO TOUR, 신규 럭셔리 요트 파트너십 체결",
      date: "2026-04-18",
      content: "태국 방콕 및 푸켓 지역에서 단독 이용 가능한 럭셔리 요트 업체 3곳과 신규 제휴를 맺었습니다."
    },
    {
      id: 3,
      category: "UPDATE",
      title: "정산 시스템 UI 개선 및 보안 강화 안내",
      date: "2026-04-15",
      content: "여행설계사 대시보드의 정산 내역 확인 화면이 더욱 직관적으로 개선되었습니다. 다중 인증(MFA) 설정을 권장합니다."
    }
  ]
};
