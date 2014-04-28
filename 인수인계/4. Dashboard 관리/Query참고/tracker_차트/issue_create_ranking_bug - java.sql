"/* Create Ranking*/\n" +
"\n" + 
"/* Bug*/\n" + 
"\n" + 
"/* 전체*/\n" + 
"SELECT\n" + 
"mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.type = 'Bug' AND i.created > '2013-01-01'\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 2 DESC;\n" + 
"\n" + 
"/* CommonPlatform*/\n" + 
"SELECT\n" + 
"mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.type = 'Bug' AND i.created > '2013-01-01'\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 2 DESC;\n" + 
"\n" + 
"/* ProductPlatform*/\n" + 
"SELECT\n" + 
"mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.type = 'Bug' AND i.created > '2013-01-01'\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 2 DESC;\n" + 
"\n" + 
"/* Component*/\n" + 
"SELECT\n" + 
"mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n" + 
"FROM jira_issue i\n" + 
"JOIN (\n" + 
"SELECT\n" + 
"\t\tm.project_key, m.dp_project\n" + 
"FROM master_project m\n" + 
"WHERE m.visible = 'Y' AND m.group = 'Component'\n" + 
"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
"WHERE i.type = 'Bug' AND i.created > '2013-01-01'\n" + 
"GROUP BY mp.dp_project\n" + 
"ORDER BY 2 DESC;";
