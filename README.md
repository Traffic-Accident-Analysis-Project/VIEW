# Traffic-Accident-Analysis-Project
## Description
<!-- 어떤 프로젝트인지 간단히 기술 -->
국가 통계포털 교통사고 자료를 활용한 교통사고 분석
- Demo : _production Link_

## 사용 기술
- HTML
- CSS
- JS
- JAVA
- JSP
- chart.js

## Installation
<!--
실행 방법(컴파일 방법, 환경 포함)
우리가 작성한 코드들을 어떻게 실행해야 할지에 대한 내용은 꼭! 꼭! 담겨 있어야 한다.
다만, 이 내용은 비교적 구체적으로 적어야 할 필요가 있다.
본인이 실행해 본 환경은 어떤 환경인지, 컴파일러로는 무엇을 사용했는지와 같이
프로그램에 의존성(Dependency)이 걸리는 내용들을 써줘야 한다.
(보통 OS, Compiler 정도를 쓰고 Multicore 환경에서 돌아가는 프로그램이라면 CPU, RAM 등도 써주는 것이 좋다.)
또한 언어의 버전도 적어줄 수 있다면 적어주는 것이 좋다.
-->
### 개발환경
1. OS(운영체제)
    - Windows(Local 개발)
    - Linux Ubuntu(운영)

2. 사용 언어
    - Java, HTML, CSS, Javascript(JQuery, D3.JS)
3. 프레임워크
    - SpringBoot
4. 개발 툴
    - 이클립스(Eclipse)
    - VS Code
### 실행방법
- 위와 같은 개발환경에서 MVC패턴을 활용한 Project 생성 후 내장 Tomcat을 사용해 Test 및 AWS 서버 배포
 Java Gradle에 다음과 같은 의존성 추가
```
// deploy
providedRuntime 'org.springframework.boot:spring-boot-starter-tomcat'
```
- 이유 : 컴파일 단계에서만 tomcat 라이브러리를 이용하고, 배포 이후에는 내장 tomcat이 아닌 이미 존재하는 tomcat 서버를 이용하기 위해서
- 이미 존재하는 tomcat 서버 : AWS EC2 인스턴스를 사용


## Advanced Feature
<!-- 주의깊게 볼 기능들 -->
1. Kakao Map API를 활용한 지도 구현
2. D3.JS를 활용한 그래프 구현

## 개선사항
<!-- 내가 나의 서비스에대해 좀 더 고민한 흔적 보여주기 -->
- 엑셀다운시 사용자가 선택한 데이터로 다운
- 실시간 데이터 사용
- 관리자페이지 부실
---

### 분석 방법
1. 그래프(Histogram, Plot, Pie Chart, Radar Chart, Polar Area)
    그래프 그려주는 사이트 참조
2. 지도(시도별 자료를 지도에 표기)
3. 카드섹션, 팝업 등을 활용한 데이터 표시
3. 결론도출 
    - R활용?
    - 시계열 자료분석을 이용한 년도별 사고 증가율
    - 검정을 이용한 방법(음주가 교통사고에 영향을 미치는가? / 시간, 요일 등이 교통사고에 영향을 주는가?)


- 데이터 출처 : https://kosis.kr/search/search.do
- 참고 : https://www.chartjs.org/
<!--
Description

프로젝트에 대한 간단한 설명을 기술한다. 어떠한 일을 수행하기 위한 프로젝트인지, 어떠한 서비스를 위한 것인지를 작성하면 된다. 너무 길게 작성하기 보단 간결하고 명료하게 작성하는 것이 좋다. 프로젝트의 가치를 전달하는 것도 좋다.

Environment

실행환경에 대해 작성하면 된다. OS나 컴파일러 혹은 Hardware와 관련된 환경을 작성하면 된다. Multicore 환경에서 돌아가는 프로그램이라면 CPU나 RAM 같은 것들을 작성해도 좋다.

Prerequisite

작성한 코드를 실행하기 전에 설치해야할 pakage나 의존성이 걸리는 문제들을 설명하면 된다.

Files

이 항목은 내가 추가한 것이다. 중요한 코드 파일들 몇 개를 대상으로 해당 파일이 어떠한 역할을 하는 파일인지를 간단히 설명해주면 전반적인 맥락을 파악하기에 좋을 것 같아 추가하였다.

Usage

작성한 코드를 어떻게 실행해야 하는지에 대한 가이드라인이다. Usage Example을 함께 작성하면 좋다.

이 외에도 라이센스, contributing 같은 것들도 있지만 처음부터 readme를 복잡하게 작성하기 보단 프로젝트의 규모가 커지면서 디테일하게 추가하며 다듬는 것이 좋다.
-->
