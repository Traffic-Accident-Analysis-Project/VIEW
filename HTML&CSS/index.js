// 고객센터문의 글쓰기 비밀글 선택시 비밀번호 div
$(".pw-or-not-y").on("click", function () {
  $(".password-wrap").css("display", "block");
});

$(".pw-or-not-n").on("click", function () {
  $(".password-wrap").css("display", "none");
});

// 고객센터문의 글쓰기 등록 눌렀을 때
$(".service-write-registration").on("click", function () {
  var password = $(".service-write-pw").val();
  var rePassword = $(".service-write-re-pw").val();
  if (password != rePassword) {
    alert("비밀번호를 확인 해 주세요");
  }
  // post ajax구현
});

// 관리자 로그인
$('.manager-login-button').on('click',function(){
    // 로그인 ajax넣기
    // 로그인 성공일 경우
    // location.replace('manager/manager-main.html');
    // 비밀번호가 달라서 실패일경우 
    // alert('비밀번호를 확인해주세요');
})