select concat('W',week.week) as Week, 
		 COALESCE(output.Open,0) as Open, 
		 COALESCE(output.Merge,0) as Merge, 
		 COALESCE(output.Abandon,0) as Abandon
from
(select w.week as Week, sum(case upper(c.`status`) when 'A' THEN '1' ELSE '0' END) + 
		  sum(case upper(c.`status`) when 'M' THEN '1' ELSE '0' END) + 
		sum(case upper(c.`status`) when 'N' THEN '1' ELSE '0' END) as Open, 
		 sum(case upper(c.`status`) when 'A' THEN '1' ELSE '0' END) + 
	 sum(case upper(c.`status`) when 'M' THEN '1' ELSE '0' END) as Merge, 
		 sum(case upper(c.`status`) when 'A' THEN '1' ELSE '0' END) as Abandon 
from changes c 
join master_week w on (c.created_on between w.start and w.end) 
left join master_project s on (c.dest_project_name = s.repository) 
where w.week >= (select week from master_week w2
						 where date_add(sysdate(), interval-105 day) between w2.start and w2.end)
and   w.week <= (select week from master_week w2
						 where date_add(sysdate(), interval-7 day) between w2.start and w2.end)
and   s.status in ('사용중') 
and 	s.team like 'commonplatform'
group by w.week) output
right join 
(select * 
from master_week w1
where w1.week >= (select week from master_week w2
						 where date_add(sysdate(), interval-105 day) between w2.start and w2.end)
and   w1.week <= (select week from master_week w2
						 where date_add(sysdate(), interval-7 day) between w2.start and w2.end)) week on (output.Week = week.week);