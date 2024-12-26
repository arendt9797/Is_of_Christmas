const PAINT = 'PAINT';
const ERASE = 'ERASE';
let currentMode = PAINT;
let mouseIsDown = false;

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
    $('.paintOrErase').text(' ' + currentMode);
});