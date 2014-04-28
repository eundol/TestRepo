package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.StaticDencityInfo;

public class StaticDao {

	PreparedStatement psmt;
	ResultSet rset;
	String query;
	
	public void getDenctiyResult(Connection conn, ArrayList<StaticDencityInfo> list) {
		
		query = "select * from TB_Static_Dencity order by date";
		
		try {
			psmt = conn.prepareStatement(query);
			rset = psmt.executeQuery();
			while(rset.next()){
				list.add(new StaticDencityInfo(rset.getString("date"), rset.getDouble("dencity")));
//				System.out.println(rset.getString("image_name")+rset.getString("section")+rset.getString("detail")+rset.getString("duration"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public void getDefectResult(Connection conn, ArrayList<StaticDencityInfo> list) {
	
		query = "select * from TB_Static_Defect order by date";
		
		try {
			psmt = conn.prepareStatement(query);
			rset = psmt.executeQuery();
			while(rset.next()){
				list.add(new StaticDencityInfo(rset.getString("date"), rset.getInt("high_defect"), rset.getInt("medium_defect")));
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
