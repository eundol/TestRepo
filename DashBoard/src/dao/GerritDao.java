package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


import common.JdbcTemplate;

import entity.Chart;
import entity.ChangeInfo;
import entity.DatePrint;
import entity.Table;


public class GerritDao {

	Connection conn;

	public GerritDao(Connection conn) {
		super();
		this.conn = conn;
	}

	public ArrayList<ChangeInfo> getMergeList(String project) {
		System.out.println("dao~");
		
		String query =	"SELECT mp.project_name,\n" +
						"c.change_id,\n" + 
						"c.subject,\n" + 
						"c.owner_account_id,\n" + 
						"c.last_updated_on,\n" + 
						"a.full_name,\n" + 
						"a.preferred_email\n" + 
						"FROM master_project mp\n" + 
						"LEFT JOIN changes c ON (mp.repository = c.dest_project_name)\n" + 
						"join accounts a on (c.owner_account_id = a.account_id)\n" + 
						"WHERE c.inweek = (\n" + 
						"SELECT WEEK\n" + 
						"FROM master_week w2\n" + 
						"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND mp.status LIKE '사용중' AND mp.project_name LIKE ? AND c.status = 'M'\n" + 
						"order by 5 desc;";

		ChangeInfo mergeChange = null;
		ArrayList<ChangeInfo> mergeList = new ArrayList<ChangeInfo>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		
		try {
			
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, project);
			rset = pstmt.executeQuery();
			while(rset.next()){
				mergeChange = new ChangeInfo(rset.getString(1),rset.getInt(2),rset.getString(3),rset.getInt(4),rset.getString(5),rset.getString(6),rset.getString(7));
				mergeList.add(mergeChange);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}	finally
		{
			JdbcTemplate.close(rset);
			JdbcTemplate.close(pstmt);	
		}
		
		return mergeList;
	}

	public ArrayList<ChangeInfo> getAbandonList(String project) {
		System.out.println("dao~");
		
		String query =	"SELECT mp.project_name,\n" +
						"c.change_id,\n" + 
						"c.subject,\n" + 
						"c.owner_account_id,\n" + 
						"c.last_updated_on,\n" + 
						"a.full_name,\n" + 
						"a.preferred_email\n" + 
						"FROM master_project mp\n" + 
						"LEFT JOIN changes c ON (mp.repository = c.dest_project_name)\n" + 
						"join accounts a on (c.owner_account_id = a.account_id)\n" + 
						"WHERE c.inweek = (\n" + 
						"SELECT WEEK\n" + 
						"FROM master_week w2\n" + 
						"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND mp.status LIKE '사용중' AND mp.project_name LIKE ? AND c.status = 'A'\n" + 
						"order by 5 desc;";

		ChangeInfo abandonChange = null;
		ArrayList<ChangeInfo> abandonList = new ArrayList<ChangeInfo>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		
		try {
			
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, project);
			rset = pstmt.executeQuery();
			while(rset.next()){
				abandonChange = new ChangeInfo(rset.getString(1),rset.getInt(2),rset.getString(3),rset.getInt(4),rset.getString(5),rset.getString(6),rset.getString(7));
				abandonList.add(abandonChange);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}	finally
		{
			JdbcTemplate.close(rset);
			JdbcTemplate.close(pstmt);	
		}
		
		return abandonList;
	}

	public ArrayList<ChangeInfo> getOpenList(String project) {
		System.out.println("dao~");
		
		String query =	"SELECT mp.project_name,\n" +
						"c.change_id,\n" + 
						"c.subject,\n" + 
						"c.owner_account_id,\n" + 
						"c.last_updated_on,\n" + 
						"a.full_name,\n" + 
						"a.preferred_email\n" + 
						"FROM master_project mp\n" + 
						"LEFT JOIN changes c ON (mp.repository = c.dest_project_name)\n" + 
						"join accounts a on (c.owner_account_id = a.account_id)\n" + 
						"WHERE c.inweek = (\n" + 
						"SELECT WEEK\n" + 
						"FROM master_week w2\n" + 
						"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND mp.status LIKE '사용중' AND mp.project_name LIKE ? AND c.status = 'n'\n" + 
						"order by 5 desc;";

		ChangeInfo openChange = null;
		ArrayList<ChangeInfo> openList = new ArrayList<ChangeInfo>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		
		try {
			
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, project);
			rset = pstmt.executeQuery();
			while(rset.next()){
				openChange = new ChangeInfo(rset.getString(1),rset.getInt(2),rset.getString(3),rset.getInt(4),rset.getString(5),rset.getString(6),rset.getString(7));
				openList.add(openChange);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}	finally
		{
			JdbcTemplate.close(rset);
			JdbcTemplate.close(pstmt);	
		}
		
		return openList;
	}

	public ArrayList<ChangeInfo> getFullList(String project) {
		System.out.println("dao~");
		
		String query =	"SELECT mp.project_name,\n" +
						"c.change_id,\n" + 
						"c.subject,\n" + 
						"c.owner_account_id,\n" + 
						"c.last_updated_on,\n" + 
						"a.full_name,\n" + 
						"a.preferred_email,\n" +
						"c.status\n" +
						"FROM master_project mp\n" + 
						"LEFT JOIN changes c ON (mp.repository = c.dest_project_name)\n" + 
						"join accounts a on (c.owner_account_id = a.account_id)\n" + 
						"WHERE c.inweek = (\n" + 
						"SELECT WEEK\n" + 
						"FROM master_week w2\n" + 
						"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND mp.status LIKE '사용중' AND mp.project_name LIKE ? AND c.status like '%'\n" + 
						"order by 5 desc;";

		ChangeInfo fullChange = null;
		ArrayList<ChangeInfo> fullList = new ArrayList<ChangeInfo>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		
		try {
			
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, project);
			rset = pstmt.executeQuery();
			while(rset.next()){
				fullChange = new ChangeInfo(rset.getString(1),rset.getInt(2),rset.getString(3),rset.getInt(4),rset.getString(5),rset.getString(6),rset.getString(7));
				fullChange.setStatus(rset.getString(8));
				fullList.add(fullChange);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}	finally
		{
			JdbcTemplate.close(rset);
			JdbcTemplate.close(pstmt);	
		}
		
		return fullList;
	}

	public ArrayList<DatePrint> getDatePrintList(){
		System.out.println("DatePrint Dao :D");
		
		DatePrint datePrint;
		ArrayList<DatePrint> datePrintList = new ArrayList<DatePrint>();
		
		Statement stmt = null;
		ResultSet rset = null;
		ResultSetMetaData rsmd = null;
		
		String dateFrom;
		String dateTo;
		
		String query = "SELECT DATE_FORMAT(w2.start, '%m / %d'), DATE_FORMAT(DATE_ADD(w2.end, INTERVAL-1 DAY), '%m / %d') FROM master_week w2 WHERE DATE_ADD"
				+"(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end ";
		
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
			//rset.beforeFirst();
		
			dateFrom = rset.getString(1);
			dateTo = rset.getString(2);
			datePrint = new DatePrint(dateFrom, dateTo);
			datePrintList.add(datePrint);
			
		
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error : executeQuery error T.T");
		}
		finally {		
			JdbcTemplate.close(rset);
			JdbcTemplate.close(stmt);
		}
		
		return datePrintList;
	}
	/* ****** end of getDatePrintList() ****** */
	
	public ArrayList<Chart> getChartList(int n){
		
		System.out.println("Chart Dao :D");
		
		Chart chart;
		ArrayList<Chart> chartList = new ArrayList<Chart>();
		int rowCount = 0;
		String xCategories = "";
		String name1 = null, name2 = null, name3 = null;
		String dataOpen = "";
		String dataMerge = "";
		String dataAbandon = "";
		
		Statement stmt = null;
		ResultSet rset = null;
		ResultSetMetaData rsmd = null;
		
		String query = null;
		
		/* ****** Bar Chart Query ****** */
		if(n==1){
			query = "SELECT p.project_name AS Project, SUM(CASE c.status WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE c.status WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE c.status WHEN 'A' THEN '1' ELSE '0' END) AS Abandon\n" +
					"FROM changes c\n" + 
					"JOIN master_project p ON (c.dest_project_name = p.repository)\n" + 
					"WHERE p.status LIKE '사용중' AND p.team LIKE 'CommonPlatform' AND c.inweek LIKE (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end)\n" + 
					"GROUP BY p.project_name;";
		}
		else if(n==2){
			query =  "SELECT p.project_name AS Project, SUM(CASE c.status WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE c.status WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE c.status WHEN 'A' THEN '1' ELSE '0' END) AS Abandon\n" +
					"FROM changes c\n" + 
					"JOIN master_project p ON (c.dest_project_name = p.repository)\n" + 
					"WHERE p.status LIKE '사용중' AND p.team LIKE 'Productplatform' AND c.inweek LIKE (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end)\n" + 
					"GROUP BY p.project_name;";
		}
		else if(n==3){
			query =  "SELECT p.project_name AS Project, SUM(CASE c.status WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE c.status WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE c.status WHEN 'A' THEN '1' ELSE '0' END) AS Abandon\n" +
					"FROM changes c\n" + 
					"JOIN master_project p ON (c.dest_project_name = p.repository)\n" + 
					"WHERE p.status LIKE '사용중' AND p.team LIKE 'Component' AND c.inweek LIKE (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end)\n" + 
					"GROUP BY p.project_name;";

		}
		/* ****** end of BarChart Query ****** */
		
		/* ****** Area Chart Query ****** */
		else if(n==11){
			query = "SELECT w.week AS WEEK, COALESCE(output.Open,0) AS OPEN, COALESCE(output.Merge,0) AS Merge, COALESCE(output.Abandon,0) AS Abandon\n" +
					"FROM\n" + 
					"(\n" + 
					"SELECT c.inweek AS WEEK, SUM(CASE UPPER(c.`status`) WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE UPPER(c.`status`) WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE UPPER(c.`status`) WHEN 'A' THEN '1' ELSE '0' END) AS Abandon\n" + 
					"FROM changes c\n" + 
					"LEFT JOIN master_project s ON (c.dest_project_name = s.repository)\n" + 
					"WHERE c.inweek >= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND c.inweek <= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND s.status IN ('사용중') AND \ts.team LIKE 'commonplatform'\n" + 
					"GROUP BY c.inweek) output\n" + 
					"RIGHT JOIN\n" + 
					"(\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w1\n" + 
					"WHERE w1.week >= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND w1.week <= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w3\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w3.start AND w3.end)) w ON (output.Week = w.week);";


		}
		
		else if(n==22){
			query =		    "SELECT w.week AS WEEK, COALESCE(output.Open,0) AS OPEN, COALESCE(output.Merge,0) AS Merge, COALESCE(output.Abandon,0) AS Abandon\n" +
					"FROM\n" + 
					"(\n" + 
					"SELECT c.inweek AS WEEK, SUM(CASE UPPER(c.`status`) WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE UPPER(c.`status`) WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE UPPER(c.`status`) WHEN 'A' THEN '1' ELSE '0' END) AS Abandon\n" + 
					"FROM changes c\n" + 
					"LEFT JOIN master_project s ON (c.dest_project_name = s.repository)\n" + 
					"WHERE c.inweek >= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND c.inweek <= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND s.status IN ('사용중') AND \ts.team LIKE 'productplatform'\n" + 
					"GROUP BY c.inweek) output\n" + 
					"RIGHT JOIN\n" + 
					"(\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w1\n" + 
					"WHERE w1.week >= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w2\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND w1.week <= (\n" + 
					"SELECT WEEK\n" + 
					"FROM master_week w3\n" + 
					"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w3.start AND w3.end)) w ON (output.Week = w.week);";
		
		}
		
		else if(n==33){
			query = "SELECT w.week AS WEEK, COALESCE(output.Open,0) AS OPEN, COALESCE(output.Merge,0) AS Merge, COALESCE(output.Abandon,0) AS Abandon\n" +
				"FROM\n" + 
				"(\n" + 
				"SELECT c.inweek AS WEEK, SUM(CASE UPPER(c.`status`) WHEN 'N' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE UPPER(c.`status`) WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE UPPER(c.`status`) WHEN 'A' THEN '1' ELSE '0' END) AS Abandon\n" + 
				"FROM changes c\n" + 
				"LEFT JOIN master_project s ON (c.dest_project_name = s.repository)\n" + 
				"WHERE c.inweek >= (\n" + 
				"SELECT WEEK\n" + 
				"FROM master_week w2\n" + 
				"WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND c.inweek <= (\n" + 
				"SELECT WEEK\n" + 
				"FROM master_week w2\n" + 
				"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND s.status IN ('사용중') AND \ts.team LIKE 'component'\n" + 
				"GROUP BY c.inweek) output\n" + 
				"RIGHT JOIN\n" + 
				"(\n" + 
				"SELECT WEEK\n" + 
				"FROM master_week w1\n" + 
				"WHERE w1.week >= (\n" + 
				"SELECT WEEK\n" + 
				"FROM master_week w2\n" + 
				"WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND w1.week <= (\n" + 
				"SELECT WEEK\n" + 
				"FROM master_week w3\n" + 
				"WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w3.start AND w3.end)) w ON (output.Week = w.week);";


		}
		/* ****** end of BarChart Query ****** */
		
		else ;
		
		
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
			System.out.println("rowCount : "+rowCount);
	
			/* read data */
			/////////////////////////////////////////////////
			rset.beforeFirst();
			while(rset.next()){
				String tempStringXCategories = null;
				String tempStringOpen = null;
				String tempStringMerge = null;
				String tempStringAbandon = null;
				
				if(rset.isFirst()){
					tempStringXCategories = "";	
					tempStringOpen = "";
					tempStringMerge = "";
					tempStringAbandon = "";
				}
				else{
					tempStringXCategories = ",";
					tempStringOpen = ",";
					tempStringMerge = ",";
					tempStringAbandon = ",";
				}
				
				tempStringXCategories += "'"+rset.getString(1)+"'";// STRING INPUT FORMAT : 'LG'
				tempStringOpen += rset.getInt(2);
				tempStringMerge += rset.getInt(3);
				tempStringAbandon += rset.getInt(4);
				
				// String concatenation 
				xCategories += tempStringXCategories;
				dataOpen += tempStringOpen;
				dataMerge += tempStringMerge;
				dataAbandon += tempStringAbandon;
		}	// end of while	
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error : executeQuery error T.T");
		}
		
		try {
			rsmd = (ResultSetMetaData) rset.getMetaData();
			name1 = rsmd.getColumnName(2);
			name2 = rsmd.getColumnName(3);
			name3 = rsmd.getColumnName(4);

			System.out.println("********* rsmd.getColumnName(2) : "+rsmd.getColumnName(2));
			System.out.println("********* rsmd.getColumnName(3) : "+rsmd.getColumnName(3));
			System.out.println("********* rsmd.getColumnName(4) : "+rsmd.getColumnName(4));

			chart = new Chart(rowCount, xCategories, name1, name2, name3, dataOpen, dataMerge, dataAbandon);
			chartList.add(chart);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Error... : rs.getMetaData() error");
		}	// try-catch
		
		
		finally {		
			JdbcTemplate.close(rset);
			JdbcTemplate.close(stmt);
		}
		
		return chartList;		
	}
	
	/* ****** Get Table List ****** */
	public ArrayList<Table> getTableList(int n)
	{
		System.out.println("Table Dao :D");
		
		Table table;
		ArrayList<Table> tableList = new ArrayList<Table>();
		int rowCount = 0;
		String[] projectName;  
		int[] columnData;
		
		Statement stmt = null;
		ResultSet rset = null;
		ResultSetMetaData rsmd = null;
		
		String query = null;
		
		/* ****** Table Query ****** */
		if(n==111){
			query=		"select pl.project_name as PJTname,\n"
					+ "\t    COALESCE(output.developers,'0') as committers,\n"
					+ "\t    md0.persons as Persons,\n"
					+ "\t    COALESCE(output.participationrate,'0%') as participationrate,\n"
					+ "\t    COALESCE(output.Merge,'0') as Merge,\n"
					+ "\t    COALESCE(output.Abandon,'0') as Abandon,\n"
					+ "\t    COALESCE(output.Open,'0') as Open,\n"
					+ "\t    COALESCE(output.Total,'0') as Total,\n"
					+ "\t    COALESCE(output.Total,'0')-COALESCE(b.push,'0') as compare\n"
					+ "from\n"
					+ "(select mp0.project_name\n"
					+ "from master_project mp0\n"
					+ "where mp0.team like 'CommonPlatform'\n"
					+ "and   mp0.status like '사용중'\n"
					+ "group by mp0.project_name) pl\n"
					+ "left join\n"
					+ "(select md.project,\n"
					+ "     a.developers,\n"
					+ "     md.persons,\n"
					+ "     concat(round((a.developers / md.persons) * 100, 0),'%') as participationrate,\n"
					+ "     a.merge as Merge,\n"
					+ "     a.abandon as Abandon,\n"
					+ "     a.open as Open,\n"
					+ "     a.push as Total,\n"
					+ "     a.team\n"
					+ "from master_developer md\n"
					+ "right join\n"
					+ "  (select mp.project_name,\n"
					+ "        mp.team,\n"
					+ "        count(distinct(c.owner_account_id)) as developers,\n"
					+ "        count(c.change_id) as push,\n"
					+ "        sum(case c.status when 'M' then '1' else '0' end) as merge,\n"
					+ "        sum(case c.status when 'A' then '1' else '0' end) as abandon,\n"
					+ "        sum(case c.status when 'n' then '1' else '0' end) as open\n"
					+ "  from master_project mp\n"
					+ "  left join changes c on (mp.repository = c.dest_project_name)\n"
					+ "  join master_week w on (c.created_on between w.start and w.end)\n"
					+ "  where w.week = (select week from master_week w2\n"
					+ "             where date_add(sysdate(), interval-7 day) between w2.start and w2.end)\n"
					+ "  and   mp.`status` like '사용중'\n"
					+ "  and   mp.team like 'CommonPlatform'\n"
					+ "  group by mp.project_name) a on (md.project = a.project_name)) output on (pl.project_name = output.project)\n"
					+ "left join master_developer md0 on (pl.project_name = md0.project)\n"
					+ "left join\n"
					+ "   (select mp1.project_name,\n"
					+ "        count(c1.change_id) as push\n"
					+ "  from master_project mp1\n"
					+ "  left join changes c1 on (mp1.repository = c1.dest_project_name)\n"
					+ "  join master_week w1 on (c1.created_on between w1.start and w1.end)\n"
					+ "  where w1.week = (select week from master_week w3\n"
					+ "              where date_add(sysdate(), interval-14 day) between w3.start and w3.end)\n"
					+ "  and   mp1.`status` like '사용중'\n"
					+ "   and   mp1.team like 'CommonPlatform'\n group by mp1.project_name) b on (pl.project_name = b.project_name)";

		}
		else if(n==222){
			query="select pl.project_name as PJTname,\n"
					+ "\t    COALESCE(output.developers,'0') as committers,\n"
					+ "\t    md0.persons as Persons,\n"
					+ "\t    COALESCE(output.participationrate,'0%') as participationrate,\n"
					+ "\t    COALESCE(output.Merge,'0') as Merge,\n"
					+ "\t    COALESCE(output.Abandon,'0') as Abandon,\n"
					+ "\t    COALESCE(output.Open,'0') as Open,\n"
					+ "\t    COALESCE(output.Total,'0') as Total,\n"
					+ "\t    COALESCE(output.Total,'0')-COALESCE(b.push,'0') as compare\n"
					+ "from\n"
					+ "(select mp0.project_name\n"
					+ "from master_project mp0\n"
					+ "where mp0.team like 'ProductPlatform'\n"
					+ "and   mp0.status like '사용중'\n"
					+ "group by mp0.project_name) pl\n"
					+ "left join\n"
					+ "(select md.project,\n"
					+ "\t\t a.developers,\n"
					+ "\t\t md.persons,\n"
					+ "\t\t concat(round((a.developers / md.persons) * 100, 0),'%') as participationrate,\n"
					+ "\t\t a.merge as Merge,\n"
					+ "\t\t a.abandon as Abandon,\n"
					+ "\t\t a.open as Open,\n"
					+ "\t\t a.push as Total,\n"
					+ "\t\t a.team\n"
					+ "from master_developer md\n"
					+ "right join\n"
					+ "\t(select mp.project_name,\n"
					+ "\t\t\t  mp.team,\n"
					+ "\t\t\t  count(distinct(c.owner_account_id)) as developers,\n"
					+ "\t\t\t  count(c.change_id) as push,\n"
					+ "\t\t\t  sum(case c.status when 'M' then '1' else '0' end) as merge,\n"
					+ "\t\t\t  sum(case c.status when 'A' then '1' else '0' end) as abandon,\n"
					+ "\t\t\t  sum(case c.status when 'n' then '1' else '0' end) as open\n"
					+ "\tfrom master_project mp\n"
					+ "\tleft join changes c on (mp.repository = c.dest_project_name)\n"
					+ "\tjoin master_week w on (c.created_on between w.start and w.end)\n"
					+ "\twhere w.week = (select week from master_week w2\n"
					+ "\t\t\t\t\t\t where date_add(sysdate(), interval-7 day) between w2.start and w2.end)\n"
					+ "\tand   mp.`status` like '사용중'\n"
					+ "\tand   mp.team like 'ProductPlatform'\n"
					+ "\tgroup by mp.project_name) a on (md.project = a.project_name)) output on (pl.project_name = output.project)\n"
					+ "left join master_developer md0 on (pl.project_name = md0.project)\n"
					+ "left join\n"
					+ "   (select mp1.project_name,\n"
					+ "        count(c1.change_id) as push\n"
					+ "  from master_project mp1\n"
					+ "  left join changes c1 on (mp1.repository = c1.dest_project_name)\n"
					+ "  join master_week w1 on (c1.created_on between w1.start and w1.end)\n"
					+ "  where w1.week = (select week from master_week w3\n"
					+ "              where date_add(sysdate(), interval-14 day) between w3.start and w3.end)\n"
					+ "  and   mp1.`status` like '사용중'\n"
					+ "   and   mp1.team like 'ProductPlatform'\n"
					+ "  group by mp1.project_name) b on (pl.project_name = b.project_name)";

		}
		else if(n==333){
			query=	"select pl.project_name as PJTname,\n"
					+ "\t    COALESCE(output.developers,'0') as committers,\n"
					+ "\t    md0.persons as Persons,\n"
					+ "\t    COALESCE(output.participationrate,'0%') as participationrate,\n"
					+ "\t    COALESCE(output.Merge,'0') as Merge,\n"
					+ "\t    COALESCE(output.Abandon,'0') as Abandon,\n"
					+ "\t    COALESCE(output.Open,'0') as Open,\n"
					+ "\t    COALESCE(output.Total,'0') as Total,\n"
					+ "\t    COALESCE(output.Total,'0')-COALESCE(b.push,'0') as compare\n"
					+ "from\n"
					+ "(select mp0.project_name\n"
					+ "from master_project mp0\n"
					+ "where mp0.team like 'Component'\n"
					+ "and   mp0.status like '사용중'\n"
					+ "group by mp0.project_name) pl\n"
					+ "left join\n"
					+ "(select md.project,\n"
					+ "\t\t a.developers,\n"
					+ "\t\t md.persons,\n"
					+ "\t\t concat(round((a.developers / md.persons) * 100, 0),'%') as participationrate,\n"
					+ "\t\t a.merge as Merge,\n"
					+ "\t\t a.abandon as Abandon,\n"
					+ "\t\t a.open as Open,\n"
					+ "\t\t a.push as Total,\n"
					+ "\t\t a.team\n"
					+ "from master_developer md\n"
					+ "right join\n"
					+ "\t(select mp.project_name,\n"
					+ "\t\t\t  mp.team,\n"
					+ "\t\t\t  count(distinct(c.owner_account_id)) as developers,\n"
					+ "\t\t\t  count(c.change_id) as push,\n"
					+ "\t\t\t  sum(case c.status when 'M' then '1' else '0' end) as merge,\n"
					+ "\t\t\t  sum(case c.status when 'A' then '1' else '0' end) as abandon,\n"
					+ "\t\t\t  sum(case c.status when 'n' then '1' else '0' end) as open\n"
					+ "\tfrom master_project mp\n"
					+ "\tleft join changes c on (mp.repository = c.dest_project_name)\n"
					+ "\tjoin master_week w on (c.created_on between w.start and w.end)\n"
					+ "\twhere w.week = (select week from master_week w2\n"
					+ "\t\t\t\t\t\t where date_add(sysdate(), interval-7 day) between w2.start and w2.end)\n"
					+ "\tand   mp.`status` like '사용중'\n"
					+ "\tand   mp.team like 'Component'\n"
					+ "\tgroup by mp.project_name) a on (md.project = a.project_name)) output on (pl.project_name = output.project)\n"
					+ "left join master_developer md0 on (pl.project_name = md0.project)\n"
					+ "left join\n"
					+ "   (select mp1.project_name,\n"
					+ "\t\t\t  count(c1.change_id) as push\n"
					+ "\tfrom master_project mp1\n"
					+ "  left join changes c1 on (mp1.repository = c1.dest_project_name)\n"
					+ "  join master_week w1 on (c1.created_on between w1.start and w1.end)\n"
					+ "  where w1.week = (select week from master_week w3\n"
					+ "              where date_add(sysdate(), interval-14 day) between w3.start and w3.end)\n"
					+ "  and   mp1.`status` like '사용중'\n"
					+ "   and   mp1.team like 'Component'\n"
					+ "  group by mp1.project_name) b on (pl.project_name = b.project_name)";

		}
		else ;
		
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
			System.out.println("rowCount : "+rowCount);
	
			// Initialize projectName, columnData array
			projectName = new String[rowCount];
			columnData = new int[rowCount*8];
			/* read data */
			/////////////////////////////////////////////////
			rset.beforeFirst();
			int nameIndex=0;
			int dataIndex=0;
			
			int tmp1=0, tmp2=0;
			while(rset.next()){
				projectName[nameIndex++] = rset.getString(1);
				System.out.println("projectName : "+projectName[tmp1++]);
				
				System.out.print("columnData : ");
				for(int i=2; i<10; i++){
					columnData[dataIndex++] = rset.getInt(i);
					System.out.print(columnData[tmp2++]+" ");
				}
				System.out.println();
			}	// end of while	
			
			table = new Table(rowCount, projectName, columnData);
			tableList.add(table);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error : executeQuery error T.T");
		}
		finally {		
			JdbcTemplate.close(rset);
			JdbcTemplate.close(stmt);
		}
		
		return tableList;		
		
	}
	
}