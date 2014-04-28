<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>table thead 고정 tbody 스크롤</title>
<style type="text/css">
	
Pure CSS Fixed Header Variable Width Table 헤더가 고정된 테이블   html+css / 일  
2012/05/23 10:45
http://blog.naver.com/yosh_/40159669414
전용뷰어 보기
 헤더가 고정되고 컨텐츠는 스크롤 되는 테이블
 
http://salzerdesign.com/test/fixedTable.html 
 
 .fixed-table-container {
      width: 50%;
      height: 200px;
      border: 1px solid black;
      margin: 10px auto;
      background-color: white;
      /* above is decorative or flexible */
      position: relative; /* could be absolute or relative */
      padding-top: 30px; /* height of header */
    }
    .fixed-table-container-inner {
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
    }
     
    .header-background {
      background-color: #D5ECFF;
      height: 30px; /* height of header */
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }
    
    table {
      background-color: white;
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .th-inner {
      position: absolute;
      top: 0;
      line-height: 30px; /* height of header */
      text-align: left;
      border-left: 1px solid black;
      padding-left: 5px;
      margin-left: -5px;
    }
</style>
</head>
<body>
<div class="fixed-table-container">
      <div class="header-background"> </div>
      <div class="fixed-table-container-inner">
        <table cellspacing="0">
          <thead>
            <tr>
              <th class="first">
                <div class="th-inner">First</div>
              </th>
              <th class="second">
                <div class="th-inner">Second</div>
              </th>
              <th class="third">
                <div class="th-inner">Third</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First</td>
              <td>First</td>
              <td>First</td>
            </tr>
            <tr>
              <td>First</td>
              <td>Second</td>
              <td>Third</td>
            </tr>
            <tr>
              <td>First</td>
              <td>Second</td>
              <td>Third</td>
            </tr>
          </tbody>
        </table>
      </div>
</body>
</html>

