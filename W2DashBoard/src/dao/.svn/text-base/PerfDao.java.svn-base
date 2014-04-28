package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.BatInfo;
import entity.PerfInfo;

public class PerfDao {
	
	PreparedStatement psmt;
	ResultSet rset;
	String query;
	
	public void getPerfResult(Connection conn, ArrayList<PerfInfo> list, String section) {
		
		query = "select * from TB_Perf_Result a where a.section = ? order by 2, 3, 1";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, section);
			rset = psmt.executeQuery();
			while(rset.next()){
				list.add(new entity.PerfInfo(rset.getString("image_name"),rset.getString("section"),rset.getString("detail"),rset.getString("duration")));
//				System.out.println(rset.getString("image_name")+rset.getString("section")+rset.getString("detail")+rset.getString("duration"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public void close(){
		JdbcTemplate.close(rset);
		JdbcTemplate.close(psmt);
	}
	
}
