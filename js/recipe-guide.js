const RecipeGuide = (function() {
  let state = {
    recipe: null,
    currentStepIndex: 0,
    completedSteps: [],
    timerInterval: null,
    timerRemaining: 0,
    isTimerRunning: false,
    synth: window.speechSynthesis,
    isSpeaking: false,
    isTtsEnabled: false
  };

  // DOM 요소 참조를 저장할 변수
  let els = {};

  // localStorage 키 접두사
  const STORAGE_KEY = 'recipe-guide-state-';

  /**
   * 앱 초기화
   * @param {string} recipeId 
   */
  function init(recipeId) {
    // 기본 HTML 구조 생성
    renderAppStructure();
    
    // DOM 요소 참조 캐싱
    cacheDOM();
    
    // 이벤트 리스너 바인딩
    bindEvents();

    if (recipeId && window.RECIPE_DATA && window.RECIPE_DATA[recipeId]) {
      loadRecipe(recipeId);
    } else {
      showScreen('home');
      renderHome();
    }
  }

  function loadRecipe(recipeId) {
    if (!window.RECIPE_DATA || !window.RECIPE_DATA[recipeId]) {
      console.error(`Recipe ${recipeId} not found.`);
      showScreen('home');
      renderHome();
      return;
    }

    state.recipe = window.RECIPE_DATA[recipeId];
    loadState(recipeId);

    if (state.currentStepIndex > 0 || state.completedSteps.length > 0) {
      if (state.completedSteps.length === state.recipe.steps.length) {
        showScreen('complete');
      } else {
        showScreen('step');
        renderStep(state.currentStepIndex);
      }
    } else {
      showScreen('start');
      renderStart();
    }
  }

  function loadState(recipeId) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + recipeId);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.currentStepIndex = parsed.currentStepIndex || 0;
        state.completedSteps = parsed.completedSteps || [];
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY + state.recipe.id, JSON.stringify({
        currentStepIndex: state.currentStepIndex,
        completedSteps: state.completedSteps
      }));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }

  function resetState() {
    state.currentStepIndex = 0;
    state.completedSteps = [];
    saveState();
  }

  function renderAppStructure() {
    const app = document.getElementById('recipe-guide-app');
    app.innerHTML = `
      <div class="recipe-guide-container" aria-live="polite">
        <!-- Timer Modal Overlay -->
        <div id="rg-timer-modal" class="recipe-guide-timer-modal">
          <div class="recipe-guide-timer-modal-content">
            <button id="rg-btn-modal-timer-close" class="recipe-guide-timer-modal-close" aria-label="타이머 닫기" title="닫기">✕</button>
            <h2 class="recipe-guide-timer-modal-title">잠시 기다려요</h2>
            <div id="rg-timer-modal-display" class="recipe-guide-timer-display">00:00</div>
            <div style="width: 100%; height: 16px; background-color: #E5E7EB; border-radius: 8px; margin: 1.5rem 0; overflow: hidden; position: relative; border: 1px solid #D1D5DB;">
              <div id="rg-timer-modal-progress" style="width: 100%; height: 100%; background-color: #F59E0B; transition: width 1s linear; border-radius: 8px;"></div>
            </div>
            <button id="rg-btn-modal-timer-toggle" class="recipe-guide-btn-timer">기다리기 시작</button>
          </div>
        </div>

        <!-- Home Screen (Menu Selection) -->
        <div id="rg-screen-home" class="recipe-guide-screen recipe-guide-home"></div>

        <!-- Start Screen -->
        <div id="rg-screen-start" class="recipe-guide-screen recipe-guide-start"></div>
        
        <!-- Step Screen -->
        <div id="rg-screen-step" class="recipe-guide-screen">
          <div class="recipe-guide-header">
            <div class="recipe-guide-progress-info">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button id="rg-btn-go-home" class="recipe-guide-btn-close-overview" aria-label="처음 화면으로 가기" title="처음으로" style="padding: 0.5rem;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </button>
                <span id="rg-progress-text"></span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button id="rg-btn-tts-toggle" class="recipe-guide-btn-close-overview" aria-label="음성 안내 켜기" style="display: flex; align-items: center; gap: 4px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                  <span>음성 켜기</span>
                </button>
                <button id="rg-btn-show-overview" class="recipe-guide-btn-close-overview" aria-label="전체 순서 보기">전체 보기</button>
              </div>
            </div>
            <div class="recipe-guide-progress-bar-bg">
              <div id="rg-progress-fill" class="recipe-guide-progress-bar-fill" style="width: 0%"></div>
            </div>
          </div>
          
          <div class="recipe-guide-step-content" id="rg-step-content">
            <!-- step info will be injected here -->
          </div>

          <div class="recipe-guide-nav">
            <button id="rg-btn-prev" class="recipe-guide-btn-prev">이전</button>
            <button id="rg-btn-next" class="recipe-guide-btn-next">다음</button>
          </div>
        </div>

        <!-- Overview Screen -->
        <div id="rg-screen-overview" class="recipe-guide-screen recipe-guide-overview">
          <h2 class="recipe-guide-overview-title">
            전체 순서
            <button id="rg-btn-hide-overview" class="recipe-guide-btn-close-overview">닫기</button>
          </h2>
          <div id="rg-overview-grid" class="recipe-guide-grid"></div>
        </div>

        <!-- Complete Screen -->
        <div id="rg-screen-complete" class="recipe-guide-screen recipe-guide-complete">
          <img src="assets/baedalwatsam/dalgomi_cheer.png" alt="성공!" class="recipe-guide-complete-character">
          <h2 class="recipe-guide-complete-title">모두 끝났어요!</h2>
          <p class="recipe-guide-complete-msg">수고하셨습니다. 맛있는 음료가 완성되었습니다.</p>
          <button id="rg-btn-restart" class="recipe-guide-btn-primary" style="margin-bottom: 1rem;">처음부터 다시 하기</button>
          <button id="rg-btn-go-home-complete" class="recipe-guide-btn-secondary">다른 음료 만들기</button>
        </div>
      </div>
    `;
  }

  function cacheDOM() {
    els.home = document.getElementById('rg-screen-home');
    els.start = document.getElementById('rg-screen-start');
    els.step = document.getElementById('rg-screen-step');
    els.overview = document.getElementById('rg-screen-overview');
    els.complete = document.getElementById('rg-screen-complete');
    
    els.timerModal = document.getElementById('rg-timer-modal');
    els.timerModalDisplay = document.getElementById('rg-timer-modal-display');
    els.timerModalProgress = document.getElementById('rg-timer-modal-progress');
    els.btnModalTimerToggle = document.getElementById('rg-btn-modal-timer-toggle');
    els.btnModalTimerClose = document.getElementById('rg-btn-modal-timer-close');

    els.progressText = document.getElementById('rg-progress-text');
    els.progressFill = document.getElementById('rg-progress-fill');
    els.stepContent = document.getElementById('rg-step-content');
    
    els.btnPrev = document.getElementById('rg-btn-prev');
    els.btnNext = document.getElementById('rg-btn-next');
    els.btnShowOverview = document.getElementById('rg-btn-show-overview');
    els.btnHideOverview = document.getElementById('rg-btn-hide-overview');
    els.btnTtsToggle = document.getElementById('rg-btn-tts-toggle');
    els.btnGoHome = document.getElementById('rg-btn-go-home');
    els.btnGoHomeComplete = document.getElementById('rg-btn-go-home-complete');
    els.btnRestart = document.getElementById('rg-btn-restart');
    els.overviewGrid = document.getElementById('rg-overview-grid');
  }

  function bindEvents() {
    els.btnPrev.addEventListener('click', goPrevStep);
    els.btnNext.addEventListener('click', goNextStep);
    els.btnShowOverview.addEventListener('click', () => {
      renderOverview();
      showScreen('overview');
    });
    els.btnHideOverview.addEventListener('click', () => {
      showScreen('step');
    });
    els.btnTtsToggle.addEventListener('click', toggleTts);
    els.btnModalTimerToggle.addEventListener('click', toggleTimer);
    els.btnModalTimerClose.addEventListener('click', () => {
      stopTimer();
      if (els.timerModal) {
        els.timerModal.classList.remove('active');
      }
      els.btnNext.disabled = false;
    });
    els.btnGoHome.addEventListener('click', () => {
      stopSpeech();
      stopTimer();
      state.recipe = null;
      showScreen('home');
      renderHome();
    });
    els.btnGoHomeComplete.addEventListener('click', () => {
      stopSpeech();
      stopTimer();
      state.recipe = null;
      showScreen('home');
      renderHome();
    });
    els.btnRestart.addEventListener('click', () => {
      resetState();
      showScreen('start');
      renderStart();
    });

    // Event delegation for dynamically created elements
    document.getElementById('recipe-guide-app').addEventListener('click', (e) => {
      // 메뉴 카드 선택
      const menuCard = e.target.closest('.recipe-guide-menu-card');
      if (menuCard && !menuCard.classList.contains('coming-soon')) {
        const recipeId = menuCard.dataset.recipeId;
        loadRecipe(recipeId);
      }
      // 다른 음료 선택하기 버튼 (시작 화면에서 홈으로)
      if (e.target.closest('#rg-btn-go-home-start')) {
        state.recipe = null;
        showScreen('home');
        renderHome();
      }
      // 시작 버튼
      if (e.target.closest('#rg-btn-start')) {
        showScreen('step');
        renderStep(state.currentStepIndex);
      }
      // 전체 보기 카드
      const card = e.target.closest('.recipe-guide-card');
      if (card) {
        const index = parseInt(card.dataset.index, 10);
        state.currentStepIndex = index;
        saveState();
        showScreen('step');
        renderStep(index);
      }
    });
  }

  function showScreen(screenId) {
    [els.home, els.start, els.step, els.overview, els.complete].forEach(el => {
      if (el) el.classList.remove('active');
    });
    if (els[screenId]) els[screenId].classList.add('active');
    
    stopSpeech();
    stopTimer();
  }

  function renderHome() {
    if (!els.home) return;
    const recipes = Object.values(window.RECIPE_DATA || {});
    
    const html = `
      <h1 class="recipe-guide-main-title">
        차근차근 카페 레시피
        <img src="assets/baedalwatsam/dalgomi_thumb.png" alt="" class="recipe-guide-main-title-icon">
      </h1>
      <p class="recipe-guide-main-subtitle">오늘 만들 음료를 선택하세요.</p>
      <div class="recipe-guide-menu-list">
        ${recipes.map(r => `
          <button class="recipe-guide-menu-card ${r.comingSoon ? 'coming-soon' : ''}" data-recipe-id="${r.id}" ${r.comingSoon ? 'disabled' : ''}>
            <img src="${r.comingSoon ? 'assets/baedalwatsam/closed-character.png' : r.coverImage}" alt="" class="recipe-guide-menu-img" onerror="this.src='https://placehold.co/150?text=Image'">
            <div class="recipe-guide-menu-info">
              <h2 class="recipe-guide-menu-title">${r.title}</h2>
              ${r.comingSoon ? 
                '<span class="recipe-guide-badge">준비 중</span>' : 
                '<span class="recipe-guide-badge active">바로 시작</span>'}
            </div>
          </button>
        `).join('')}
      </div>
    `;
    els.home.innerHTML = html;
  }

  function renderStart() {
    els.start.innerHTML = `
      <h1 class="recipe-guide-title">${state.recipe.title}</h1>
      <img src="${state.recipe.coverImage}" alt="완성된 ${state.recipe.title}" class="recipe-guide-cover-img" onerror="this.src='https://placehold.co/400?text=Image'">
      <button id="rg-btn-start" class="recipe-guide-btn-primary">시작하기</button>
      <button class="recipe-guide-btn-secondary" onclick="document.getElementById('rg-btn-show-overview').click()">전체 순서 보기</button>
      <button id="rg-btn-go-home-start" class="recipe-guide-btn-text" style="margin-top: 1.5rem; color: var(--rg-text-muted); font-weight: 600; text-decoration: underline;">다른 음료 선택하기</button>
    `;
  }

  function renderStep(index) {
    const step = state.recipe.steps[index];
    const total = state.recipe.steps.length;
    
    // Update progress
    els.progressText.textContent = `${index + 1} / ${total}`;
    els.progressFill.style.width = `${((index + 1) / total) * 100}%`;
    
    // Navigation buttons state
    els.btnPrev.style.display = index === 0 ? 'none' : 'block';
    if (index === 0) {
      els.btnNext.style.flex = '1';
    } else {
      els.btnNext.style.flex = '2';
    }

    // Build instructions HTML
    const instructionsHTML = step.instruction.map(inst => 
      `<div class="recipe-guide-instruction-item">${inst}</div>`
    ).join('');

    // Timer UI if needed
    if (step.type === 'timer') {
      const isCompleted = state.completedSteps.includes(index);
      
      if (!isCompleted) {
        els.btnNext.disabled = true;
        
        // 모달 활성화 및 리셋
        state.timerRemaining = step.duration;
        if (els.timerModalDisplay) {
          els.timerModalDisplay.textContent = formatTime(state.timerRemaining);
          els.timerModalDisplay.style.color = '#D97706';
        }
        if (els.timerModalProgress) {
          els.timerModalProgress.style.width = '100%';
          els.timerModalProgress.style.backgroundColor = '#F59E0B';
        }
        if (els.btnModalTimerToggle) {
          els.btnModalTimerToggle.textContent = '기다리기 시작';
          els.btnModalTimerToggle.disabled = false;
          els.btnModalTimerToggle.style.backgroundColor = '#F59E0B';
          els.btnModalTimerToggle.style.color = 'white';
          els.btnModalTimerToggle.classList.remove('stop');
        }
        if (els.timerModal) {
          els.timerModal.classList.add('active');
        }
      } else {
        els.btnNext.disabled = false;
        if (els.timerModal) {
          els.timerModal.classList.remove('active');
        }
      }
    } else {
      els.btnNext.disabled = false;
      if (els.timerModal) {
        els.timerModal.classList.remove('active');
      }
    }

    els.stepContent.innerHTML = `
      <div class="recipe-guide-step-image-container">
        <img src="${step.image}" alt="${step.title} 이미지" class="recipe-guide-step-image" onerror="this.src='https://placehold.co/400?text=No+Image'">
      </div>
      <div class="recipe-guide-step-details">
        <h2 class="recipe-guide-step-title">${step.title}</h2>
        <div class="recipe-guide-step-instructions">
          ${instructionsHTML}
        </div>
      </div>
    `;

    // Announce step change for screen readers via aria-live
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.classList.add('visually-hidden');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-9999px';
    liveRegion.textContent = `현재 단계: ${step.title}`;
    document.body.appendChild(liveRegion);
    setTimeout(() => liveRegion.remove(), 1000);

    // TTS 자동 재생 (활성화된 경우)
    if (state.isTtsEnabled) {
      speakCurrentStep();
    }
  }

  function renderOverview() {
    const html = state.recipe.steps.map((step, index) => {
      const isCompleted = state.completedSteps.includes(index);
      return `
        <button class="recipe-guide-card ${isCompleted ? 'completed' : ''}" data-index="${index}" aria-label="${index + 1}단계: ${step.title}">
          <div class="recipe-guide-card-check">✓</div>
          <img src="${step.image}" alt="" class="recipe-guide-card-img" onerror="this.src='https://placehold.co/200?text=${index+1}'" loading="lazy">
          <div class="recipe-guide-card-content">
            <div class="recipe-guide-card-step">Step ${index + 1}</div>
            <h3 class="recipe-guide-card-title">${step.title}</h3>
          </div>
        </button>
      `;
    }).join('');
    
    els.overviewGrid.innerHTML = html;
  }

  function goNextStep() {
    // 현재 단계 완료 처리
    if (!state.completedSteps.includes(state.currentStepIndex)) {
      state.completedSteps.push(state.currentStepIndex);
    }
    
    if (state.currentStepIndex < state.recipe.steps.length - 1) {
      state.currentStepIndex++;
      saveState();
      renderStep(state.currentStepIndex);
    } else {
      saveState();
      showScreen('complete');
    }
  }

  function goPrevStep() {
    if (state.currentStepIndex > 0) {
      state.currentStepIndex--;
      saveState();
      renderStep(state.currentStepIndex);
    }
  }

  // --- Speech API ---
  function toggleTts() {
    if (!state.synth) return;
    state.isTtsEnabled = !state.isTtsEnabled;
    
    if (els.btnTtsToggle) {
      els.btnTtsToggle.style.backgroundColor = state.isTtsEnabled ? 'var(--rg-primary)' : 'var(--rg-bg)';
      els.btnTtsToggle.style.color = state.isTtsEnabled ? 'white' : 'var(--rg-text-main)';
      
      const span = els.btnTtsToggle.querySelector('span');
      if (span) {
        span.textContent = state.isTtsEnabled ? '음성 끄기' : '음성 켜기';
      }
      
      const svg = els.btnTtsToggle.querySelector('svg');
      if (svg) {
        svg.innerHTML = state.isTtsEnabled ? 
          `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>` :
          `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
      }
    }

    if (state.isTtsEnabled) {
      speakCurrentStep();
    } else {
      stopSpeech();
    }
  }

  function speakCurrentStep() {
    if (!state.synth || !state.isTtsEnabled) return;
    
    stopSpeech(); // 진행 중인 음성 중단

    const step = state.recipe.steps[state.currentStepIndex];
    if (!step || !step.speech) return;

    const utterance = new SpeechSynthesisUtterance(step.speech);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    
    utterance.onend = () => { state.isSpeaking = false; };
    utterance.onerror = () => { state.isSpeaking = false; };
    
    state.isSpeaking = true;
    state.synth.speak(utterance);
  }

  function stopSpeech() {
    if (state.synth && state.synth.speaking) {
      state.synth.cancel();
    }
    state.isSpeaking = false;
  }

  // --- Timer ---
  function formatTime(seconds) {
    return seconds.toString().padStart(2, '0');
  }

  function toggleTimer() {
    const btn = els.btnModalTimerToggle;
    if (!btn) return;

    if (btn.textContent === '확인') {
      if (els.timerModal) {
        els.timerModal.classList.remove('active');
      }
      els.btnNext.disabled = false;
      return;
    }

    if (state.isTimerRunning) {
      // 일시정지
      clearInterval(state.timerInterval);
      state.isTimerRunning = false;
      btn.textContent = '기다리기 다시 시작';
      btn.classList.remove('stop');
    } else {
      // 시작
      if (state.timerRemaining <= 0) {
        state.timerRemaining = state.recipe.steps[state.currentStepIndex].duration;
        if (els.timerModalProgress) {
          els.timerModalProgress.style.width = '100%';
          els.timerModalProgress.style.backgroundColor = '#F59E0B';
        }
      }
      
      btn.textContent = '기다리기 일시정지';
      btn.classList.add('stop');
      state.isTimerRunning = true;
      
      state.timerInterval = setInterval(() => {
        state.timerRemaining--;
        if (els.timerModalDisplay) {
          els.timerModalDisplay.textContent = formatTime(state.timerRemaining);
        }
        
        if (els.timerModalProgress) {
          const duration = state.recipe.steps[state.currentStepIndex].duration;
          els.timerModalProgress.style.width = `${(state.timerRemaining / duration) * 100}%`;
        }
        
        if (state.timerRemaining <= 0) {
           timerComplete();
        }
      }, 1000);
    }
  }

  function stopTimer() {
    clearInterval(state.timerInterval);
    state.isTimerRunning = false;
  }

  function timerComplete() {
    stopTimer();
    const display = els.timerModalDisplay;
    const btn = els.btnModalTimerToggle;
    
    if (display) {
      display.textContent = "00";
      display.style.color = 'var(--rg-success)';
    }

    if (els.timerModalProgress) {
      els.timerModalProgress.style.width = '0%';
      els.timerModalProgress.style.backgroundColor = 'var(--rg-success)';
    }

    if (btn) {
      btn.textContent = '확인';
      btn.disabled = false;
      btn.classList.remove('stop');
      btn.style.backgroundColor = 'var(--rg-primary)';
      btn.style.color = 'white';
    }

    // 완료 알림음이나 음성
    if (state.synth) {
      const utterance = new SpeechSynthesisUtterance("기다리기가 끝났습니다. 확인 버튼을 눌러주세요.");
      utterance.lang = 'ko-KR';
      state.synth.speak(utterance);
    }

    // 다음 단계 버튼 활성화
    els.btnNext.disabled = false;
  }

  // Public API
  return {
    open: init
  };
})();

// 페이지가 로드되면 초기화합니다.
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeParam = urlParams.get('recipe');
  RecipeGuide.open(recipeParam);
});
