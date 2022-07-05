// popup 닫기
$(".btn-close").on("click", function () {
  $(".popup").css("display", "none");
  $(".popup-logs").css("display", "none");
});

// 관리자 댓글 등록버튼
$(".btn-success").on("click", function () {
  var result = confirm("댓글을 등록하시겠습니까?");
  if (!result) {
    alert("취소 되었습니다");
    $(".popup").css("display", "none");
  }
  // delete ajax 필요
  else {
    var jsonData = {};
    $.ajax({
      url: "http://localhost:8080/api/v1/board/boardNo/" + $("#number").val(),
      type: "GET",
      dataType: "json",
      success: function (response) {
        jsonData = {
          boardCategory: response.boardCategory,
          boardWriter: response.boardWriter,
          boardEmail: response.boardEmail,
          boardContent: response.boardContent,
          isBoardSecurity: response.isBoardSecurity,
          boardPassword: response.boardPassword,
          boardComment: $("#comment").val(),
        };
        updateBoardByNo($("#number").val(), jsonData);
      },
      error: function (request, status, error) {
        console.log("Error : " + error);
      },
    });
  }
});
// 수정 함수
function updateBoardByNo(boardNo, jsonData) {
  $.ajax({
    url: "http://localhost:8080/api/v1/board/boardNo/" + boardNo,
    type: "PATCH",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(jsonData),
    success: function (response) {
      // 게시물 상세화면 감추기
      if (response > 0) {
        alert("등록 완료");
        $(".popup").css("display", "none");
        location.reload();
      }
    },
  });
}

// 고객 게시물, 로그 삭제
$(".btn-delete").on("click", function () {
  var result = confirm("정말 삭제하시겠습니까?");
  if (!result) {
    alert("취소 되었습니다");
    $(".popup").css("display", "none");
  }
  // delete ajax 필요
  else {
    deleteBoardByNo($("#number").val());
  }
});
// 삭제함수
function deleteBoardByNo(boardNo) {
  $.ajax({
    url: "http://localhost:8080/api/v1/board/boardNo/" + boardNo,
    type: "DELETE",
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      // 게시물 상세화면 감추기
      if (response > 0) {
        alert("삭제 완료");
        $(".popup").css("display", "none");
        location.reload();
      }
    },
  });
}

// 로그아웃
$(".logout").on("click", function () {
  var result = confirm("로그아웃 하시겠습니까?");
  if (result) {
    location.replace("../login.html");
  }
});

// 관리자페이지 고객센터 리스트 불러오기
function getBoardList(pageNum, pageSize) {
  var controllerUrl =
    "http://localhost:8080/api/v1/board?pageNum=" +
    pageNum +
    "&pageSize=" +
    pageSize;
  // 검색기능은 추후 추가사항
  // var keyword = $('#keyword').val();
  // if(keyword != 'null'){
  //     controllerUrl = "http://localhost:8080/api/v1/board/search?writer="+keyword+"&pageNum="+pageNum+"&pageSize="+pageSize;
  // }
  var result = {};
  $.ajax({
    url: controllerUrl,
    type: "GET",
    dataType: "json",
    success: function (response) {
      var len = response.list.length;
      // append 하기
      var html = "";
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          html +=
            "<tr onclick='getBoardByNo(" +
            response.list[i].boardNo +
            ")'>" +
            "<td>" +
            response.list[i].boardNo +
            "</td>" +
            "<td>" +
            response.list[i].boardWriter +
            "</td>" +
            "<td>" +
            response.list[i].boardCategory +
            "</td>" +
            "<td>" +
            response.list[i].boardDate +
            "</td>" +
            "<td>" +
            response.list[i].boardCnt +
            "</td>" +
            "</tr>";
        } // end for

        // 페이징 화면 구현
        var paginationHtml = "";
        // 이전 페이지가 있을 때
        if (response.hasPreviousPage) {
          paginationHtml +=
            '<a onclick="getBoardList(' +
            (response.pageNum - 1) +
            "," +
            pageSize +
            ')" href="#">Previous</a>';
        }
        // 페이지 번호
        for (var i = 0; i < response.navigatepageNums.length; i++) {
          // 페이지 번호 길이 만큼 for문 실행
          paginationHtml +=
            '<a id="pageNum' +
            response.navigatepageNums[i] +
            '" onclick="getBoardList(' +
            response.navigatepageNums[i] +
            ',10)" href="#">' +
            response.navigatepageNums[i] +
            "</a>";
        }
        // 다음 페이지가 있을 때
        if (response.hasNextPage) {
          paginationHtml +=
            '<a onclick="getBoardList(' +
            (response.pageNum + 1) +
            "," +
            pageSize +
            ')" href="#">Next</a>';
        }
        $(".pagination").children().remove();
        $(".pagination").append(paginationHtml);
        //페이지 번호에 맞게 css 수정
        $("#pageNum" + pageNum).css("background-color", "#287bff");
        $("#pageNum" + pageNum).css("color", "#fff");
      } else {
        // 게시글 없을 때
        html +=
          '<tr><td colspan=6 style="text-align: center;">게시글이 없습니다.</td></tr>';
      }
      $("#boardData").children().remove();
      $("#boardData").append(html);
    },
    error: function (request, status, error) {
      console.log("에러 내용은 : " + error);
    },
  });
}
getBoardList(1, 10);

// 고객센터 팝업창 띄우기 함수(상세조회) - JS
// 생성된 Board List tr 에 onclick 함수로 추가함.
function getBoardByNo(boardNo) {
  $(".popup").css("display", "block");
  $(".main-popup").css("display", "block");
  // ajax 작성
  $.ajax({
    url: "http://localhost:8080/api/v1/board/boardNo/" + boardNo,
    type: "GET",
    dataType: "json",
    success: function (response) {
      // input에 data set 해주기
      $("#number").val(response.boardNo);
      $("#writer").val(response.boardWriter);
      $("#categry").val(response.boardCategory);
      $("#create-at").val(response.boardDate);
      $("#cnt").val(response.boardCnt);
      $("#main-text").val(response.boardContent);
      $("#comment").val(response.boardComment);
    },
    error: function (request, status, error) {
      console.log("Error : " + error);
    },
  });
}

// log 게시판 조회
getLogsBoardList(1, 10);
// 관리자페이지 고객센터 리스트 불러오기
function getLogsBoardList(pageNum, pageSize) {
  var controllerUrl =
    "http://localhost:8080/api/v1/logs?pageNum=" +
    pageNum +
    "&pageSize=" +
    pageSize;
  var result = {};
  $.ajax({
    url: controllerUrl,
    type: "GET",
    dataType: "json",
    success: function (response) {
      var len = response.list.length;
      var html = "";
      console.log(response)
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          html +=
            "<tr onclick='getLogsPopup(" +
            response.list[i].log_id +
            ")'><td>" +
            response.list[i].log_id +
            "</td><td>" +
            response.list[i].ip +
            "</td><td>" +
            response.list[i].url +
            "</td><td>" +
            response.list[i].http_method +
            "</td><td>" +
            response.list[i].create_at +
            "</td></tr>";
        } // end for

        // 페이징 화면 구현
        var paginationHtml = "";
        // 이전 페이지가 있을 때
        if (response.hasPreviousPage) {
          paginationHtml +=
            '<a onclick="getLogsBoardList(' +
            (response.pageNum - 1) +
            "," +
            pageSize +
            ')" href="#">Previous</a>';
        }
        // 페이지 번호
        for (var i = 0; i < response.navigatepageNums.length; i++) {
          // 페이지 번호 길이 만큼 for문 실행
          paginationHtml +=
            '<a id="pageNum' +
            response.navigatepageNums[i] +
            '" onclick="getLogsBoardList(' +
            response.navigatepageNums[i] +
            ',10)" href="#">' +
            response.navigatepageNums[i] +
            "</a>";
        }
        // 다음 페이지가 있을 때
        if (response.hasNextPage) {
          paginationHtml +=
            '<a onclick="getLogsBoardList(' +
            (response.pageNum + 1) +
            "," +
            pageSize +
            ')" href="#">Next</a>';
        }
        $(".pagination").children().remove();
        $(".pagination").append(paginationHtml);
        //페이지 번호에 맞게 css 수정
        $("#pageNum" + pageNum).css("background-color", "#287bff");
        $("#pageNum" + pageNum).css("color", "#fff");
      } else {
        // 게시글 없을 때
        html +=
          '<tr><td colspan=6 style="text-align: center;">게시글이 없습니다.</td></tr>';
      }
      $("#logBoardData").children().remove();
      $("#logBoardData").append(html);
    },
    error: function (request, status, error) {
      console.log("에러 내용은 : " + error);
    },
  });
}

// log popup
function getLogsPopup(log_id) {
  // JSP로 해보기
  // var popup = window.open(
  //   "manager-log-popup.html",
  //   "logs",
  //   "width=650px, height=500px, left=100, top=50"
  // );
  $(".popup-logs").css("display", "block");
  $.ajax({
    url: "http://localhost:8080/api/v1/logs/logId/" + log_id,
    type: "GET",
    dataType: "json",
    success: function (response) {
      $("#logId").val(response.log_id);
      $("#ip").val(response.ip);
      $("#url").val(response.url);
      $("#httpMethod").val(response.http_method);
      $("#createAt").val(response.create_at);
      
    },
    error: function (request, status, error) {
      console.log("Error : " + error);
    },
  }); //ajax end
}
