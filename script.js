const ingredients = [
    { provider: "보배", name: "수르스트뢰밍", img: "수르스트뢰밍.png", comment: "이빌라를화생방으로만들거야" },
    { provider: "영", name: "한우 사골곰탕", img: "사골곰탕.png", comment: "형 덕분에 촉촉한떡국을만들수있게되었어요" },
    { provider: "라니", name: "카다이프", img: "카다이프.png", comment: "그거를거기에요" },
    { provider: "희정", name: "마라로제엽떡", img: "마라로제엽떡.png", comment: "혹시먹던거임?" },
    { provider: "승의", name: "얼...음?", img: "얼음.png", comment: "저손까지떡국에넣으면되는거죠?" },
    { provider: "리모", name: "동물 모양 떡", img: "동물떡.png", comment: "귀여워요" },
    { provider: "이재", name: "숭화단 (삭힌 오리알)", img: "숭화단.png", comment: "이게 뭔지조차 모르겠어요" },
    { provider: "해수", name: "두쫀쿠", img: "두쫀쿠.png", comment: "그냥 제가 삥땅치면 안 될까요" },
    { provider: "임두필", name: "부레옥잠", img: "부레옥잠.png", comment: "이거진짜예요?" },
    { provider: "수영", name: "지극히 정상적인 떡국 떡", img: "떡국떡.png", comment: "와! 정상적인떡이다" },
    { provider: "등", name: "망고씨", img: "망고씨.png", comment: "그러니까먹고남은망고씨를넣으시겠다고요?망고가아니라망고씨를요?형의아밀레이스가묻어있는망고씨말씀하시는거죠?" },
    { provider: "숙희", name: "취두부", img: "취두부.png", comment: "결국 왔나……" },
    { provider: "도기", name: "투썸 아이스박스", img: "아박.png", comment: "달콤해지겠네요……" }

];

let currentIndex = 0;
const cookingPage = document.getElementById('cooking-page');
const resultPage = document.getElementById('result-page');
const card = document.getElementById('ingredient-card');
const providerTxt = document.getElementById('current-provider');
const nameTxt = document.getElementById('current-name');
const imgTag = document.getElementById('current-img');
const commentTxt = document.getElementById('cook-comment');
const soup = document.getElementById('soup');
const pot = document.getElementById('main-pot');
const steam = document.getElementById('steam');
const soundPlop = document.getElementById('sound-plop');
const soundBoil = document.getElementById('sound-boil');

function updateSoup(index) {
    const heightPercent = (index / ingredients.length) * 100;
    soup.style.height = heightPercent + "%";

    if (index < 3) soup.style.backgroundColor = "#ffffff"; 
    else if (index < 6) soup.style.backgroundColor = "#8a2be2"; 
    else if (index < 9) soup.style.backgroundColor = "#5d3a1a"; 
    else soup.style.backgroundColor = "#111111"; 
}

function loadIngredient() {
    if (currentIndex < ingredients.length) {
        const item = ingredients[currentIndex];
        providerTxt.textContent = `${item.provider}님이 가져온`;
        nameTxt.textContent = item.name;
        commentTxt.textContent = `"${item.comment}"`;
        imgTag.src = item.img;
        imgTag.onerror = () => { imgTag.src = `https://via.placeholder.com/150/e67e22/ffffff?text=${item.provider}`; };
        card.classList.remove('move-to-pot');
    }
}

card.addEventListener('click', () => {
    if (currentIndex >= ingredients.length) return;
    soundPlop.currentTime = 0;
    soundPlop.play();
    card.classList.add('move-to-pot');

    setTimeout(() => {
        currentIndex++;
        updateSoup(currentIndex);
        if (currentIndex < ingredients.length) {
            loadIngredient();
        } else {
            card.style.display = 'none';
            document.getElementById('instructionText').style.display = 'none';
            startBoilingEffect();
        }
    }, 700);
});

function startBoilingEffect() {
    soundBoil.play();
    pot.classList.add('shaking');
    steam.style.display = 'block';
    document.getElementById('cooking-status').classList.remove('hidden');

    setTimeout(() => {
        goToResultPage();
    }, 6000);
}

function goToResultPage() {
    soundBoil.pause();
    cookingPage.classList.add('hidden');
    resultPage.classList.remove('hidden');

    const summaryList = document.getElementById('summary-list');
    ingredients.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span> <span class="provider-tag">${item.provider}</span>`;
        summaryList.appendChild(li);
    });
}

loadIngredient();