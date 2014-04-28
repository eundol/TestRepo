/*차트용 query*/
select 
	sum(not(isnull(i.duedate))) "Due date 입력",
	sum(isnull(i.duedate)) "Due date 미입력"
from jira_issue i
join (select 
			m.project, 
		   m.project_key,
			m.dp_project,
			m.group 
		from master_project m
		where m.visible = 'Y'
		and   m.group = 'CommonPlatform'
		group by project_key) mp on (i.project_key = mp.project_key)