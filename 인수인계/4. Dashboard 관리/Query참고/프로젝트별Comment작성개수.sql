/*comment작성정보 조회. 날짜별/주차별 조회*/

/*날짜별*/

set @start = '13-01-27'; /*시작일*/
set @end = '13-02-03'; /*종료일 +1*/

select COALESCE(master_project.project_name, '총계') as "Project",
	    count(c2.1개) "1개",
	    count(c2.2개) "2개",
	    count(c2.3개) "3개",
	    count(c2.4개) "4개",
	    count(c2.5개) "5개",
	    count(c2.6개) "6개",
	    count(c2.7개) "7개",
	    count(c2.8개) "8개",
	    count(c2.9개) "9개",
	    count(c2.10개이상) "10개이상",
	    count(c2.dest_project_name) "Push",
	    COALESCE((sum(c2.건수)),0) "Comment",
	    COALESCE(round((sum(c2.건수)) / count(c2.dest_project_name),1), 0) "AVG"
from   master_project
left join  (select c.dest_project_name, 
			    case c1.건수 when 1 then '1' end "1개",
			    case c1.건수 when 2 then '1' end "2개",
			    case c1.건수 when 3 then '1' end "3개",
			    case c1.건수 when 4 then '1' end "4개",
			    case c1.건수 when 5 then '1' end "5개",
			    case c1.건수 when 6 then '1' end "6개",
			    case c1.건수 when 7 then '1' end "7개",
			    case c1.건수 when 8 then '1' end "8개",
			    case c1.건수 when 9 then '1' end "9개",
			    case when c1.건수 >= 10 then '1' end "10개이상",
			    c1.건수
			    from changes c
				 left join  (select m.change_id, coalesce(count(m.message),'0') "건수"
					          from change_messages m
					          where coalesce(m.author_id,'34') not in ('34')
							    group by m.change_id) c1 on (c.change_id = c1.change_id)
		 where c.created_on < @end 
		 and   c.created_on >= @start) c2 on (master_project.repository = c2.dest_project_name)
where master_project.`status` like '사용중'
group by master_project.project_name with rollup; 



/*주차별*/

set @week = '1305'; /*주차*/

select concat('W',@week) as "주차",
	    COALESCE(master_project.project_name, '총계') as "Project",
	    count(c2.1개) "1개",
	    count(c2.2개) "2개",
	    count(c2.3개) "3개",
	    count(c2.4개) "4개",
	    count(c2.5개) "5개",
	    count(c2.6개) "6개",
	    count(c2.7개) "7개",
	    count(c2.8개) "8개",
	    count(c2.9개) "9개",
	    count(c2.10개이상) "10개이상",
	    count(c2.dest_project_name) "Push",
	    COALESCE((sum(c2.건수)),0) "Comment",
	    COALESCE(round((sum(c2.건수)) / count(c2.dest_project_name),1), 0) "AVG"
from   master_project
left join  (select c.dest_project_name, 
			    case c1.건수 when 1 then '1' end "1개",
			    case c1.건수 when 2 then '1' end "2개",
			    case c1.건수 when 3 then '1' end "3개",
			    case c1.건수 when 4 then '1' end "4개",
			    case c1.건수 when 5 then '1' end "5개",
			    case c1.건수 when 6 then '1' end "6개",
			    case c1.건수 when 7 then '1' end "7개",
			    case c1.건수 when 8 then '1' end "8개",
			    case c1.건수 when 9 then '1' end "9개",
			    case when c1.건수 >= 10 then '1' end "10개이상",
			    c1.건수
			    from changes c
			    join master_week w on (c.created_on between w.`start` and w.`end`)
				 left join  (select m.change_id, coalesce(count(m.message),'0') "건수"
					          from change_messages m
					          where coalesce(m.author_id,'34') not in ('34')
							    group by m.change_id) c1 on (c.change_id = c1.change_id)
				 where w.week like @week
		 		 ) c2 on (master_project.repository = c2.dest_project_name)
where master_project.`status` like '사용중'
group by master_project.project_name with rollup; 