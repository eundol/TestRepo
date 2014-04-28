select concat('W',c.inweek) as Week, sum(case c.status when 'A' THEN '1' ELSE '0' END) + 
		  sum(case c.status when 'M' THEN '1' ELSE '0' END) + 
		sum(case c.status when 'n' THEN '1' ELSE '0' END) as Open, 
		 sum(case c.status when 'A' THEN '1' ELSE '0' END) + 
	 sum(case c.status when 'M' THEN '1' ELSE '0' END) as Merge, 
		 sum(case c.status when 'A' THEN '1' ELSE '0' END) as Abandon 
from changes c 
left join master_project s on (c.dest_project_name = s.repository) 
where c.inweek >= (select week from master_week w2
						 where date_add(sysdate(), interval-105 day) between w2.start and w2.end)
and   c.inweek <= (select week from master_week w2
						 where date_add(sysdate(), interval-7 day) between w2.start and w2.end)
and   s.status in ('사용중') 
group by c.inweek;