// 고객센터문의 글쓰기 비밀글 선택시 비밀번호 div
$(".pw-or-not-y").on("click", function () {
  $(".password-wrap").css("display", "block");
});

$(".pw-or-not-n").on("click", function () {
  $(".password-wrap").css("display", "none");
});

// 고객센터문의 글쓰기 등록 눌렀을 때
$(".service-write-registration").on("click", function () {
  // 빈칸 확인
  if ($('#service-category option:selected').text() == "문의 유형을 선택해 주세요"){
    alert("문의 유형을 선택해 주세요");
    return false;
  }
  if ($('#writerValue').val() == ""){
    alert("작성자를 입력하세요");
    $('#writerValue').focus();
    return false;
  }
  if ($('#emailValue').val() == ""){
    alert("e-mail을 입력하세요"); // email 형식에 맞게 확인하는 로직구현 필요
    $('#emailValue').focus();
    return false;
  }
  if ($('#textValue').val() == ""){
    alert("본문을 입력하세요");
    $('#textValue').focus();
    return false;
  }
  if ($('.pw-or-not-y').is(":checked")){
    // password 확인
    var password = $(".service-write-pw").val();
    var rePassword = $(".service-write-re-pw").val();
    if (password != rePassword) {
      alert("비밀번호를 확인 해 주세요");
      return false;
    }
  }
  // post ajax구현
  var boardCategory = $('#service-category option:selected').text();
  var boardWriter = $('#writerValue').val();
  var boardEmail = $('#emailValue').val();
  var boardContent = $('#textValue').val();
  var boardPassword = $(".service-write-pw").val();
  var isBoardSecurity = $('.pw-or-not-y').is(":checked");

  var jsonData = {
      boardCategory : boardCategory,
      boardWriter : boardWriter,
      boardEmail : boardEmail,
      boardContent : boardContent,
      boardPassword : boardPassword,
      isBoardSecurity : isBoardSecurity
  }
  //ajax
  $.ajax({
    url : 'http://localhost:8080/board',
    type : 'POST',
    contentType : 'application/json', // 서버에 json type으로 보낼 예정(요청)
    dataType : 'json', // 서버 결과를 json으로 응답 받겠다.
    data : JSON.stringify(jsonData),
    success : function(response){
        // 전송 한 data가 DB에 저장되었으면 alert
        if(response>0){
          alert("저장이 완료되었습니다.")
        }
        console.log(response);
    }
})
});

// 관리자 로그인
$('.manager-login-button').on('click',function(){
    // 로그인 ajax넣기
    // 로그인 성공일 경우
    // location.replace('manager/manager-main.html');
    // 비밀번호가 달라서 실패일경우 
    // alert('비밀번호를 확인해주세요');
})