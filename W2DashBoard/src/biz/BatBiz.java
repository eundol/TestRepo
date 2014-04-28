package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.BatInfo;

public class BatBiz {
	
	Connection conn;
	
	public BatBiz() {
		conn = JdbcTemplate.getConnection();
	}

	public void getBatResult(ArrayList<BatInfo> list) {
		new dao.BatDao().getBatResult(conn, list);
		close();
	}

	public boolean addBatResult(BatInfo insertData) {
		boolean result;
		result = new dao.BatDao().addBatResult(conn, insertData);
		close();
		return result;
	}
	
	public void deleteBatResult(String build) {
		new dao.BatDao().deleteBatResult(conn, build);
		close();
	}
	
	public void close(){
		JdbcTemplate.close(conn);
	}

}
