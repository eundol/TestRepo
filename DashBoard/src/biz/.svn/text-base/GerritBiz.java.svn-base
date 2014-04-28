package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.GerritDao;
import entity.Chart;
import entity.ChangeInfo;
import entity.DatePrint;
import entity.Table;

public class GerritBiz {
	
	private Connection conn;	
	
	/* ****** Constructor ****** */
	public GerritBiz(){
		
	}
	
	/* ****** method ****** */
	public ArrayList<ChangeInfo> getMergeList(String project) {
		System.out.println("biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		GerritDao dao = new GerritDao(conn);  //dao 积己
		ArrayList<ChangeInfo> mergeList = dao.getMergeList(project); //皋辑靛龋免
		JdbcTemplate.close(conn); //目池记 馆吵
		return mergeList;
	}

	public ArrayList<ChangeInfo> getAbandonList(String project) {
		System.out.println("biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		GerritDao dao = new GerritDao(conn);  //dao 积己
		ArrayList<ChangeInfo> abandonList = dao.getAbandonList(project); //皋辑靛龋免
		JdbcTemplate.close(conn); //目池记 馆吵
		return abandonList;
	}

	public ArrayList<ChangeInfo> getOpenList(String project) {
		System.out.println("biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		GerritDao dao = new GerritDao(conn);  //dao 积己
		ArrayList<ChangeInfo> openList = dao.getOpenList(project); //皋辑靛龋免
		JdbcTemplate.close(conn); //目池记 馆吵
		return openList;
	}

	public ArrayList<ChangeInfo> getFullList(String project) {
		System.out.println("biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		GerritDao dao = new GerritDao(conn);  //dao 积己
		ArrayList<ChangeInfo> fullList = dao.getFullList(project); //皋辑靛龋免
		JdbcTemplate.close(conn); //目池记 馆吵
		return fullList;
	}
	
	public ArrayList<DatePrint> getDatePrint(){
		System.out.println("getDatePrint biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<DatePrint> datePrintList = dao.getDatePrintList();
		JdbcTemplate.close(conn);
		return datePrintList;	
	}


	// Bar Chart ////////////////////////////////////////////////////
	public ArrayList<Chart> getCommonBarChart(){
		System.out.println("getCommonBarChart biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Chart> barChartList = dao.getChartList(1);	
						// 1 means CommonPlatform BarChart Query
		JdbcTemplate.close(conn);		
		return barChartList;
		
	}
	
	public ArrayList<Chart> getProductBarChart(){
		System.out.println("getProductBarChart biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Chart> barChartList = dao.getChartList(2);	
						// 2 means ProductPlatform BarChart Query
		JdbcTemplate.close(conn);
		return barChartList;
	}
	
	public ArrayList<Chart> getComponentBarChart(){
		System.out.println("getComponentBarChart biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Chart> barChartList = dao.getChartList(3);	
						// 3means Component BarChart Query
		JdbcTemplate.close(conn);
		return barChartList;
	}
	///////////////////////////////////////////Bar Chart
	
	// Area Chart ////////////////////////////////////////////
	public ArrayList<Chart> getCommonAreaChart(){
		System.out.println("getCommonPlatformAreaChart biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Chart> areaChartList = dao.getChartList(11);
		JdbcTemplate.close(conn);
		return areaChartList;
	}
	
	public ArrayList<Chart> getProductAreaChart(){
		System.out.println("getProductAreaChart biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Chart> areaChartList = dao.getChartList(22);
		JdbcTemplate.close(conn);
		return areaChartList;
	}
	
	public ArrayList<Chart> getComponentAreaChart(){
		System.out.println("getComponentAreaChart biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Chart> areaChartList = dao.getChartList(33);
		JdbcTemplate.close(conn);
		return areaChartList;
	}
	
	/////////////////////////////////////////////////Area Chart
	
	// Table //////////////////////////////////////////////////
	public ArrayList<Table> getCommonTable(){
		System.out.println("getCommonTable biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Table> tableList = dao.getTableList(111);
		JdbcTemplate.close(conn);
		return tableList;
	}
	
	public ArrayList<Table> getProductTable(){
		System.out.println("getProductTable biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Table> tableList = dao.getTableList(222);
		JdbcTemplate.close(conn);
		return tableList;
	}
	
	public ArrayList<Table> getComponentTable(){
		System.out.println("getComponentTable biz~");
		conn = JdbcTemplate.getConnection();
		GerritDao dao = new GerritDao(conn);
		ArrayList<Table> tableList = dao.getTableList(333);
		JdbcTemplate.close(conn);
		return tableList;
	}
	////////////////////////////////////////////////Table
}
