SELECT p.project_name AS Project, SUM(CASE c.status WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE c.status WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE c.status WHEN 'A' THEN '1' ELSE '0' END) AS Abandon
FROM changes c
JOIN master_project p ON (c.dest_project_name = p.repository)
WHERE p.status LIKE '사용중' AND p.team LIKE 'CommonPlatform' AND c.inweek LIKE (
SELECT WEEK
FROM master_week w2
WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end)
GROUP BY p.project_name;