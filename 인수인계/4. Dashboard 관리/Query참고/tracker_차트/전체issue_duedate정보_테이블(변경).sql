/*테이블용 query*/
select 
   COALESCE(mp.group,'전체') "Group",
	count(i.issue_id) "Issue 건수",
	sum(not(isnull(i.duedate))) "Due date 입력수",
	concat(round((sum(not(isnull(i.duedate))) / count(i.issue_id)) * 100, 0), '%') as "Due Date 입력율",
	sum(if(isnull(i.duedate)=0 && i.status not in ('Closed','Resolved') && datediff(now(),i.duedate) > 0,1,0)) as "지연 Issue 건수"
from jira_issue i
join (select 
			m.project, 
		   m.project_key,
			m.dp_project,
			m.group 
		from master_project m
		where m.visible = 'Y'
		group by project_key) mp on (i.project_key = mp.project_key)  
group by mp.group;

/*속도 문제로 나눠서 아래 쿼리를 사용합니다.*/
/*1번*/
select a.Group, a.Issue건수, b.진행Issue건수, b.DueDate입력수, b.DueDate입력율
from
(select 
   COALESCE(mp.group,'전체') "Group",
	count(i.issue_id) "Issue건수"
from jira_issue i
join (select 
			m.project, 
		   m.project_key,
			m.dp_project,
			m.group 
		from master_project m
		where m.visible = 'Y'
		group by project_key) mp on (i.project_key = mp.project_key)  
where i.created > '2013-01-01'
group by mp.group) a
join
(select 
   COALESCE(mp.group,'전체') "Group",
	count(i.issue_id) "진행Issue건수",
	sum(not(isnull(i.duedate))) "DueDate입력수",
	concat(round((sum(not(isnull(i.duedate))) / count(i.issue_id)) * 100, 0), '%') as "DueDate입력율"
from jira_issue i
join (select 
			m.project, 
		   m.project_key,
			m.dp_project,
			m.group 
		from master_project m
		where m.visible = 'Y'
		group by project_key) mp on (i.project_key = mp.project_key)  
where i.`status` in ('Open','In Progress','Reopened')
and   i.created > '2013-01-01'
group by mp.group) b on (a.Group = b.Group)
/*2번*/
select 
   COALESCE(mp.group,'전체') "Group",
	count(i.issue_id) "지연 issue 건수"
from jira_issue i
join 
		(select 
			m.project, 
		   m.project_key,
			m.group
		from 
		master_project m
		where m.visible = 'Y'
		group by project_key) mp on (i.project_key = mp.project_key)
where
	isnull(i.duedate) = 0
	and i.created > '2013-01-01'
	and i.`status` not in ('Closed','Resolved')
	and   datediff(now(),i.duedate) > 0
group by mp.group;