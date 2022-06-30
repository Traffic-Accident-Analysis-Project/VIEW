// Histogram
var contextAccidentHitogram = document.getElementById("histogram-accident").getContext("2d");
// Line Chart
var contextAccidentLineChart = document
  .getElementById("lineChart-accident")
  .getContext("2d");
// histogram
// 월별 사고건수, 사망자, 부상자 구현
// 조건 : 년도 선택, 유형 선택
// ajax로 가져온 data를 length : 12 의 3개의 배열로 생성
$.ajax({
  url: "http://localhost:8080/api/v1/accident",
  type: "GET",
  dataType: "json",
  success: function (response) {
    // 월별로 배열에 data +.
    // 사고유형1,2
    var dataAccidents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var dataDeath = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var dataInjured = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < response.length; i++) {
      // 여기에 if문으로 년도,월,유형 등 조정사항 입력
      // 월별 data 입력
      if (response[i].month == "jan") {
        dataAccidents[0] += response[i].사고건수;
        dataDeath[0] += response[i].사망자수;
        dataInjured[0] += response[i].부상자수;
      }
      if (response[i].month == "feb") {
        dataAccidents[1] += response[i].사고건수;
        dataDeath[1] += response[i].사망자수;
        dataInjured[1] += response[i].부상자수;
      }
      if (response[i].month == "mar") {
        dataAccidents[2] += response[i].사고건수;
        dataDeath[2] += response[i].사망자수;
        dataInjured[2] += response[i].부상자수;
      }
      if (response[i].month == "apr") {
        dataAccidents[3] += response[i].사고건수;
        dataDeath[3] += response[i].사망자수;
        dataInjured[3] += response[i].부상자수;
      }
      if (response[i].month == "may") {
        dataAccidents[4] += response[i].사고건수;
        dataDeath[4] += response[i].사망자수;
        dataInjured[4] += response[i].부상자수;
      }
      if (response[i].month == "jun") {
        dataAccidents[5] += response[i].사고건수;
        dataDeath[5] += response[i].사망자수;
        dataInjured[5] += response[i].부상자수;
      }
      if (response[i].month == "jul") {
        dataAccidents[6] += response[i].사고건수;
        dataDeath[6] += response[i].사망자수;
        dataInjured[6] += response[i].부상자수;
      }
      if (response[i].month == "aug") {
        dataAccidents[7] += response[i].사고건수;
        dataDeath[7] += response[i].사망자수;
        dataInjured[7] += response[i].부상자수;
      }
      if (response[i].month == "sep") {
        dataAccidents[8] += response[i].사고건수;
        dataDeath[8] += response[i].사망자수;
        dataInjured[8] += response[i].부상자수;
      }
      if (response[i].month == "oct") {
        dataAccidents[9] += response[i].사고건수;
        dataDeath[9] += response[i].사망자수;
        dataInjured[9] += response[i].부상자수;
      }
      if (response[i].month == "nov") {
        dataAccidents[10] += response[i].사고건수;
        dataDeath[10] += response[i].사망자수;
        dataInjured[10] += response[i].부상자수;
      }
      if (response[i].month == "dec") {
        dataAccidents[11] += response[i].사고건수;
        dataDeath[11] += response[i].사망자수;
        dataInjured[11] += response[i].부상자수;
      }
    }
    // chart 생성

    var myChart = new Chart(contextAccidentHitogram, {
      type: "bar", // 차트의 형태
      data: {
        // 차트에 들어갈 데이터
        labels: [
          //x 축
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
        datasets: [
          {
            //데이터
            label: "사고 건수", //차트 제목
            fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
            data: dataAccidents,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1, //경계선 굵기
          },
          {
            label: "사망자 수",
            fill: false,
            data: dataDeath,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "부상자 수",
            fill: false,
            data: dataInjured,
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Bar Chart",
          },
          subtitle: {
            display: true,
            text: "월별 히스토그램",
            color: "skyblue",
          },
        },
      },
    });
  },
});

// Line Chart
// 조건 : 유형 선택 (월별 합산으로 년도별 분류)
$.ajax({
  url: "http://localhost:8080/api/v1/accident",
  type: "GET",
  dataType: "json",
  success: function (response) {
    // 월별로 배열에 data +.
    // 사고유형1,2
    var dataAccidents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var dataDeath = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var dataInjured = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log(response[0]);
    for (var i = 0; i < response.length; i++) {
      if (response[i].month != "all") continue;
      if (response[i].시점 == 2005) {
        dataAccidents[0] += response[i].사고건수;
        dataDeath[0] += response[i].사망자수;
        dataInjured[0] += response[i].부상자수;
      }
      if (response[i].시점 == 2006) {
        dataAccidents[1] += response[i].사고건수;
        dataDeath[1] += response[i].사망자수;
        dataInjured[1] += response[i].부상자수;
      }
      if (response[i].시점 == 2007) {
        dataAccidents[2] += response[i].사고건수;
        dataDeath[2] += response[i].사망자수;
        dataInjured[2] += response[i].부상자수;
      }
      if (response[i].시점 == 2008) {
        dataAccidents[3] += response[i].사고건수;
        dataDeath[3] += response[i].사망자수;
        dataInjured[3] += response[i].부상자수;
      }
      if (response[i].시점 == 2009) {
        dataAccidents[4] += response[i].사고건수;
        dataDeath[4] += response[i].사망자수;
        dataInjured[4] += response[i].부상자수;
      }
      if (response[i].시점 == 2010) {
        dataAccidents[5] += response[i].사고건수;
        dataDeath[5] += response[i].사망자수;
        dataInjured[5] += response[i].부상자수;
      }
      if (response[i].시점 == 2011) {
        dataAccidents[6] += response[i].사고건수;
        dataDeath[6] += response[i].사망자수;
        dataInjured[6] += response[i].부상자수;
      }
      if (response[i].시점 == 2012) {
        dataAccidents[7] += response[i].사고건수;
        dataDeath[7] += response[i].사망자수;
        dataInjured[7] += response[i].부상자수;
      }
      if (response[i].시점 == 2013) {
        dataAccidents[8] += response[i].사고건수;
        dataDeath[8] += response[i].사망자수;
        dataInjured[8] += response[i].부상자수;
      }
      if (response[i].시점 == 2014) {
        dataAccidents[9] += response[i].사고건수;
        dataDeath[9] += response[i].사망자수;
        dataInjured[9] += response[i].부상자수;
      }
      if (response[i].시점 == 2015) {
        dataAccidents[10] += response[i].사고건수;
        dataDeath[10] += response[i].사망자수;
        dataInjured[10] += response[i].부상자수;
      }
      if (response[i].시점 == 2016) {
        dataAccidents[11] += response[i].사고건수;
        dataDeath[11] += response[i].사망자수;
        dataInjured[11] += response[i].부상자수;
      }
      if (response[i].시점 == 2017) {
        dataAccidents[12] += response[i].사고건수;
        dataDeath[12] += response[i].사망자수;
        dataInjured[12] += response[i].부상자수;
      }
      if (response[i].시점 == 2018) {
        dataAccidents[13] += response[i].사고건수;
        dataDeath[13] += response[i].사망자수;
        dataInjured[13] += response[i].부상자수;
      }
      if (response[i].시점 == 2019) {
        dataAccidents[14] += response[i].사고건수;
        dataDeath[14] += response[i].사망자수;
        dataInjured[14] += response[i].부상자수;
      }
      if (response[i].시점 == 2020) {
        dataAccidents[15] += response[i].사고건수;
        dataDeath[15] += response[i].사망자수;
        dataInjured[15] += response[i].부상자수;
      }
    }
    console.log(dataDeath);

    var myChart = new Chart(contextAccidentLineChart, {
      type: "line", // 차트의 형태
      data: {
        // 차트에 들어갈 데이터
        labels: [
          //x 축
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
        ],
        datasets: [
          {
            //데이터
            label: "사고 건수", //차트 제목
            fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
            data: dataAccidents,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1, //경계선 굵기
          },
          {
            label: "사망자 수",
            fill: false,
            data: dataDeath,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "부상자 수",
            fill: false,
            data: dataInjured,
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Line Chart",
          },
          subtitle: {
            display: true,
            text: "년도별 그래프",
            color: "skyblue",
          },
        },
      },
    });
  },
});
