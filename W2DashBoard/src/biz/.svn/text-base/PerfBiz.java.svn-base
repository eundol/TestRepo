package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.BatInfo;
import entity.PerfInfo;

public class PerfBiz {
	
	Connection conn;
	
	public PerfBiz() {
		conn = JdbcTemplate.getConnection();
	}
	
	public void getPerfResult(ArrayList<PerfInfo> list, String section) {
		new dao.PerfDao().getPerfResult(conn, list, section);
		close();
	}
	
	public void close(){
		JdbcTemplate.close(conn);
	}

}
