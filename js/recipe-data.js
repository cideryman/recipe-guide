// recipe-data.js
// 레시피 관련 데이터를 분리하여 관리합니다.

const RECIPE_DATA = {
  aeropress: {
    id: "aeropress",
    title: "아메리카노(에어로프레스)",
    coverImage: "assets/thumbnails/americano.jpg", // 최적화된 썸네일 이미지 사용
    steps: [
      {
        id: 1,
        title: "물 끓이기",
        image: "assets/aeropress/step-01.jpg",
        instruction: [
          "전기 주전자에 물을 넣어요.",
          "전원 버튼을 눌러 물을 끓여요."
        ],
        speech: "전기 주전자에 물을 넣고, 전원 버튼을 눌러 물을 끓여주세요.",
        type: "normal"
      },
      {
        id: 2,
        title: "커피 저울에 재기",
        image: "assets/aeropress/step-02.jpg",
        instruction: [
          "저울에 원두 컵을 올려요.",
          "저울 화면에 '20.0'이 나올 때까지 원두를 담아요."
        ],
        speech: "저울에 원두 컵을 올리고, 저울 화면에 이십 점 영이라는 숫자가 나올 때까지 원두를 담아주세요.",
        type: "normal"
      },
      {
        id: 3,
        title: "커피 갈기",
        image: "assets/aeropress/step-03.jpg",
        instruction: [
          "전동 그라인더에 원두를 넣어요.",
          "스위치를 눌러 원두를 갈아요."
        ],
        speech: "전동 그라인더에 원두를 넣고 스위치를 눌러 원두를 갈아주세요.",
        type: "normal"
      },
      {
        id: 4,
        title: "필터 준비하기",
        image: "assets/aeropress/step-04.jpg",
        instruction: [
          "종이 필터를 검정 뚜껑에 끼워요.",
          "뜨거운 물을 살짝 부어 적셔요."
        ],
        speech: "종이 필터를 검정 뚜껑에 끼우고 뜨거운 물을 살짝 부어 적셔주세요.",
        type: "normal"
      },
      {
        id: 5,
        title: "에어로프레스 준비하기",
        image: "assets/aeropress/step-05.jpg",
        instruction: [
          "에어로프레스 본체를 컵 위에 올려요."
        ],
        speech: "에어로프레스 본체를 컵 위에 올려주세요.",
        type: "normal"
      },
      {
        id: 6,
        title: "얼음 담기",
        image: "assets/aeropress/step-06.jpg",
        instruction: [
          "준비한 컵에 얼음을 가득 담아요."
        ],
        speech: "준비한 컵에 얼음을 가득 담아주세요.",
        type: "normal"
      },
      {
        id: 7,
        title: "원두 넣기",
        image: "assets/aeropress/step-07.jpg",
        instruction: [
          "갈아둔 커피 가루를 에어로프레스 안에 부어요."
        ],
        speech: "갈아둔 커피 가루를 에어로프레스 안에 부어주세요.",
        type: "normal"
      },
      {
        id: 8,
        title: "물 붓기",
        image: "assets/aeropress/step-08.jpg",
        instruction: [
          "저울 화면에 '100.0'이 나올 때까지 뜨거운 물을 천천히 부어요."
        ],
        speech: "저울 화면에 백 점 영이 나올 때까지 뜨거운 물을 천천히 부어주세요.",
        type: "normal"
      },
      {
        id: 9,
        title: "저어주기",
        image: "assets/aeropress/step-09.jpg",
        instruction: [
          "스틱으로 10번 정도 저어줘요."
        ],
        speech: "스틱으로 열 번 정도 저어주세요.",
        type: "normal"
      },
      {
        id: 10,
        title: "기다리기",
        image: "assets/aeropress/step-09.jpg",
        instruction: [
          "60초 동안 기다려요."
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
          "눌러내리는 막대를 끼우고 천천히 끝까지 눌러요.",
          "쉬익 소리가 나면 멈춰요."
        ],
        speech: "눌러내리는 막대를 끼우고 천천히 끝까지 눌러주세요. 쉬익 소리가 나면 멈춰주세요.",
        type: "normal"
      },
      {
        id: 12,
        title: "컵에 담아 완성",
        image: "assets/aeropress/step-11.jpg",
        instruction: [
          "커피가 다 내려졌어요.",
          "맛있게 즐겨요!"
        ],
        speech: "커피가 다 내려졌습니다. 완성!",
        type: "normal"
      },
      {
        id: 13,
        title: "찌꺼기 버리기",
        image: "assets/aeropress/step-12.jpg",
        instruction: [
          "검정 뚜껑을 열고 막대를 끝까지 밀어요.",
          "커피 찌꺼기를 쓰레기통에 버려요."
        ],
        speech: "검정 뚜껑을 열고 막대를 끝까지 밀어 커피 찌꺼기를 쓰레기통에 버려주세요.",
        type: "normal"
      },
      {
        id: 14,
        title: "물로 헹구기",
        image: "assets/aeropress/step-13.jpg",
        instruction: [
          "사용한 도구를 물로 깨끗이 씻어요."
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
    comingSoon: false,
    preparing: false,
    steps: [
      {
        id: 1,
        title: "컵 준비하기",
        image: "assets/kombucha/step-01.jpg",
        instruction: [
          "빈 테이크아웃 컵을 하나 준비해요.",
          "컵을 작업대 한가운데에 놓아요."
        ],
        speech: "빈 테이크아웃 컵을 하나 준비해서 작업대 한가운데에 놓아주세요.",
        type: "normal"
      },
      {
        id: 2,
        title: "콤부차 준비하기",
        image: "assets/kombucha/step-02.jpg",
        instruction: [
          "5g 콤부차 봉투 1개를 준비해요.",
          "흰색 무지 봉투 1개만 골라요."
        ],
        speech: "오 그램짜리 콤부차 봉투 한 개를 준비해 주세요.",
        type: "normal"
      },
      {
        id: 3,
        title: "콤부차 뜯기",
        image: "assets/kombucha/step-03.jpg",
        instruction: [
          "봉투 윗부분의 자르는 선을 찾아요.",
          "양손으로 잡고 힘을 주어 찢어서 열어요."
        ],
        speech: "봉투 윗부분의 자르는 선을 찾아서, 양손으로 잡고 힘을 주어 찢어서 열어주세요.",
        type: "normal"
      },
      {
        id: 4,
        title: "콤부차 넣기",
        image: "assets/kombucha/step-04.jpg",
        instruction: [
          "봉투를 기울여 컵에 분말을 넣어요.",
          "가루가 남지 않도록 컵 안에 탈탈 털어 넣어요."
        ],
        speech: "봉투를 기울여 컵 안에 분말을 남김없이 탈탈 털어 넣어주세요.",
        type: "normal"
      },
      {
        id: 5,
        title: "물 조금 넣기",
        image: "assets/kombucha/step-05.jpg",
        instruction: [
          "물병을 기울여 컵에 물을 부어요.",
          "컵 맨 아래의 표시선까지만 조금 부어요."
        ],
        speech: "물병을 기울여 컵 맨 아래의 표시선까지만 물을 조금 부어주세요.",
        type: "normal"
      },
      {
        id: 6,
        title: "잘 저어주기",
        image: "assets/kombucha/step-06.jpg",
        instruction: [
          "스푼으로 컵 바닥까지 저어요.",
          "바닥에 가루가 완전히 안 보일 때까지 저어요."
        ],
        speech: "스푼으로 컵 바닥까지 저어주세요. 바닥에 가루가 완전히 안 보일 때까지 저어주시면 됩니다.",
        type: "normal"
      },
      {
        id: 7,
        title: "얼음 넣기",
        image: "assets/kombucha/step-07.jpg",
        instruction: [
          "얼음 스쿱을 사용하여 컵에 얼음을 넣어요.",
          "물이 튀지 않게 컵 입구 가까이에서 넣어요."
        ],
        speech: "얼음 스쿱으로 얼음을 담아, 물이 튀지 않게 컵 입구 가까이에서 넣어주세요.",
        type: "normal"
      },
      {
        id: 8,
        title: "물 채우기",
        image: "assets/kombucha/step-08.jpg",
        instruction: [
          "물병을 기울여 컵에 물을 채워요.",
          "컵 옆면에 표시된 파란색 선까지만 물을 채워요."
        ],
        speech: "물병을 기울여 컵 옆면에 표시된 파란색 가이드라인 선까지만 물을 부어 채워주세요.",
        type: "normal"
      },
      {
        id: 9,
        title: "한 번 더 저어주기",
        image: "assets/kombucha/step-09.jpg",
        instruction: [
          "스푼으로 얼음과 음료를 가볍게 섞어요.",
          "천천히 2번에서 3번만 가볍게 돌려줘요."
        ],
        speech: "스푼으로 얼음과 음료를 가볍게 섞기 위해 천천히 두 번에서 세 번 정도만 가볍게 저어주세요.",
        type: "normal"
      },
      {
        id: 10,
        title: "뚜껑 닫고 완성하기",
        image: "assets/kombucha/step-10.jpg",
        instruction: [
          "뚜껑을 컵 위에 똑바로 올려놓아요.",
          "딸깍! 소리가 날 때까지 가장자리를 꾹 눌러 닫아요."
        ],
        speech: "뚜껑을 컵 위에 똑바로 올려놓고, 딸깍 소리가 날 때까지 가장자리를 꾹 눌러 닫아서 완성해 주세요.",
        type: "normal"
      }
    ]
  },
  vanillaLatte: {
    id: "vanillaLatte",
    title: "바닐라라떼",
    coverImage: "assets/thumbnails/vanilla_latte.jpg",
    comingSoon: false,
    preparing: true,
    steps: [
      {
        id: 1,
        title: "컵 준비하기",
        image: "assets/thumbnails/vanilla_latte.jpg",
        instruction: [
          "깨끗한 유리컵을 준비해요."
        ],
        speech: "깨끗한 유리컵을 준비해주세요.",
        type: "normal"
      },
      {
        id: 2,
        title: "시럽과 우유 담기",
        image: "assets/thumbnails/vanilla_latte.jpg",
        instruction: [
          "바닐라 시럽 2펌프와 우유 150ml를 부어요."
        ],
        speech: "바닐라 시럽 두 펌프와 우유 백 오십 밀리리터를 부어주세요.",
        type: "normal"
      },
      {
        id: 3,
        title: "에스프레소 넣기",
        image: "assets/thumbnails/vanilla_latte.jpg",
        instruction: [
          "추출한 에스프레소 샷을 천천히 부어줘요."
        ],
        speech: "추출한 에스프레소 샷을 천천히 부어주세요.",
        type: "normal"
      },
      {
        id: 4,
        title: "컵에 담아 완성",
        image: "assets/thumbnails/vanilla_latte.jpg",
        instruction: [
          "바닐라라떼가 완성되었습니다. 맛있게 즐겨요!"
        ],
        speech: "바닐라라떼가 완성되었습니다. 맛있게 즐겨보세요!",
        type: "normal"
      }
    ]
  },
  matchaLatte: {
    id: "matchaLatte",
    title: "말차 바닐라라떼",
    coverImage: "assets/thumbnails/matcha_latte.jpg",
    comingSoon: false,
    preparing: true,
    steps: [
      {
        id: 1,
        title: "말차 준비하기",
        image: "assets/thumbnails/matcha_latte.jpg",
        instruction: [
          "말차 가루 3g을 따뜻한 물에 덩어리 없이 잘 개어줘요."
        ],
        speech: "말차 가루 삼 그램을 따뜻한 물에 덩어리 없이 잘 개어주세요.",
        type: "normal"
      },
      {
        id: 2,
        title: "컵에 시럽과 우유 담기",
        image: "assets/thumbnails/matcha_latte.jpg",
        instruction: [
          "바닐라 시럽 1펌프와 차가운 우유 120ml를 넣어요."
        ],
        speech: "바닐라 시럽 한 펌프와 차가운 우유 백 이십 밀리리터를 넣어주세요.",
        type: "normal"
      },
      {
        id: 3,
        title: "말차 붓기",
        image: "assets/thumbnails/matcha_latte.jpg",
        instruction: [
          "준비한 말차 액을 우유 위에 천천히 부어 층을 만들어요."
        ],
        speech: "준비한 말차 액을 우유 위에 천천히 부어 아름다운 층을 만들어주세요.",
        type: "normal"
      },
      {
        id: 4,
        title: "완성",
        image: "assets/thumbnails/matcha_latte.jpg",
        instruction: [
          "말차 바닐라라떼가 완성되었습니다!"
        ],
        speech: "말차 바닐라라떼가 완성되었습니다!",
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
