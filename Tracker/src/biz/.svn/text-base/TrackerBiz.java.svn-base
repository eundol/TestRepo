package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;
import dao.TrackerDao;

import entity.DelayIssue;
import entity.PiChart;
import entity.Table;
import entity.TableRanking;

public class TrackerBiz {

	private Connection conn;
	final int SUMMARY_PICHART = 1;
	final int COMMON_PICHART = 2;
	final int PRODUCT_PICHART = 3;
	final int COMPONENT_PICHART = 4;
	final int SUMMARY_TABLE = 11;
	final int COMMON_TABLE = 22;
	final int PRODUCT_TABLE = 33;
	final int COMPONENT_TABLE = 44;
	
	// Constructor
	public TrackerBiz(){
		
	}
	
	public ArrayList<DelayIssue> getDelayIssue(String project) {
		System.out.println("Delay Issue biz~"); 
		conn = JdbcTemplate.getConnection();  //目池记 积己
		TrackerDao dao = new TrackerDao(conn);  //dao 积己
		ArrayList<DelayIssue> delayIssueList = dao.getDelayIssue(project); //皋辑靛龋免
		JdbcTemplate.close(conn); //目池记 馆吵
		return delayIssueList;
	}
	
	// PiChart//////////////////////////////////////////////////////
	public ArrayList<PiChart> getSummaryPiChart(){
		System.out.println("SummaryPiChart biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		TrackerDao dao = new TrackerDao(conn);  //dao 积己
		
		ArrayList<PiChart> piChartList = dao.getPiChart(SUMMARY_PICHART);
		JdbcTemplate.close(conn);
		return piChartList;
	}
		
	public ArrayList<PiChart> getCommonPiChart(){
		System.out.println("CommonPiChart biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		TrackerDao dao = new TrackerDao(conn);  //dao 积己
		
		ArrayList<PiChart> piChartList = dao.getPiChart(COMMON_PICHART);
		JdbcTemplate.close(conn);
		return piChartList;
	}
	
	public ArrayList<PiChart> getProductPiChart(){
		System.out.println("ProductPiChart biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		TrackerDao dao = new TrackerDao(conn);  //dao 积己
		
		ArrayList<PiChart> piChartList = dao.getPiChart(PRODUCT_PICHART);
		JdbcTemplate.close(conn);
		return piChartList;
	}
	
	public ArrayList<PiChart> getComponentPiChart(){
		System.out.println("ComponentPiChart biz~");
		conn = JdbcTemplate.getConnection();  //目池记 积己
		TrackerDao dao = new TrackerDao(conn);  //dao 积己
		
		ArrayList<PiChart> piChartList = dao.getPiChart(COMPONENT_PICHART);
		JdbcTemplate.close(conn);
		return piChartList;
	}
	/////////////////////////////////////////////////////PiChart
	
	// Table ////////////////////////////////////////////////////////
	public ArrayList<Table> getSummaryTable(){
		System.out.println("Summary Table biz~");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		ArrayList<Table> tableList = dao.getTable(SUMMARY_TABLE);
		JdbcTemplate.close(conn);
		return tableList;
	}
	
	public ArrayList<Table> getCommonTable(){
		System.out.println("CommonPlatform Table biz~");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		ArrayList<Table> tableList = dao.getTable(COMMON_TABLE);
		JdbcTemplate.close(conn);
		return tableList;
	}
	
	public ArrayList<Table> getProductTable(){
		System.out.println("ProductPlatform Table biz~");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		ArrayList<Table> tableList = dao.getTable(PRODUCT_TABLE);
		JdbcTemplate.close(conn);
		return tableList;
	}
	
	public ArrayList<Table> getComponentTable(){
		System.out.println("Component Table biz~");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		ArrayList<Table> tableList = dao.getTable(COMPONENT_TABLE);
		JdbcTemplate.close(conn);
		return tableList;
	}
	/////////////////////////////////////////////////////Table
	
	//Create Ranking Table ///////////////////////////////////
	public TableRanking getSummaryTableRanking()
	{
		System.out.println("Summary CreateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableRanking = dao.getTableRanking(111);
		JdbcTemplate.close(conn);
		return tableRanking;
	}
	public TableRanking getCommonTableRanking()
	{
		System.out.println("CommonPlatform CreateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableRanking = dao.getTableRanking(222);
		JdbcTemplate.close(conn);
		return tableRanking;
	}
	public TableRanking getProductTableRanking()
	{
		System.out.println("ProductPlatform CreateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableRanking = dao.getTableRanking(333);
		JdbcTemplate.close(conn);
		return tableRanking;
	}
	public TableRanking getComponentTableRanking()
	{
		System.out.println("Component CreateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableRanking = dao.getTableRanking(444);
		JdbcTemplate.close(conn);
		return tableRanking;
	}
	////////////////////////////////////////Create Ranking Table
	
	
	//Update Ranking Table /////////////////////////////////////
	public TableRanking getSummaryTableUpdateRanking()
	{
		System.out.println("CommonPlatform UpdateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableUpdateRanking = dao.getTableUpdateRanking(1111);
		JdbcTemplate.close(conn);
		return tableUpdateRanking;
	}
	public TableRanking getCommonTableUpdateRanking()
	{
		System.out.println("CommonPlatform UpdateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableUpdateRanking = dao.getTableUpdateRanking(2222);
		JdbcTemplate.close(conn);
		return tableUpdateRanking;
	}
	public TableRanking getProductTableUpdateRanking()
	{
		System.out.println("ProductPlatform UpdateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableUpdateRanking = dao.getTableUpdateRanking(3333);
		JdbcTemplate.close(conn);
		return tableUpdateRanking;
	}
	public TableRanking getComponentTableUpdateRanking()
	{
		System.out.println("ComponentPlatform UpdateRanking Table biz");
		conn = JdbcTemplate.getConnection();
		TrackerDao dao = new TrackerDao(conn);
		
		TableRanking tableUpdateRanking = dao.getTableUpdateRanking(4444);
		JdbcTemplate.close(conn);
		return tableUpdateRanking;
	}
	////////////////////////////////////////Update Ranking Table
	
}