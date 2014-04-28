/* 2013년도 팀장님들 Code Review Comment 횟수*/


set @start = '13-01-01'; /*시작일*/
set @end = '14-01-01'; /*종료일 +1*/

select a.full_name 'Name', 
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-01' then '1' else '0' end) '1월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-02' then '1' else '0' end) '2월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-03' then '1' else '0' end) '3월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-04' then '1' else '0' end) '4월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-05' then '1' else '0' end) '5월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-06' then '1' else '0' end) '6월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-07' then '1' else '0' end) '7월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-08' then '1' else '0' end) '8월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-09' then '1' else '0' end) '9월',
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-10' then '1' else '0' end) '10월',		  
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-11' then '1' else '0' end) '11월',		  
       sum( case DATE_FORMAT(m.written_on, '%y-%m') when '13-12' then '1' else '0' end) '12월',		  		        
       sum( case DATE_FORMAT(m.written_on, '%y') when '13' then '1' else '0' end) '합계'
  from change_messages m 
  join accounts a on (m.author_id = a.account_id)
 where m.written_on >= @start
   and m.written_on < @end
   and a.preferred_email in ( 'yt.gong@lge.com',
                              'gyuseung.kim@lge.com',
                              'buhyoun.moon@lge.com',
                              'sookjeong.moon@lge.com',
                              'soyoung77.park@lge.com',
                              'kangsoo.seo@lge.com',
                              'kyueun.yi@lge.com',
                              'hyojun.im@lge.com',
                              'seongpyo.hong@lge.com')
 group by m.author_id
 order by 2 desc;
