package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import common.JdbcTemplate;

import entity.DelayIssue;
import entity.PiChart;
import entity.Table;
import entity.TableRanking;

public class TrackerDao {

	Connection conn;
	long time = System.currentTimeMillis(); 
	SimpleDateFormat dayTime = new SimpleDateFormat("yyyy");
	String str = "'" + dayTime.format(new Date(time)) + "-01-01'";
	
	public TrackerDao(Connection conn) {
		this.conn = conn;
	}

	public ArrayList<DelayIssue> getDelayIssue(String project) {
		System.out.println("DelayIssue dao~");
		System.out.println(str);
		String query = 	"SELECT i.summary,\n" +
						"\t\t\ti.issue_key,\n" + 
						"\t\t\ti.priority\n" + 
						"FROM jira_issue2 i\n" + 
						"JOIN\n" + 
						"\t(\n" + 
						"SELECT\n" + 
						"\t\tm.project,\n" + 
						"\t m.project_key,\n" + 
						"\t \tm.dp_project,\n" + 
						"\t\tm.group\n" + 
						"FROM\n" + 
						" \tmaster_project m\n" + 
						"WHERE m.visible = 'Y'\n" + 
						"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
						"WHERE ISNULL(i.duedate) = 0 AND i.`status` NOT IN ('Closed','Resolved') AND DATEDIFF(NOW(),i.duedate) > 0 " +
						"and  i.created > " + str + " " +
						"AND mp.dp_project = ?\n" + 
						"order by 3";
		System.out.println(query);
		
		DelayIssue delayIssue = null;
		ArrayList<DelayIssue> delayIssueList = new ArrayList<DelayIssue>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;

		
		try {
			
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, project);
			rset = pstmt.executeQuery();
			while(rset.next()){
				delayIssue = new DelayIssue(rset.getString(1),rset.getString(2),rset.getString(3));
				delayIssueList.add(delayIssue);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}	finally
		{
			JdbcTemplate.close(rset);
			JdbcTemplate.close(pstmt);	
		}
		
		return delayIssueList;
	}
	
	
	/* ****** drawPiChart ****** */
	public ArrayList<PiChart> getPiChart(int n) {
		System.out.println("PiChart dao~");
		String query=null;
		
		// n==1 : SummaryPiChart
		if(n==1){
			query =  "SELECT SUM(NOT(ISNULL(i.duedate))) \"Due date input\", SUM(ISNULL(i.duedate)) \"Due date Not input\"\n" +
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" +
					"where  i.created > " + str + " " +
			        "AND   i.`status` in ('Open','In Progress','Reopened');"; 

		}
		
		// n==2 : CommonPlatform PiChart
		else if(n==2){
			query= "SELECT SUM(NOT(ISNULL(i.duedate))) \"Due date input\", SUM(ISNULL(i.duedate)) \"Due date Not input\"\n" +
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" +
					"where  i.created > " + str + " " +
			        "AND   i.`status` in ('Open','In Progress','Reopened');"; 
		}
		
		// n==3 : ProductPlatform PiChart
		else if(n==3){
			query=	"SELECT SUM(NOT(ISNULL(i.duedate))) \"Due date input\", SUM(ISNULL(i.duedate)) \"Due date Not input\"\n" +
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"\t\t\tm.project,\n" + 
					"\t\t m.project_key,\n" + 
					"\t\t\tm.dp_project,\n" + 
					"\t\t\tm.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" +
					"where  i.created > " + str + " " +
			        "AND   i.`status` in ('Open','In Progress','Reopened');"; 

		}
		
		// n==4 : Component PiChart
		else if(n==4){
			query=	"SELECT SUM(NOT(ISNULL(i.duedate))) \"Due date input\", SUM(ISNULL(i.duedate)) \"Due date Not input\"\n" +
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"\t\t\tm.project,\n" + 
					"\t\t m.project_key,\n" + 
					"\t\t\tm.dp_project,\n" + 
					"\t\t\tm.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'Component'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" +
					"where  i.created > " + str + " " +
			        "AND   i.`status` in ('Open','In Progress','Reopened');"; 
		}
		
		else
			;
		
		System.out.println("********* query : "+query);
		
		PiChart piChart;
		ArrayList<PiChart> piChartList = new ArrayList<PiChart>();
		
		Statement stmt = null;
		ResultSet rset = null;
		ResultSetMetaData rsmd=  null;
		
		int rowCount=0;
		int rsetGetInt1=0, rsetGetInt2=0;
		
		try {
	//		pstmt = conn.prepareStatement(query); // Create Statement
			stmt = conn.createStatement();

		} catch (SQLException e1) {
			e1.printStackTrace();
			System.out.println("Error : createStatement error T.T");
		}

		try {
			rset = stmt.executeQuery(query);
			/* ****** rowCount ****** */
			rset.last();
			rowCount = rset.getRow();
			//rset.beforeFirst();
		
			rsetGetInt1 = rset.getInt(1);
			rsetGetInt2 = rset.getInt(2);
			
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error : stmt ver) executeQuery error T.T");
		}
		
		try {
			rsmd = (ResultSetMetaData) rset.getMetaData();
			System.out.println("********* rowCount : "+rowCount);
			System.out.println("********* rset.getInt(1) : "+rset.getInt(1));
			System.out.println("********* rset.getInt(2) : "+rset.getInt(2));
			System.out.println("********* rsmd.getColumnName(1) : "+rsmd.getColumnName(1));
			System.out.println("********* rsmd.getColumnName(2) : "+rsmd.getColumnName(2));
			
			piChart = new PiChart(rowCount, rsetGetInt1, rsetGetInt2, rsmd.getColumnName(1), rsmd.getColumnName(2));
			piChartList.add(piChart);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Error... : rs.getMetaData() error");
		}	// try-catch
		
		
		finally {		
			JdbcTemplate.close(rset);
			JdbcTemplate.close(stmt);
		}
		
		
		return piChartList;
	}
	
	/* ****** Draw Table ****** */
	public ArrayList<Table> getTable(int n) {
		System.out.println("Table dao~");

		Table table;
		ArrayList<Table> tableList = new ArrayList<Table>();
		int rowCount = 0;
		String[] projectName;
		int[] columnData;
		
		Statement stmt = null;
		Statement stmtDelayNum = null;
		
		ResultSet rset = null;
		ResultSet rsetDelayNum = null;
		
		String query="";
		String queryDelayNum="";
		
		// n==11 : SummaryTable
		if(n==11){
			query = "select a.Group, a.Issue건수, b.진행Issue건수, b.DueDate입력수, b.DueDate입력율\n" +
					"from\n" + 
					"(select\n" + 
					"   COALESCE(mp.group,'전체') \"Group\",\n" + 
					"  count(i.updated) \"Issue건수\"\n" + 
					"from jira_issue2 i\n" + 
					"join (select\n" + 
					"      m.project,\n" + 
					"       m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"    from master_project m\n" + 
					"    where m.visible = 'Y'\n" + 
					"    group by project_key) mp on (i.project_key = mp.project_key)\n" + 
					"where  i.created > " + str + " " +
					"group by mp.group) a\n" + 
					"left join\n" + 
					"(select\n" + 
					"   COALESCE(mp.group,'전체') \"Group\",\n" + 
					"  count(i.updated) \"진행Issue건수\",\n" + 
					"  sum(not(isnull(i.duedate))) \"DueDate입력수\",\n" + 
					"  concat(round((sum(not(isnull(i.duedate))) / count(i.updated)) * 100, 0), '%') as \"DueDate입력율\"\n" + 
					"from jira_issue2 i\n" + 
					"join (select\n" + 
					"      m.project,\n" + 
					"       m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"    from master_project m\n" + 
					"    where m.visible = 'Y'\n" + 
					"    group by project_key) mp on (i.project_key = mp.project_key)\n" + 
					"where i.`status` in ('Open','In Progress','Reopened')\n" + 
					"and  i.created > " + str + " " +
					"group by mp.group) b on (a.Group = b.Group)";
			
			queryDelayNum = "select\n" +
							"   COALESCE(mp.group,'전체') \"Group\",\n" + 
							"\tcount(i.updated) \"지연 issue 건수\"\n" + 
							"from jira_issue2 i\n" + 
							"join\n" + 
							"\t\t(select\n" + 
							"\t\t\tm.project,\n" + 
							"\t\t   m.project_key,\n" + 
							"\t\t\tm.group\n" + 
							"\t\tfrom\n" + 
							"\t\tmaster_project m\n" + 
							"\t\twhere m.visible = 'Y'\n" + 
							"\t\tgroup by project_key) mp on (i.project_key = mp.project_key)\n" + 
							"where\n" + 
							"\tisnull(i.duedate) = 0\n" + 
							"and  i.created > " + str + " " + 
							"\tand i.`status` not in ('Closed','Resolved')\n" + 
							"\tand   datediff(now(),i.duedate) > 0\n" + 
							"group by mp.group;";
		}
		
		// n==2 : CommonPlatform PiChart
		else if(n==22){
			query= 	"SELECT a.dp_project, a.Issue건수, b.진행Issue건수, b.DueDate입력수, b.DueDate입력율\n" +
					"FROM\n" + 
					"(\n" + 
					"SELECT mp.dp_project \"dp_project\", COUNT(i.updated) \"Issue건수\"\n" + 
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
					"where  i.created > " + str + " " +
					"GROUP BY mp.dp_project) a\n" + 
					"LEFT JOIN\n" + 
					"(\n" + 
					"SELECT mp.dp_project \"dp_project\", COUNT(i.updated) \"진행Issue건수\", SUM(NOT(ISNULL(i.duedate))) \"DueDate입력수\", CONCAT(ROUND((SUM(NOT(ISNULL(i.duedate))) / COUNT(i.updated)) * 100, 0), '%') AS \"DueDate입력율\"\n" + 
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
					"WHERE i.`status` IN ('Open','In Progress','Reopened')\n" + 
					"and  i.created > " + str + " " +
					"GROUP BY mp.dp_project) b ON (a.dp_project = b.dp_project);";

			
			queryDelayNum = "select r1.dp_project \"Project\",\n" +
							"\t\t COALESCE(r2.count,0) as \"지연 Issue 건수\"\n" + 
							"from\n" + 
							"\t\t(select\n" + 
							"\t\t\tm.project,\n" + 
							"\t\t   m.project_key,\n" + 
							"\t\t \tm.dp_project,\n" + 
							"\t\t\tm.group\n" + 
							"\t\tfrom\n" + 
							"\t\tmaster_project m\n" + 
							"\t\twhere m.visible = 'Y'\n" + 
							"\t\t\tand   m.group = 'CommonPlatform'\n" + 
							"\t\tgroup by dp_project) r1\n" + 
							"left join\n" + 
							"\t\t(select\n" + 
							"\t\t   mp.dp_project,\n" + 
							"\t\t\tcount(i.updated) \"count\"\n" + 
							"\t\tfrom jira_issue2 i\n" + 
							"\t\tjoin\n" + 
							"\t\t\t\t(select\n" + 
							"\t\t\t\t\tm.project,\n" + 
							"\t\t\t\t   m.project_key,\n" + 
							"\t\t\t\t \tm.dp_project,\n" + 
							"\t\t\t\t\tm.group\n" + 
							"\t\t\t\tfrom\n" + 
							"\t\t\t\tmaster_project m\n" + 
							"\t\t\t\twhere m.visible = 'Y'\n" + 
							"\t\t\t\t\tand   m.group = 'CommonPlatform'\n" + 
							"\t\t\t\tgroup by project_key) mp on (i.project_key = mp.project_key)\n" + 
							"\t\twhere\n" + 
							"\t\t\tisnull(i.duedate) = 0\n" + 
							"and  i.created > " + str + " " +
							"\t\t\tand i.`status` not in ('Closed','Resolved')\n" + 
							"      and   datediff(now(),i.duedate) > 0\n" + 
							"    group by mp.dp_project) r2 on (r1.dp_project = r2.dp_project);";
		}
		
		// n==3 : ProductPlatform PiChart
		else if(n==33){
			query= 	"SELECT a.dp_project, a.Issue건수, b.진행Issue건수, b.DueDate입력수, b.DueDate입력율\n" +
					"FROM\n" + 
					"(\n" + 
					"SELECT mp.dp_project \"dp_project\", COUNT(i.updated) \"Issue건수\"\n" + 
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
					"where  i.created > " + str + " " +
					"GROUP BY mp.dp_project) a\n" + 
					"left JOIN\n" + 
					"(\n" + 
					"SELECT mp.dp_project \"dp_project\", COUNT(i.updated) \"진행Issue건수\", SUM(NOT(ISNULL(i.duedate))) \"DueDate입력수\", CONCAT(ROUND((SUM(NOT(ISNULL(i.duedate))) / COUNT(i.updated)) * 100, 0), '%') AS \"DueDate입력율\"\n" + 
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
					"WHERE i.`status` IN ('Open','In Progress','Reopened')\n" + 
					"and  i.created > " + str + " " +
					"GROUP BY mp.dp_project) b ON (a.dp_project = b.dp_project);";

			queryDelayNum = "select r1.dp_project \"Project\",\n" +
					"\t\t COALESCE(r2.count,0) as \"지연 Issue 건수\"\n" + 
					"from\n" + 
					"\t\t(select\n" + 
					"\t\t\tm.project,\n" + 
					"\t\t   m.project_key,\n" + 
					"\t\t \tm.dp_project,\n" + 
					"\t\t\tm.group\n" + 
					"\t\tfrom\n" + 
					"\t\tmaster_project m\n" + 
					"\t\twhere m.visible = 'Y'\n" + 
					"\t\t\tand   m.group = 'ProductPlatform'\n" + 
					"\t\tgroup by dp_project) r1\n" + 
					"left join\n" + 
					"\t\t(select\n" + 
					"\t\t   mp.dp_project,\n" + 
					"\t\t\tcount(i.updated) \"count\"\n" + 
					"\t\tfrom jira_issue2 i\n" + 
					"\t\tjoin\n" + 
					"\t\t\t\t(select\n" + 
					"\t\t\t\t\tm.project,\n" + 
					"\t\t\t\t   m.project_key,\n" + 
					"\t\t\t\t \tm.dp_project,\n" + 
					"\t\t\t\t\tm.group\n" + 
					"\t\t\t\tfrom\n" + 
					"\t\t\t\tmaster_project m\n" + 
					"\t\t\t\twhere m.visible = 'Y'\n" + 
					"\t\t\t\t\tand   m.group = 'ProductPlatform'\n" + 
					"\t\t\t\tgroup by project_key) mp on (i.project_key = mp.project_key)\n" + 
					"\t\twhere\n" + 
					"\t\t\tisnull(i.duedate) = 0\n" + 
					"and  i.created > " + str + " " +
					"\t\t\tand i.`status` not in ('Closed','Resolved')\n" + 
					"      and   datediff(now(),i.duedate) > 0\n" + 
					"    group by mp.dp_project) r2 on (r1.dp_project = r2.dp_project);";

		}
		
		// n==4 : Component PiChart
		else if(n==44){
			query= 	"SELECT a.dp_project, a.Issue건수, b.진행Issue건수, b.DueDate입력수, b.DueDate입력율\n" +
					"FROM\n" + 
					"(\n" + 
					"SELECT mp.dp_project \"dp_project\", COUNT(i.updated) \"Issue건수\"\n" + 
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'Component'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
					"where  i.created > " + str + " " +
					"GROUP BY mp.dp_project) a\n" + 
					"left JOIN\n" + 
					"(\n" + 
					"SELECT mp.dp_project \"dp_project\", COUNT(i.updated) \"진행Issue건수\", SUM(NOT(ISNULL(i.duedate))) \"DueDate입력수\", CONCAT(ROUND((SUM(NOT(ISNULL(i.duedate))) / COUNT(i.updated)) * 100, 0), '%') AS \"DueDate입력율\"\n" + 
					"FROM jira_issue2 i\n" + 
					"JOIN (\n" + 
					"SELECT\n" + 
					"      m.project,\n" + 
					"     m.project_key,\n" + 
					"      m.dp_project,\n" + 
					"      m.group\n" + 
					"FROM master_project m\n" + 
					"WHERE m.visible = 'Y' AND m.group = 'Component'\n" + 
					"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
					"WHERE i.`status` IN ('Open','In Progress','Reopened')\n" + 
					"and  i.created > " + str + " " +
					"GROUP BY mp.dp_project) b ON (a.dp_project = b.dp_project);";
			
			queryDelayNum = "select r1.dp_project \"Project\",\n" +
					"\t\t COALESCE(r2.count,0) as \"지연 Issue 건수\"\n" + 
					"from\n" + 
					"\t\t(select\n" + 
					"\t\t\tm.project,\n" + 
					"\t\t   m.project_key,\n" + 
					"\t\t \tm.dp_project,\n" + 
					"\t\t\tm.group\n" + 
					"\t\tfrom\n" + 
					"\t\tmaster_project m\n" + 
					"\t\twhere m.visible = 'Y'\n" + 
					"\t\t\tand   m.group = 'Component'\n" + 
					"\t\tgroup by dp_project) r1\n" + 
					"left join\n" + 
					"\t\t(select\n" + 
					"\t\t   mp.dp_project,\n" + 
					"\t\t\tcount(i.updated) \"count\"\n" + 
					"\t\tfrom jira_issue2 i\n" + 
					"\t\tjoin\n" + 
					"\t\t\t\t(select\n" + 
					"\t\t\t\t\tm.project,\n" + 
					"\t\t\t\t   m.project_key,\n" + 
					"\t\t\t\t \tm.dp_project,\n" + 
					"\t\t\t\t\tm.group\n" + 
					"\t\t\t\tfrom\n" + 
					"\t\t\t\tmaster_project m\n" + 
					"\t\t\t\twhere m.visible = 'Y'\n" + 
					"\t\t\t\t\tand   m.group = 'Component'\n" + 
					"\t\t\t\tgroup by project_key) mp on (i.project_key = mp.project_key)\n" + 
					"\t\twhere\n" + 
					"\t\t\tisnull(i.duedate) = 0\n" + 
					"and  i.created > " + str + " " +
					"\t\t\tand i.`status` not in ('Closed','Resolved')\n" + 
					"      and   datediff(now(),i.duedate) > 0\n" + 
					"    group by mp.dp_project) r2 on (r1.dp_project = r2.dp_project);";

		}
		
		else
			;
		
		try {
			stmt = conn.createStatement();
			stmtDelayNum = conn.createStatement();	
		} catch (SQLException e1) {
			e1.printStackTrace();
			System.out.println("Error : createStatement error T.T");
		}

		try {
			rset = stmt.executeQuery(query);
			rsetDelayNum = stmtDelayNum.executeQuery(queryDelayNum);
			
			/* ****** rowCount ****** */
			rset.last();
			rowCount = rset.getRow();
			System.out.println("rowCount : "+rowCount);
	
			// Initialize projectName, columnData array, columnDataDelayNum array
			projectName = new String[rowCount];
			columnData = new int[rowCount*5];
			
			/* read data */
			/////////////////////////////////////////////////
			rset.beforeFirst();
			int nameIndex=0;
			int dataIndex=0;
			int temp2=0;
			int tmp1=0;	// for print console
			while(rset.next()){
				projectName[nameIndex++] = rset.getString(1);
				System.out.println("projectName : "+projectName[tmp1++]);
				
				System.out.print("columnData : ");
				for(int i=2; i<7; i++){
					if(i==6){
						boolean noneFlag = true;
						while(rsetDelayNum.next()){
							if(rset.getString(1).equals(rsetDelayNum.getString(1))){
								columnData[dataIndex++] = rsetDelayNum.getInt(2);
								noneFlag = false;
								break;
							}
						}
						if(noneFlag){
							columnData[dataIndex++] = 0;
						}
						rsetDelayNum.beforeFirst();
					}
					else{	// i==2,3,4,5
						columnData[dataIndex++] = rset.getInt(i);}
					System.out.print(columnData[temp2++]+" ");
				}System.out.println();
			}	// end of while	
			
			table = new Table(rowCount, projectName, columnData);
			tableList.add(table);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error : executeQuery error T.T");
		}
		finally {		
			JdbcTemplate.close(rset);
			JdbcTemplate.close(rsetDelayNum);
			JdbcTemplate.close(stmt);
			JdbcTemplate.close(stmtDelayNum);
		}
		
		return tableList;		
		
	}
	
	public TableRanking getTableRanking(int n) {
		System.out.println("TableCreateRanking dao");

		TableRanking tableRanking = new TableRanking();
		int rowCountBug = 0;
		int rowCountEtc = 0;
		String[] projectName;
		int[] columnData;

		Statement stmtBug = null;
		Statement stmtEtc = null;
		ResultSet rsetBug = null;
		ResultSet rsetEtc = null;

		String queryBug = "";
		String queryEtc = "";

		int rowSize = 5;

		if (n == 111) {
			queryBug = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type = 'Bug' " +
					"and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;\n";

			queryEtc = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type != 'Bug' and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;\n";
		}

		else if (n == 222) {
			queryBug = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type = 'Bug' and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;\n";

			queryEtc = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type != 'Bug' and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;";
		}

		else if (n == 333) {
			queryBug = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type = 'Bug' and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;\n";
			queryEtc = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type != 'Bug' and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;\n";

		}

		else if (n == 444) {
			queryBug = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'Component'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type = 'Bug' and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;";
			queryEtc = "SELECT\n"
					+ "mp.dp_project \"Project\", COUNT(i.issue_key) \"등록수\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "    m.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'Component'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.type != 'Bug' and  i.created > " + str + " " 
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 2 DESC;";

		} else
			;

		try {
			stmtBug = conn.createStatement();
			stmtEtc = conn.createStatement();
		} catch (SQLException e1) {
			e1.printStackTrace();
			System.out.println("Error : createStatement error T.T");
		}

		try {
			rsetBug = stmtBug.executeQuery(queryBug);
			rsetEtc = stmtEtc.executeQuery(queryEtc);
			
			/* ****** rowCount ****** */
			rsetBug.last();
			rowCountBug = rsetBug.getRow();
			System.out.println("rowCountBug : " + rowCountBug);

			rsetEtc.last();
			rowCountEtc = rsetEtc.getRow();
			System.out.println("rowCountEtc : " + rowCountEtc);

			// Initialize projectName, columnData array, columnDataDelayNum
			// array
			projectName = new String[rowSize * 2];
			columnData = new int[rowSize * 2];

			/* read data */
			/////////////////////////////////////////////////
			rsetBug.beforeFirst();
			rsetEtc.beforeFirst();

			int flag = 1;
			for (int index = 0; index < rowSize * 2; index++) { // rowSize : 5
				// flag : 1 - Create Ranking (Bug)
				if (flag == 1) {
					
					if (rowCountBug < rowSize) {
						if (index >= rowCountBug) {
							projectName[index] = null;
							columnData[index] = 0; // must change 0 to "-"
							// character
						} else {
							rsetBug.next();
							projectName[index] = rsetBug.getString(1);
							columnData[index] = rsetBug.getInt(2);
						}
					}
					
					else {
						rsetBug.next();
						projectName[index] = rsetBug.getString(1);
						columnData[index] = rsetBug.getInt(2);
					}
					
					// System.out.print("*****projectName["+index+"] : "+projectName[index]);
					
					if (index == rowSize - 1) {
						flag = 0;
						System.out.println("flag 0 right?");
					}
				}// end of flag==1

				// flag : 0 - Create Ranking (Etc)
				else if (flag == 0) {
					System.out.println("Enter the flag 0, index size : " + index);

					if (rowCountEtc < rowSize) {
						if ((index - 5) >= rowCountEtc) {
							projectName[index] = "-";
							columnData[index] = 0; // must change 0 to "-"
													// character
						} else {
							rsetEtc.next();
							projectName[index] = rsetEtc.getString(1);
							columnData[index] = rsetEtc.getInt(2);
						}
					}

					else {
						rsetEtc.next();
						projectName[index] = rsetEtc.getString(1);
						columnData[index] = rsetEtc.getInt(2);
					}

					// System.out.println("projectName["+index+"] : "+projectName[index]);
				}// end of flag==0

				else
					;
			} // end of for loop

			tableRanking = new TableRanking(projectName, columnData);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error : executeQuery error T.T");
		} finally {
			JdbcTemplate.close(rsetBug);
			JdbcTemplate.close(rsetEtc);
			JdbcTemplate.close(stmtBug);
			JdbcTemplate.close(stmtEtc);
		}

		return tableRanking;
	}

	public TableRanking getTableUpdateRanking(int n) {
		System.out.println("TableUpdateRanking dao");

		TableRanking tableUpdateRanking = new TableRanking();
		int rowCount = 0;
		String[] projectName;
		int[] columnData;

		Statement stmt = null;
		ResultSet rset = null;

		int rowSize = 5;		// ranking upto 5		
		String query="";
			
		if (n == 1111) { // 1111 means Summary
			query = "SELECT\n"
					+ "mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n"
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 7 DESC, 5 DESC;\n";
		} else if (n == 2222) { // 2222 means CommonPlatform
			query = "SELECT\n"
					+ "mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n"
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 7 DESC, 5 DESC;\n";
		} else if (n == 3333) { // 3333 means ProductPlatform
			query = "SELECT\n"
					+ "mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'ProductPlatform'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n"
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 7 DESC, 5 DESC;\n";
		} else if (n == 4444) { // 4444 means Component
			query = "SELECT\n"
					+ "mp.dp_project, SUM(CASE i.type WHEN 'Task' THEN '1' ELSE '0' END) \"Task\", SUM(CASE i.type WHEN 'Sub-task' THEN '1' ELSE '0' END) \"Sub-task\", SUM(CASE i.type WHEN 'Story' THEN '1' ELSE '0' END) \"Story\", SUM(CASE i.type WHEN 'Bug' THEN '1' ELSE '0' END) \"Bug\", SUM(CASE i.type WHEN 'Requirement' THEN '1' ELSE '0' END) \"Requirement\", COUNT(i.issue_key) \"Total\"\n"
					+ "FROM jira_issue2 i\n"
					+ "JOIN (\n"
					+ "SELECT\n"
					+ "\t\tm.project_key, m.dp_project\n"
					+ "FROM master_project m\n"
					+ "WHERE m.visible = 'Y' AND m.group = 'Component'\n"
					+ "GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n"
					+ "WHERE i.updated >= DATE_ADD(SYSDATE(), INTERVAL-7 DAY)\n"
					+ "GROUP BY mp.dp_project\n" + "ORDER BY 7 DESC, 5 DESC;";
		} else	;
		
		try {
			stmt = conn.createStatement();
		} catch (SQLException e1) {
			e1.printStackTrace();
			System.out.println("Error : createStatement error T.T");
		}

		try {
			rset = stmt.executeQuery(query);

			/* ****** rowCount ****** */
			rset.last();
			rowCount = rset.getRow();
			System.out.println("rowCount(UpdateRanking) : " + rowCount);

			rset.last();
			rowCount = rset.getRow();
			System.out.println("rowCountEtc : " + rowCount);

			// Initialize projectName, columnData array, columnDataDelayNum
			// array
			projectName = new String[rowSize];
			columnData = new int[rowSize*6];

			/* read data */
			// ///////////////////////////////////////////////
			rset.beforeFirst();
			int nameIndex = 0;
			int dataIndex = 0;

			for (int i = 0; i < rowSize; i++) { // rowSize : 5
				rset.next();			
				
				if(rowCount < rowSize){
					if(i>=rowCount){
						projectName[nameIndex++]= null;	
						for(int j=2; j<=7; j++)
							columnData[dataIndex++]= 0; 
 					}
					else{
						projectName[nameIndex++] = rset.getString(1); // Insert Project Name					
						for(int j=2; j<=7; j++)
							columnData[dataIndex++] = rset.getInt(j); // Insert Column Data
					}
				}
				
				else {
					projectName[nameIndex++] = rset.getString(1); // Insert Project Name					
					for(int j=2; j<=7; j++)
						columnData[dataIndex++] = rset.getInt(j); // Insert Column Data
					
				}
			} // end of for loop

			tableUpdateRanking = new TableRanking(projectName, columnData);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error : executeQuery error T.T");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(stmt);
		}

		return tableUpdateRanking;		
			

	}
}