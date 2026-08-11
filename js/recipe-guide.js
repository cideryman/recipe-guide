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
    if (!window.RECIPE_DATA || !window.RECIPE_DATA[recipeId]) {
      console.error(`Recipe ${recipeId} not found.`);
      document.getElementById('recipe-guide-app').innerHTML = `<p>레시피를 찾을 수 없습니다.</p>`;
      return;
    }

    state.recipe = window.RECIPE_DATA[recipeId];
    
    // 이전 상태 불러오기
    loadState(recipeId);

    // 기본 HTML 구조 생성
    renderAppStructure();
    
    // DOM 요소 참조 캐싱
    cacheDOM();
    
    // 이벤트 리스너 바인딩
    bindEvents();

    // 시작 화면 표시 (현재 진행 중인 단계가 있으면 step 화면으로)
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
        <!-- Start Screen -->
        <div id="rg-screen-start" class="recipe-guide-screen recipe-guide-start"></div>
        
        <!-- Step Screen -->
        <div id="rg-screen-step" class="recipe-guide-screen">
          <div class="recipe-guide-header">
            <div class="recipe-guide-progress-info">
              <span id="rg-progress-text"></span>
              <div style="display: flex; gap: 0.5rem;">
                <button id="rg-btn-tts-toggle" class="recipe-guide-btn-close-overview" aria-label="음성 안내 켜기">음성 켜기</button>
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
            <button id="rg-btn-prev" class="recipe-guide-btn-prev">이전 단계</button>
            <button id="rg-btn-next" class="recipe-guide-btn-next">다 했어요</button>
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
          <div class="recipe-guide-complete-icon">✓</div>
          <h2 class="recipe-guide-complete-title">모두 끝났어요!</h2>
          <p class="recipe-guide-complete-msg">수고하셨습니다. 맛있는 커피가 완성되었습니다.</p>
          <button id="rg-btn-restart" class="recipe-guide-btn-primary">처음부터 다시 하기</button>
        </div>
      </div>
    `;
  }

  function cacheDOM() {
    els.start = document.getElementById('rg-screen-start');
    els.step = document.getElementById('rg-screen-step');
    els.overview = document.getElementById('rg-screen-overview');
    els.complete = document.getElementById('rg-screen-complete');
    
    els.progressText = document.getElementById('rg-progress-text');
    els.progressFill = document.getElementById('rg-progress-fill');
    els.stepContent = document.getElementById('rg-step-content');
    
    els.btnPrev = document.getElementById('rg-btn-prev');
    els.btnNext = document.getElementById('rg-btn-next');
    els.btnShowOverview = document.getElementById('rg-btn-show-overview');
    els.btnHideOverview = document.getElementById('rg-btn-hide-overview');
    els.btnTtsToggle = document.getElementById('rg-btn-tts-toggle');
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
    els.btnRestart.addEventListener('click', () => {
      resetState();
      showScreen('start');
      renderStart();
    });

    // Event delegation for dynamically created elements
    document.getElementById('recipe-guide-app').addEventListener('click', (e) => {
      // 시작 버튼
      if (e.target.closest('#rg-btn-start')) {
        showScreen('step');
        renderStep(state.currentStepIndex);
      }
      // 타이머 버튼
      if (e.target.closest('#rg-btn-timer-toggle')) {
        toggleTimer();
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
    [els.start, els.step, els.overview, els.complete].forEach(el => {
      el.classList.remove('active');
    });
    els[screenId].classList.add('active');
    
    stopSpeech();
    stopTimer();
  }

  function renderStart() {
    els.start.innerHTML = `
      <h1 class="recipe-guide-title">${state.recipe.title}</h1>
      <img src="${state.recipe.coverImage}" alt="완성된 ${state.recipe.title}" class="recipe-guide-cover-img" onerror="this.src='https://placehold.co/400?text=Image'">
      <button id="rg-btn-start" class="recipe-guide-btn-primary">시작하기</button>
      <button class="recipe-guide-btn-secondary" onclick="document.getElementById('rg-btn-show-overview').click()">전체 순서 보기</button>
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
    let timerHTML = '';
    if (step.type === 'timer') {
      const isCompleted = state.completedSteps.includes(index);
      
      if (!isCompleted) {
        els.btnNext.disabled = true;
      } else {
        els.btnNext.disabled = false;
      }

      state.timerRemaining = step.duration;
      timerHTML = `
        <div class="recipe-guide-timer-container">
          <div id="rg-timer-display" class="recipe-guide-timer-display">${formatTime(state.timerRemaining)}</div>
          <!-- 시간 양적 변화 시각화를 위한 게이지 추가 -->
          <div style="width: 100%; height: 16px; background-color: #E5E7EB; border-radius: 8px; margin: 1rem 0; overflow: hidden; position: relative; border: 1px solid #D1D5DB;">
            <div id="rg-timer-progress-fill" style="width: 100%; height: 100%; background-color: #F59E0B; transition: width 1s linear; border-radius: 8px;"></div>
          </div>
          <div class="recipe-guide-timer-controls">
            <button id="rg-btn-timer-toggle" class="recipe-guide-btn-timer">타이머 시작</button>
          </div>
        </div>
      `;
    } else {
      els.btnNext.disabled = false;
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
        ${timerHTML}
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
      els.btnTtsToggle.textContent = state.isTtsEnabled ? '음성 끄기' : '음성 켜기';
      els.btnTtsToggle.style.backgroundColor = state.isTtsEnabled ? 'var(--rg-primary)' : 'var(--rg-bg)';
      els.btnTtsToggle.style.color = state.isTtsEnabled ? 'white' : 'var(--rg-text-main)';
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
    const btn = document.getElementById('rg-btn-timer-toggle');
    if (!btn) return;

    if (state.isTimerRunning) {
      // 일시정지
      clearInterval(state.timerInterval);
      state.isTimerRunning = false;
      btn.textContent = '타이머 다시 시작';
      btn.classList.remove('stop');
    } else {
      // 시작
      if (state.timerRemaining <= 0) {
        state.timerRemaining = state.recipe.steps[state.currentStepIndex].duration;
        const progressFill = document.getElementById('rg-timer-progress-fill');
        if (progressFill) {
          progressFill.style.width = '100%';
          progressFill.style.backgroundColor = '#F59E0B';
        }
      }
      
      btn.textContent = '타이머 일시정지';
      btn.classList.add('stop');
      state.isTimerRunning = true;
      
      state.timerInterval = setInterval(() => {
        state.timerRemaining--;
        const display = document.getElementById('rg-timer-display');
        if (display) {
          display.textContent = formatTime(state.timerRemaining);
        }
        
        const progressFill = document.getElementById('rg-timer-progress-fill');
        if (progressFill) {
          const duration = state.recipe.steps[state.currentStepIndex].duration;
          progressFill.style.width = `${(state.timerRemaining / duration) * 100}%`;
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
    const display = document.getElementById('rg-timer-display');
    const btn = document.getElementById('rg-btn-timer-toggle');
    
    if (display) {
      display.textContent = "00";
      display.style.color = 'var(--rg-success)';
    }

    const progressFill = document.getElementById('rg-timer-progress-fill');
    if (progressFill) {
      progressFill.style.width = '0%';
      progressFill.style.backgroundColor = 'var(--rg-success)';
    }

    if (btn) {
      btn.textContent = '다 되었습니다!';
      btn.disabled = true;
      btn.classList.remove('stop');
      btn.style.backgroundColor = 'var(--rg-success)';
    }

    // 완료 알림음이나 음성
    if (state.synth) {
      const utterance = new SpeechSynthesisUtterance("기다리기가 끝났습니다. 하단의 파란색 버튼을 눌러 다음 단계로 넘어가주세요.");
      utterance.lang = 'ko-KR';
      state.synth.speak(utterance);
    }

    // 다음 단계 버튼 활성화
    const btnNext = document.getElementById('rg-btn-next');
    if (btnNext) {
      btnNext.disabled = false;
    }
  }

  // Public API
  return {
    open: init
  };
})();

// 페이지가 로드되면 기본적으로 aeropress를 엽니다.
document.addEventListener('DOMContentLoaded', () => {
  // 향후 URL 파라미터로 특정 레시피를 여는 기능
  const urlParams = new URLSearchParams(window.location.search);
  const recipeParam = urlParams.get('recipe');
  RecipeGuide.open(recipeParam || 'aeropress');
});
