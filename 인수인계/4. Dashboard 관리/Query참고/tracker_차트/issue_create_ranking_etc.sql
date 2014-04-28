/* Create Ranking*/

/* Bug 외*/

/* 전체*/
SELECT 
mp.dp_project "Project", COUNT(i.issue_key) "등록수"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.type != 'Bug' AND i.created > '2013-01-01'
GROUP BY mp.dp_project
ORDER BY 2 DESC;

/* CommonPlatform*/
SELECT 
mp.dp_project "Project", COUNT(i.issue_key) "등록수"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.type != 'Bug' AND i.created > '2013-01-01'
GROUP BY mp.dp_project
ORDER BY 2 DESC;

/* ProductPlatform*/
SELECT 
mp.dp_project "Project", COUNT(i.issue_key) "등록수"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.type != 'Bug' AND i.created > '2013-01-01'
GROUP BY mp.dp_project
ORDER BY 2 DESC;

/* Component*/
SELECT 
mp.dp_project "Project", COUNT(i.issue_key) "등록수"
FROM jira_issue i
JOIN (
SELECT 
		m.project_key, m.dp_project
FROM master_project m
WHERE m.visible = 'Y' AND m.group = 'Component'
GROUP BY project_key) mp ON (i.project_key = mp.project_key)
WHERE i.type != 'Bug' AND i.created > '2013-01-01'
GROUP BY mp.dp_project
ORDER BY 2 DESC;