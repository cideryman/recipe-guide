// recipe-data.js
// 레시피 관련 데이터를 분리하여 관리합니다.

const RECIPE_DATA = {
  aeropress: {
    id: "aeropress",
    title: "아메리카노",
    coverImage: "assets/thumbnails/americano.jpg", // 최적화된 썸네일 이미지 사용
    temperature: "ice",
    steps: [
      {
        id: 1,
        title: "물 끓이기",
        image: "assets/aeropress/step-01.jpg",
        instruction: [
          "전기 주전자 켜기"
        ],
        speech: "전기 주전자에 물을 넣고, 전원 버튼을 눌러 물을 끓여주세요.",
        type: "normal"
      },
      {
        id: 2,
        title: "커피 저울에 재기",
        image: "assets/aeropress/step-02.jpg",
        instruction: [
          "원두 20g 재기"
        ],
        speech: "저울에 원두 컵을 올리고, 원두 20그램을 담아주세요.",
        type: "normal"
      },
      {
        id: 3,
        title: "커피 갈기",
        image: "assets/aeropress/step-03.jpg",
        instruction: [
          "원두 갈기"
        ],
        speech: "전동 그라인더에 원두를 넣고 스위치를 눌러 원두를 갈아주세요.",
        type: "normal"
      },
      {
        id: 4,
        title: "필터 준비하기",
        image: "assets/aeropress/step-04.jpg",
        instruction: [
          "필터 끼우고 적시기"
        ],
        speech: "종이 필터를 검정 뚜껑에 끼우고 뜨거운 물을 살짝 부어 적셔주세요.",
        type: "normal"
      },
      {
        id: 5,
        title: "에어로프레스 준비하기",
        image: "assets/aeropress/step-05.jpg",
        instruction: [
          "본체 컵 위에 올리기"
        ],
        speech: "에어로프레스 본체를 컵 위에 올려주세요.",
        type: "normal"
      },
      {
        id: 6,
        title: "얼음 담기",
        image: "assets/aeropress/step-06.jpg",
        instruction: [
          "얼음 가득 담기"
        ],
        speech: "준비한 컵에 얼음을 가득 담아주세요.",
        type: "normal"
      },
      {
        id: 7,
        title: "원두 넣기",
        image: "assets/aeropress/step-07.jpg",
        instruction: [
          "커피 가루 넣기"
        ],
        speech: "갈아둔 커피 가루를 에어로프레스 안에 부어주세요.",
        type: "normal"
      },
      {
        id: 8,
        title: "물 붓기",
        image: "assets/aeropress/step-08.jpg",
        instruction: [
          "뜨거운 물 100g"
        ],
        speech: "뜨거운 물 100그램을 천천히 부어주세요.",
        type: "normal"
      },
      {
        id: 9,
        title: "저어주기",
        image: "assets/aeropress/step-09.jpg",
        instruction: [
          "스틱으로 10번"
        ],
        speech: "스틱으로 열 번 정도 저어주세요.",
        type: "normal"
      },
      {
        id: 10,
        title: "기다리기",
        image: "assets/aeropress/step-09.jpg",
        instruction: [
          "60초 기다리기"
        ],
        speech: "육십 초 동안 기다려주세요.",
        type: "timer",
        duration: 60 // 타이머 단위: 초
      },
      {
        id: 11,
        title: "천천히 눌러 내리기",
        image: "assets/aeropress/step-10.jpg",
        instruction: [
          "천천히 눌러 내리기"
        ],
        speech: "눌러내리는 막대를 끼우고 천천히 끝까지 눌러주세요. 쉬익 소리가 나면 멈춰주세요.",
        type: "normal"
      },
      {
        id: 12,
        title: "컵에 담아 완성",
        image: "assets/aeropress/step-11.jpg",
        instruction: [
          "아메리카노 완성"
        ],
        speech: "커피가 다 내려졌습니다. 완성!",
        type: "normal"
      },
      {
        id: 13,
        title: "찌꺼기 버리기",
        image: "assets/aeropress/step-12.jpg",
        instruction: [
          "커피 찌꺼기 버리기"
        ],
        speech: "검정 뚜껑을 열고 막대를 끝까지 밀어 커피 찌꺼기를 쓰레기통에 버려주세요.",
        type: "normal"
      },
      {
        id: 14,
        title: "물로 헹구기",
        image: "assets/aeropress/step-13.jpg",
        instruction: [
          "도구 깨끗이 씻기"
        ],
        speech: "사용한 도구를 흐르는 물로 깨끗이 씻어주세요.",
        type: "normal"
      }
    ]
  },
  kombucha: {
    id: "kombucha",
    title: "콤부차",
    coverImage: "assets/thumbnails/kombucha.jpg",
    temperature: "ice",
    comingSoon: false,
    preparing: false,
    steps: [
      {
        id: 1,
        title: "컵 준비하기",
        image: "assets/kombucha/step-01.jpg",
        instruction: [
          "컵 한 개 준비"
        ],
        speech: "빈 테이크아웃 컵을 하나 준비해서 작업대 한가운데에 놓아주세요.",
        type: "normal"
      },
      {
        id: 2,
        title: "콤부차 준비하기",
        image: "assets/kombucha/step-02.jpg",
        instruction: [
          "콤부차 1개 준비"
        ],
        speech: "오 그램짜리 콤부차 봉투 한 개를 준비해 주세요.",
        type: "normal"
      },
      {
        id: 3,
        title: "콤부차 뜯기",
        image: "assets/kombucha/step-03.jpg",
        instruction: [
          "절취선 뜯기"
        ],
        speech: "봉투 윗부분의 자르는 선을 찾아서, 양손으로 잡고 힘을 주어 찢어서 열어주세요.",
        type: "normal"
      },
      {
        id: 4,
        title: "콤부차 넣기",
        image: "assets/kombucha/step-04.jpg",
        instruction: [
          "분말 모두 넣기"
        ],
        speech: "봉투를 기울여 컵 안에 분말을 남김없이 탈탈 털어 넣어주세요.",
        type: "normal"
      },
      {
        id: 5,
        title: "물 조금 넣기",
        image: "assets/kombucha/step-05.jpg",
        instruction: [
          "물 조금 넣기"
        ],
        speech: "물병을 기울여 컵 맨 아래의 표시선까지만 물을 조금 부어주세요.",
        type: "normal"
      },
      {
        id: 6,
        title: "잘 저어주기",
        image: "assets/kombucha/step-06.jpg",
        instruction: [
          "가루 없이 저어주기"
        ],
        speech: "스푼으로 컵 바닥까지 저어주세요. 바닥에 가루가 완전히 안 보일 때까지 저어주시면 됩니다.",
        type: "normal"
      },
      {
        id: 7,
        title: "얼음 넣기",
        image: "assets/kombucha/step-07.jpg",
        instruction: [
          "얼음 넣기"
        ],
        speech: "얼음 스쿱으로 얼음을 담아, 물이 튀지 않게 컵 입구 가까이에서 넣어주세요.",
        type: "normal"
      },
      {
        id: 8,
        title: "물 채우기",
        image: "assets/kombucha/step-08.jpg",
        instruction: [
          "물 기준선까지"
        ],
        speech: "물병을 기울여 컵 옆면에 표시된 파란색 가이드라인 선까지만 물을 부어 채워주세요.",
        type: "normal"
      },
      {
        id: 9,
        title: "한 번 더 저어주기",
        image: "assets/kombucha/step-09.jpg",
        instruction: [
          "가볍게 2~3번"
        ],
        speech: "스푼으로 얼음과 음료를 가볍게 섞기 위해 천천히 두 번에서 세 번 정도만 가볍게 저어주세요.",
        type: "normal"
      },
      {
        id: 10,
        title: "뚜껑 닫고 완성하기",
        image: "assets/kombucha/step-10.jpg",
        instruction: [
          "뚜껑 닫고 확인"
        ],
        speech: "뚜껑을 컵 위에 똑바로 올려놓고, 딸깍 소리가 날 때까지 가장자리를 꾹 눌러 닫아서 완성해 주세요.",
        type: "normal"
      }
    ]
  },
  iceVanillaLatte: {
    id: "iceVanillaLatte",
    title: "바닐라라떼",
    coverImage: "assets/iceVanillaLatte/cover.webp",
    temperature: "ice",
    comingSoon: false,
    preparing: false,
    steps: [
      {
        id: 1,
        title: "컵 준비하기",
        image: "assets/iceVanillaLatte/step-01.webp",
        instruction: [
          "컵 한 개 준비"
        ],
        speech: "빈 테이크아웃 컵을 하나 준비해서 작업대 한가운데에 놓아주세요.",
        type: "normal"
      },
      {
        id: 2,
        title: "바닐라라떼 준비하기",
        image: "assets/iceVanillaLatte/step-02.webp",
        instruction: [
          "스틱 2개 준비"
        ],
        speech: "바닐라라떼 파우더 스틱 두 개를 준비해 주세요. 스틱이 두 개가 맞는지 꼭 확인해 보세요.",
        type: "normal"
      },
      {
        id: 3,
        title: "스틱 뜯기",
        image: "assets/iceVanillaLatte/step-03.webp",
        instruction: [
          "절취선 뜯기"
        ],
        speech: "스틱 윗부분의 자르는 선을 찾아서, 양손으로 힘을 주어 찢어서 열어주세요. 두 개 모두 똑같이 뜯어 줍니다.",
        type: "normal"
      },
      {
        id: 4,
        title: "바닐라라떼 넣기",
        image: "assets/iceVanillaLatte/step-04.webp",
        instruction: [
          "분말 모두 넣기"
        ],
        speech: "스틱을 기울여 컵 안에 분말 가루를 남김없이 탈탈 털어 넣어주세요. 두 봉지 가루를 모두 컵에 넣어 줍니다.",
        type: "normal"
      },
      {
        id: 5,
        title: "뜨거운 물 넣기",
        image: "assets/iceVanillaLatte/step-05.webp",
        instruction: [
          "뜨거운 물 80mL"
        ],
        speech: "뜨거운 물을 조심해서 계량컵의 빨간 표시선까지 받아 컵에 모두 부어주세요. 뜨거우니 손 조심하세요.",
        type: "normal"
      },
      {
        id: 6,
        title: "잘 저어주기",
        image: "assets/iceVanillaLatte/step-06.webp",
        instruction: [
          "가루 없이 저어주기"
        ],
        speech: "숟가락으로 컵 바닥까지 깊게 저어주세요. 바닥에 가루 덩어리가 완전히 안 보일 때까지 충분히 저어서 녹여줍니다.",
        type: "normal"
      },
      {
        id: 7,
        title: "얼음 넣기",
        image: "assets/iceVanillaLatte/step-07.webp",
        instruction: [
          "얼음 가득 넣기"
        ],
        speech: "얼음 스쿱으로 얼음을 담아, 물이 튀지 않게 컵 입구 가까이에서 넣어주세요. 얼음으로 컵을 가득 채워 줍니다.",
        type: "normal"
      },
      {
        id: 8,
        title: "찬물 채우기",
        image: "assets/iceVanillaLatte/step-08.webp",
        instruction: [
          "찬물 기준선까지"
        ],
        speech: "물병을 기울여 컵 옆면에 표시된 초록색 가이드선까지만 찬물을 채워 부어주세요.",
        type: "normal"
      },
      {
        id: 9,
        title: "한 번 더 저어주기",
        image: "assets/iceVanillaLatte/step-09.webp",
        instruction: [
          "가볍게 2~3번"
        ],
        speech: "숟가락으로 음료를 가볍게 섞기 위해 천천히 두 번에서 세 번 정도만 살짝 저어주세요.",
        type: "normal"
      },
      {
        id: 10,
        title: "뚜껑 닫고 완성하기",
        image: "assets/iceVanillaLatte/step-10.webp",
        instruction: [
          "뚜껑 닫고 확인"
        ],
        speech: "뚜껑을 컵 위에 똑바로 올려놓고, 딸깍 소리가 날 때까지 가장자리를 꾹 눌러 닫아서 완성해 주세요.",
        type: "normal"
      }
    ]
  },

  matchaLatte: {
    id: "matchaLatte",
    title: "말차 바닐라라떼",
    coverImage: "assets/thumbnails/matcha_latte.jpg",
    temperature: "ice",
    comingSoon: false,
    preparing: false,
    steps: [
      {
        id: 1,
        title: "컵 준비하기",
        image: "assets/matchaLatte/step-01.webp",
        instruction: [
          "컵 한 개 준비"
        ],
        speech: "컵 한 개를 준비해요.",
        type: "normal"
      },
      {
        id: 2,
        title: "스틱 2개 준비하기",
        image: "assets/matchaLatte/step-02.webp",
        instruction: [
          "스틱 2개 준비"
        ],
        speech: "말차 바닐라라떼 스틱 2개를 준비해요.",
        type: "normal"
      },
      {
        id: 3,
        title: "스틱 뜯기",
        image: "assets/matchaLatte/step-03.webp",
        instruction: [
          "절취선 뜯기"
        ],
        speech: "절취선을 찾아 천천히 뜯어요. 스틱 2개를 모두 뜯어요.",
        type: "normal"
      },
      {
        id: 4,
        title: "분말 넣기",
        image: "assets/matchaLatte/step-04.webp",
        instruction: [
          "분말 모두 넣기"
        ],
        speech: "스틱 2개의 분말을 컵에 모두 넣어요.",
        type: "normal"
      },
      {
        id: 5,
        title: "뜨거운 물 넣기",
        image: "assets/matchaLatte/step-05.webp",
        instruction: [
          "뜨거운 물 80mL"
        ],
        speech: "뜨거운 물 80밀리리터를 넣어요. 뜨거우니 천천히 기준선까지 부어요.",
        type: "normal"
      },
      {
        id: 6,
        title: "잘 저어주기",
        image: "assets/matchaLatte/step-06.webp",
        instruction: [
          "가루 없이 저어주기"
        ],
        speech: "가루가 없어질 때까지 잘 저어요. 컵 바닥과 옆면에 붙은 가루도 모두 섞어요.",
        type: "normal"
      },
      {
        id: 7,
        title: "얼음 넣기",
        image: "assets/matchaLatte/step-07.webp",
        instruction: [
          "얼음 가득 넣기"
        ],
        speech: "얼음을 컵 위까지 가득 넣어요.",
        type: "normal"
      },
      {
        id: 8,
        title: "찬물 채우기",
        image: "assets/matchaLatte/step-08.webp",
        instruction: [
          "찬물 기준선까지"
        ],
        speech: "찬물을 컵의 기준선까지 천천히 채워요.",
        type: "normal"
      },
      {
        id: 9,
        title: "한 번 더 저어주기",
        image: "assets/matchaLatte/step-09.webp",
        instruction: [
          "가볍게 2~3번"
        ],
        speech: "가볍게 2번에서 3번 저어요. 너무 세게 젓지 않아요.",
        type: "normal"
      },
      {
        id: 10,
        title: "뚜껑 닫고 완성하기",
        image: "assets/matchaLatte/step-10.webp",
        instruction: [
          "뚜껑 닫고 확인"
        ],
        speech: "한 손으로 컵을 잡아요. 다른 손으로 뚜껑을 맞추고 가장자리를 눌러 닫아요. 뚜껑이 잘 닫혔는지 확인해요.",
        type: "normal"
      }
    ]
  }
};

// 모듈 환경과 전역 환경 모두에서 사용할 수 있도록 내보냅니다.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RECIPE_DATA;
} else {
  window.RECIPE_DATA = RECIPE_DATA;
}
