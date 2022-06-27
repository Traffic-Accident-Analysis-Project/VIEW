// 고객센터문의 글쓰기 비밀글 선택시 비밀번호 div
$(".pw-or-not-y").on("click", function () {
  $(".password-wrap").css("display", "block");
});

$(".pw-or-not-n").on("click", function () {
  $(".password-wrap").css("display", "none");
});

// 상세보기 닫기버튼
$('.popup-close').on('click',function(){
  $('.main-popup').css('display','none');
  $('.popup').css('display','none');
  $('.pw-confirm-popup').css('display','none');
  $('.main-pw-confirm-popup').css('display','none');
})

// 고객센터문의 글쓰기 등록 눌렀을 때 -JS
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
  // json data 생성
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
    url : 'http://localhost:8080/api/v1/board',
    type : 'POST',
    contentType : 'application/json', // 서버에 json type으로 보낼 예정(요청)
    dataType : 'json', // 서버 결과를 json으로 응답 받겠다.
    data : JSON.stringify(jsonData),
    success : function(response){
        // 전송 한 data가 DB에 저장되었으면 alert
        if(response>0){
          alert("저장이 완료되었습니다.");
          // 저장 후 고객센터 페이지로 이동
          location.href = "/HTML&CSS/service_center.html";
        }
        console.log(response);
    }
})
});

// 게시판 리스트 가져오는 함수(main, service-center) - JS
function getBoardList(pageNum, pageSize){
  var controllerUrl = "http://localhost:8080/api/v1/board?pageNum="+pageNum+"&pageSize="+pageSize;
  // 검색기능은 추후 추가사항
  // var keyword = $('#keyword').val();
  // if(keyword != 'null'){
  //     controllerUrl = "http://localhost:8080/api/v1/board/search?writer="+keyword+"&pageNum="+pageNum+"&pageSize="+pageSize;
  // }
  var result = {};
  $.ajax({
    url : controllerUrl,
    type : "GET",
    dataType : "json",
    success : function (response){
      var len = response.list.length;
      // append 하기
      var html = "";
      if(len > 0){
          for(var i=0;i<len;i++){
            html += 
              '<tr onclick="getBoardByNo('+response.list[i].boardNo+')">'+
              '<td>'+response.list[i].boardNo+'</td>'+
              '<td>'+response.list[i].boardWriter+'</td>'+
              '<td>'+response.list[i].boardCategory+'</td>'+
              '<td>'+response.list[i].boardDate+'</td>'+
              '<td>'+response.list[i].boardCnt+'</td>'+
              '</tr>'
          } // end for

          // 페이징 화면 구현
          var paginationHtml = '';
          // 이전 페이지가 있을 때
          if(response.hasPreviousPage){ 
              paginationHtml += '<a onclick="getBoardList('+(response.pageNum-1)+','+pageSize+')" href="#">Previous</a>';
          }
          // 페이지 번호
          for(var i=0; i<response.navigatepageNums.length; i++){ // 페이지 번호 길이 만큼 for문 실행
              paginationHtml += '<a id="pageNum'+response.navigatepageNums[i]+'" onclick="getBoardList('+response.navigatepageNums[i]+',10)" href="#">'+response.navigatepageNums[i]+'</a>';
          }
          // 다음 페이지가 있을 때
          if(response.hasNextPage){ 
              paginationHtml += '<a onclick="getBoardList('+(response.pageNum+1)+','+pageSize+')" href="#">Next</a>';
          }
          $('.pagination').children().remove();
          $('.pagination').append(paginationHtml);
          //페이지 번호에 맞게 css 수정
          $('#pageNum'+pageNum).css('background-color','#287bff');
          $('#pageNum'+pageNum).css('color','#fff');

      }else{
          // 게시글 없을 때
          html += '<tr><td colspan=5 style="text-align: center;">게시글이 없습니다.</td></tr>';
      }
      $('#boardData').children().remove();
      $('#boardData').append(html);
    },
    error : function (request, status, error){
        console.log("에러 내용은 : "+error);
    }
  });
}
getBoardList(1,10);

// 관리자 로그인
$('.manager-login-button').on('click',function(){
    // 로그인 ajax넣기
    // 로그인 성공일 경우
    // location.replace('manager/manager-main.html');
    // 비밀번호가 달라서 실패일경우 
    // alert('비밀번호를 확인해주세요');
})


// ********** CRUD 작업 **************

// 고객센터 팝업창 띄우기 함수(상세조회) - JS
// 생성된 Board List tr 에 onclick 함수로 추가함.
function getBoardByNo(boardNo){
  $('.popup').css('display', 'block');
  $('.main-popup').css('display', 'block');
  // ajax 작성
  $.ajax({
      url : "http://localhost:8080/api/v1/board/boardNo/"+boardNo,
      type : "GET",
      dataType : "json",
      success : function (response){
          // input에 data set 해주기
          $('#number').val(response.boardNo);
          $('#writer').val(response.boardWriter);
          $('#categry').val(response.boardCategory);
          $('#create-at').val(response.boardDate);
          $('#cnt').val(response.boardCnt);
          $('#main-text').val(response.boardContent);
          $('#comment').val(response.boardComment);
          setBoardViews(response.boardNo); // 조회 수 함수
          // 2페이지 이상에서 상세조회를 했을 떄 목록을 그대로 하고싶으나
          // 그러면 상세조회를 PageInfo로 불러와서 getBoardList해야하는 이슈 발생
      },
      error : function (request, status, error){
          console.log("Error : "+error);
      }
  });
}
// 조회수 증가 함수
function setBoardViews(boardNo){
  $.ajax({
    url : 'http://localhost:8080/api/v1/board/views/boardNo/'+boardNo,
    type : 'PATCH',
    contentType : 'application/json',
    dataType : 'json',
    success : function (response){
        // 게시물 상세화면 감추기
        if(response > 0){
            $('#boardData').children().remove();
            getBoardList(1,10);
        }

    }
  });
}

// 삭제
// 삭제 전 비밀번호 확인
$('.btn-cancel').click(function(){
  $('.delete').css("display", "block");
})
$('#btn-passwordForDelete').click(function(){
  var boardNo = 0;
  var boardPassword = "";
  $.ajax({
    url : "http://localhost:8080/api/v1/board/boardNo/"+$('#number').val(),
    type : "GET",
    dataType : "json",
    success : function (response){
      boardPassword = response.boardPassword;
      boardNo = response.boardNo;
      console.log(boardPassword)
      if($('#passwordForDelete').val() != boardPassword){
        alert("비밀번호가 틀렸습니다");
        $('#passwordForDelete').val("");
        $('#passwordForDelete').focus();
      }
      else{
        var answer = confirm("게시글을 삭제하시겠습니까?")
        if(answer){
          deleteBoardByNo(boardNo);
        }
        else{

        }
      }
    },
    error : function (request, status, error){
        console.log("Error : "+error);
    }
  });
})
// 삭제 함수
function deleteBoardByNo(boardNo){
  $.ajax({
    url : 'http://localhost:8080/api/v1/board/boardNo/'+boardNo,
    type : 'DELETE',
    contentType : 'application/json',
    dataType : 'json',
    success : function (response){
      // 게시물 상세화면 감추기
      if(response > 0){
          alert('삭제 완료');
          $('.popup').css('display','none');
          $('.delete').css('display','none');
          location.reload();
      }
    }
  });
}
// 수정
// 수정 전 비밀번호 확인
$('.btn-success').click(function(){
  $('.update').css("display", "block");
})
$('#btn-passwordForUpdate').click(function(){
  var boardNo = 0;
  var boardPassword = "";
  $.ajax({
    url : "http://localhost:8080/api/v1/board/boardNo/"+$('#number').val(),
    type : "GET",
    dataType : "json",
    success : function (response){
      boardPassword = response.boardPassword;
      boardNo = response.boardNo;
      console.log(boardPassword)
      if($('#passwordForUpdate').val() != boardPassword){
        alert("비밀번호가 틀렸습니다");
        $('#passwordForUpdate').val("");
        $('#passwordForUpdate').focus();
      }
      else{
        var answer = confirm("게시글을 수정하시겠습니까?")
        if(answer){
          var jsonData = {
            boardCategory : response.boardCategory,
            boardWriter : response.boardWriter,
            boardEmail : response.boardEmail,
            boardContent : $('#main-text').val(),
            isBoardSecurity : response.isBoardSecurity,
            boardPassword : boardPassword
        }
          updateBoardByNo(boardNo,jsonData);
        }
        else{

        }
      }
    },
    error : function (request, status, error){
        console.log("Error : "+error);
    }
  });
})
// 수정 함수
function updateBoardByNo(boardNo,jsonData){
  $.ajax({
    url : 'http://localhost:8080/api/v1/board/boardNo/'+boardNo,
    type : 'PATCH',
    contentType : 'application/json',
    dataType : 'json',
    data : JSON.stringify(jsonData),
    success : function (response){
      // 게시물 상세화면 감추기
      if(response > 0){
          alert('수정 완료');
          $('.popup').css('display','none');
          $('.delete').css('display','none');
          location.reload();
      }
    }
});
}