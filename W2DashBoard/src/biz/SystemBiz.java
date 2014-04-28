package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.BatInfo;
import entity.SystemInfo;

public class SystemBiz {

	Connection conn;
	
	public SystemBiz() {
		conn = JdbcTemplate.getConnection();
	}

	public void getSeverityInfo(SystemInfo info) {
		new dao.SystemDao().getSeverityInfo(conn, info);
		close();
	}
	
	public void close(){
		JdbcTemplate.close(conn);
	}

}
