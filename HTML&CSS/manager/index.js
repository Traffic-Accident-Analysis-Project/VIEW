// popup 닫기
$(".btn-close").on("click", function () {
  $(".popup").css("display", "none");
});

// 관리자 댓글 등록버튼
$(".btn-success").on("click", function () {
  // ajax post필요
  // $('.popup').css('display','none');
});

// 고객 게시물, 로그 삭제
$(".btn-delete").on("click", function () {
  var result = confirm("정말 삭제하시겠습니까?");
  if (!result) {
    alert("취소 되었습니다");
  }
  // delete ajax 필요
});

$(".logout").on("click", function () {
  var result = confirm("로그아웃 하시겠습니까?");
  if (result) {
    location.replace("../manager-login.html");
  }
});
