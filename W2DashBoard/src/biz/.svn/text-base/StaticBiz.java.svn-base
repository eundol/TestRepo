package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.StaticDencityInfo;

public class StaticBiz {
	
	Connection conn;
	
	public StaticBiz() {
		conn = JdbcTemplate.getConnection();
	}

	public void getDencityResult(ArrayList<StaticDencityInfo> list) {
		new dao.StaticDao().getDenctiyResult(conn, list);
		close();
	}
	
	public void getDefectResult(ArrayList<StaticDencityInfo> list) {
		new dao.StaticDao().getDefectResult(conn, list);
		close();
	}
	
	public void close(){
		JdbcTemplate.close(conn);
	}


}
