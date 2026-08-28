(function(){
    "use strict";

    const topicData = {
        ai: {
            label: 'AI & future',
            opponent: 'AI will ultimately do more harm than good — we are rushing toward a dystopia.',
            counterPoints: [
                'But AI already helps in medicine and climate modeling. Are you ignoring those benefits?',
                'History shows new tech always brings fear. This time is no different.',
                'You underestimate human adaptability. We’ve survived fire, the printing press, the internet.',
                'AI does not have intent — it’s a tool. The danger is in how we use it.',
                'What about autonomous weapons? That is a real threat you haven’t addressed.'
            ]
        },
        climate: {
            label: 'Climate action',
            opponent: 'Individual action is meaningless — only systemic change by corporations and governments matters.',
            counterPoints: [
                'But consumer demand drives corporate change. Your choices matter.',
                'Systemic change starts with public pressure — that is individual action multiplied.',
                'Are you saying we should give up and do nothing? That is defeatist.',
                'Many small actions add up. Plant-based diets, flying less — they do have an impact.',
                'You ignore the power of voting and protesting. That is individual action.'
            ]
        },
        privacy: {
            label: 'Privacy vs security',
            opponent: 'Security must come before privacy — if you have nothing to hide, you have nothing to fear.',
            counterPoints: [
                'That argument is a dangerous slippery slope. Who defines what is “suspicious”?',
                'Privacy is a fundamental right, not a privilege. Security does not trump it.',
                'Mass surveillance has never stopped terrorism — it just invades lives.',
                'You are okay with a totalitarian state as long as you feel “safe”?',
                'Data breaches prove that centralizing data creates more risk, not less.'
            ]
        },
        education: {
            label: 'Education reform',
            opponent: 'Standardized testing and traditional grades are essential for measuring student progress.',
            counterPoints: [
                'Standardized tests measure only memorization, not critical thinking.',
                'Finland abolished most standardized tests and they rank among the best.',
                'Grades create anxiety and kill intrinsic motivation — we need project-based learning.',
                'The current system was built for the industrial age. It is obsolete.',
                'How do you account for different learning styles? One-size-fits-all fails many students.'
            ]
        }
    };

    let currentTopic = 'ai';
    let conversation = [];
    let logicScore = 0;
    let rhetoricScore = 0;
    let roundCounter = 0;
    let opponentUsedPoints = [];

    const messagesContainer = document.getElementById('messagesContainer');
    const userInput = document.getElementById('userInput');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const logicSpan = document.getElementById('logicScore');
    const rhetoricSpan = document.getElementById('rhetoricScore');
    const topicIndicator = document.getElementById('topicIndicator');
    const topicBtns = document.querySelectorAll('.topic-btn');

    function updateScoreDisplay() {
        logicSpan.textContent = logicScore;
        rhetoricSpan.textContent = rhetoricScore;
    }

    function getOpponentOpening(topicKey) {
        return topicData[topicKey]?.opponent || 'I strongly disagree with your position.';
    }

    function getCounterPoint(topicKey) {
        const points = topicData[topicKey]?.counterPoints || [];
        if (!points.length) return 'I still hold my position. You haven’t convinced me.';
        const available = points.filter((_, idx) => !opponentUsedPoints.includes(idx));
        if (available.length === 0) {
            opponentUsedPoints = [];
            return points[Math.floor(Math.random() * points.length)];
        }
        const availableIndices = points
            .map((_, idx) => idx)
            .filter(idx => !opponentUsedPoints.includes(idx));
        const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        opponentUsedPoints.push(randomIdx);
        return points[randomIdx];
    }

    function generateAIResponse(topicKey, userMessage) {
        if (conversation.filter(m => m.role === 'user').length === 1) {
            const opening = getOpponentOpening(topicKey);
            const firstPoint = getCounterPoint(topicKey);
            return `${opening} ${firstPoint}`;
        }
        const base = getCounterPoint(topicKey);
        const extraFiller = [
            ' Also, consider the long-term consequences.',
            ' That is a common misconception.',
            ' Let’s look at the evidence.',
            ' I think you are oversimplifying.',
        ];
        const extra = extraFiller[Math.floor(Math.random() * extraFiller.length)];
        return base + extra;
    }

    function evaluateArgument(text) {
        let logic = 0, rhetoric = 0;
        const lower = text.toLowerCase();
        if (lower.includes('because') || lower.includes('therefore') || lower.includes('since')) logic += 2;
        if (lower.includes('evidence') || lower.includes('data') || lower.includes('study')) logic += 2;
        if (lower.includes('if') && lower.includes('then')) logic += 1;
        if (lower.includes('for example') || lower.includes('instance')) logic += 1;
        if (text.split(' ').length > 12) logic += 1;
        if (text.includes('?')) rhetoric += 1;
        if (lower.includes('clearly') || lower.includes('obviously')) rhetoric += 1;
        if (lower.includes('must') || lower.includes('should') || lower.includes('need')) rhetoric += 1;
        if (lower.includes('never') || lower.includes('always')) rhetoric += 1;
        if (text.split(' ').length > 18) rhetoric += 1;
        logic = Math.min(5, logic);
        rhetoric = Math.min(5, rhetoric);
        return { logic, rhetoric };
    }

    function renderMessages() {
        if (!messagesContainer) return;
        messagesContainer.innerHTML = '';
        if (conversation.length === 0) {
            const opening = getOpponentOpening(currentTopic);
            const initialMsg = document.createElement('div');
            initialMsg.className = 'message ai';
            initialMsg.innerHTML = `
                <div class="avatar ai">🤖</div>
                <div class="bubble ai-bubble"><strong>AI:</strong> ${opening} Ready to debate?</div>
            `;
            messagesContainer.appendChild(initialMsg);
            return;
        }
        for (const msg of conversation) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${msg.role}`;
            const avatar = document.createElement('div');
            avatar.className = `avatar ${msg.role}`;
            avatar.textContent = msg.role === 'ai' ? '🤖' : '🧑';
            const bubble = document.createElement('div');
            bubble.className = `bubble ${msg.role === 'ai' ? 'ai-bubble' : 'you-bubble'}`;
            if (msg.role === 'ai') {
                bubble.innerHTML = `<strong>AI:</strong> ${msg.text}`;
            } else {
                bubble.innerHTML = `<strong>You:</strong> ${msg.text}`;
            }
            msgDiv.appendChild(avatar);
            msgDiv.appendChild(bubble);
            messagesContainer.appendChild(msgDiv);
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function resetDebate(topicKey = currentTopic) {
        currentTopic = topicKey;
        conversation = [];
        opponentUsedPoints = [];
        logicScore = 0;
        rhetoricScore = 0;
        roundCounter = 0;
        updateScoreDisplay();
        renderMessages();
        topicIndicator.textContent = `Topic: ${topicData[currentTopic]?.label || 'AI & future'}`;
        userInput.value = '';
        userInput.focus();
        topicBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.topic === currentTopic);
        });
    }

    function handleDebate() {
        const userText = userInput.value.trim();
        if (!userText) {
            userInput.style.borderColor = '#d43f34';
            setTimeout(() => userInput.style.borderColor = '#2e3852', 800);
            return;
        }
        conversation.push({ role: 'user', text: userText });
        const scores = evaluateArgument(userText);
        logicScore = Math.min(30, logicScore + scores.logic);
        rhetoricScore = Math.min(30, rhetoricScore + scores.rhetoric);
        updateScoreDisplay();
        const aiReply = generateAIResponse(currentTopic, userText);
        conversation.push({ role: 'ai', text: aiReply });
        renderMessages();
        userInput.value = '';
        userInput.focus();
        roundCounter++;
        if (roundCounter % 4 === 0) {
            opponentUsedPoints = [];
        }
    }

    submitBtn.addEventListener('click', handleDebate);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleDebate();
        }
    });
    resetBtn.addEventListener('click', () => resetDebate(currentTopic));
    topicBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.dataset.topic;
            if (topic !== currentTopic) {
                resetDebate(topic);
            }
        });
    });

    resetDebate('ai');
})();
