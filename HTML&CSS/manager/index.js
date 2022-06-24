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

// 관리자페이지 고객센터 리스트 불러오기
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
              "<tr>"+
              "<td>"+response.list[i].boardNo+"</td>"+
              "<td>"+response.list[i].boardWriter+"</td>"+
              "<td>"+response.list[i].boardCategory+"</td>"+
              "<td>"+response.list[i].boardDate+"</td>"+
              "<td>"+response.list[i].boardCnt+"</td>"+
              "</tr>"
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
          html += '<tr><td colspan=6 style="text-align: center;">게시글이 없습니다.</td></tr>';
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