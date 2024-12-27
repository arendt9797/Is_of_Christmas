// ------------ 픽셀 그림판 ----------- //
const PAINT = 'PAINT';
const ERASE = 'ERASE';
let currentMode = PAINT;
let mouseIsDown = false;

// 빈 캔버스 생성
const rows = 25;
const columns = 15;
let tableRows = '';
let r = 1;
while (r <= rows) {
    tableRows += '<tr>';
    for (let c = 1; c <= columns; c++) {
        tableRows += '<td></td>';
    }
    tableRows += '</tr>';
    r += 1;
}
$('.pixelCanvas').html(tableRows)

// 마우스 눌렀을 때 색칠 + 부드러운 선 긋기가 가능하도록 마우스 눌림감지
$('.pixelCanvas').on('mousedown', function (event) {
    event.preventDefault();
    paintErasePixels(event.target);
    mouseIsDown = true;
});
// 마우스를 어디서든 떼도 마우스 이벤트가 종료할 수 있도록 document를 사용
$(document).on('mouseup', function (event) {
    event.preventDefault();
    mouseIsDown = false;
});
// 마우스가 눌려있을 때 색칠 혹은 지우기
$('.pixelCanvas').on('mouseover', function (event) {
    event.preventDefault();
    if (mouseIsDown) {
        paintErasePixels(event.target);
    }
});

// 타일 색칠 or 지우기 함수
function paintErasePixels(targetPixel) {
    if (targetPixel.nodeName === 'TD') {
        targetPixel.style.backgroundColor = currentMode === PAINT ? $('#colorPicker').val() : 'transparent';
    };
};

// 캔버스 다시 그리기
$('#clearCanvas').on('click', function () {
    let tiles = $('td');
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.backgroundColor = 'transparent';
    }
});

// Paint 와 Erase 모드 바꾸기
$('.mode').on('click', function (event) {
    currentMode = event.target.className.includes('paint') ? PAINT : ERASE;
    if (currentMode === PAINT) {
        $('#paint').css('border', '3px solid rgb(70, 169, 255)');
        $('#erase').css('border', '3px solid aliceblue');
    }
    if (currentMode === ERASE) {
        $('#erase').css('border', '3px solid rgb(70, 169, 255)')
        $('#paint').css('border', '3px solid aliceblue');
    }
});

// ------------- CRUD ----------- //
// 제출 버튼 동작
const firebaseConfig = {
    apiKey: "AIzaSyANMkRfr7hGDihztJvlzyJFo3OoWzfoUtw",
    authDomain: "sparta-80e89.firebaseapp.com",
    projectId: "sparta-80e89",
    storageBucket: "sparta-80e89.firebasestorage.app",
    messagingSenderId: "1012738413805",
    appId: "1:1012738413805:web:b524b290cca3eef8df68e4",
    measurementId: "G-3Y6L6G1EHD"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// firebase에 데이터 추가하기
$('#visitSubmit').click(async function () {
    let pixelArt = $('.pixelTable').html();
    let visitName = $('#visitName').val();
    let visitComment = $('#visitComment').val();
    try {
        const docRef = await db.collection("visit").add({
            'pixelArt': pixelArt,
            'name': visitName,
            'comment': visitComment,
        });
        alert('그림이 추가되었습니다!')
        window.location.reload();
    } catch (e) {
        console.error("Error adding document: ", e);
    };
});

// visit 카드 삭제하기
$('#visitCard').on('click', '.card-delete', async function () {
    let deleteCard = $(this).closest('.col-2')
    let deleteId = deleteCard.attr('id')
    db.collection('visit').doc(deleteId).delete().then(() => {
        alert('그림이 삭제되었습니다!')
        window.location.reload()
    }).catch((e) => {
        console.error("Error removing document : ", e)
    })
});

// firebase에서 데이터 불러오기
db.collection('visit')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let pixelArt = doc.data().pixelArt;
            let visitName = doc.data().name;
            let visitComment = doc.data().comment;
            let documentId = doc.id

            let tempHtml = `
            <div class="col-2" id="${documentId}">
                <div class="card">
                    <div class="card-header">
                        <button class="card-delete">
                            <img src="./source/deleteCard.png" alt="x" id="delete-icon">
                        </button>
                        <h3>${visitName}</h3>
                    </div>
                    <div class="card-body">
                        <div class="card-canvas">${pixelArt}</div>
                        <p class="card-text">${visitComment}</p>
                    </div>
                </div>
            </div>`;

            $('#visitCard').append(tempHtml);
        });
    });