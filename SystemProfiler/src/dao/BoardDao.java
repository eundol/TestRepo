package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.BoardEntity;

public class BoardDao {

	private Connection conn;
	
	public BoardDao(Connection conn) {
		this.conn = conn;
	}

	public void getBoard(ArrayList<BoardEntity> board) {
		System.out.println("getBoard-dao **");
		BoardEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String created = null;
		String query = "select * from free_board order by 1 desc";
		int cnt = 0;
		
		try {
			psmt = conn.prepareStatement(query);
			rset = psmt.executeQuery();
			while(rset.next()){
				entity = new BoardEntity();
				entity.setId(rset.getInt(1));
				entity.setContent(rset.getString(2));
				entity.setName(rset.getString(3));
				entity.setPwd(rset.getString(4));
				created = rset.getString(5).substring(5, 16);
				entity.setCreated(created);
				System.out.println(rset.getInt(1) + " | " + rset.getString(2) + " | " + rset.getString(3) + " | " + rset.getString(4) + " | " + created);
				board.add(entity);
				cnt++;
			}
			System.out.println("count : " + cnt);
		} catch (Exception e) {
			System.out.println("## getBoard-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);		
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getBoardbyId(ArrayList<BoardEntity> board, String id) {
		System.out.println("getBoardbyId-dao **");
		BoardEntity entity = null;
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String created = null;
		String query = "select * from free_board where id = ? order by 1 desc";
		int cnt = 0;
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			rset = psmt.executeQuery();
			while(rset.next()){
				entity = new BoardEntity();
				entity.setId(rset.getInt(1));
				entity.setContent(rset.getString(2));
				entity.setName(rset.getString(3));
				entity.setPwd(rset.getString(4));
				created = rset.getString(5).substring(5, 16);
				entity.setCreated(created);
				System.out.println(rset.getInt(1) + " | " + rset.getString(2) + " | " + rset.getString(3) + " | " + rset.getString(4) + " | " + created);
				board.add(entity);
				cnt++;
			}
			System.out.println("count : " + cnt);
		} catch (Exception e) {
			System.out.println("## getBoardbyId-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);		
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public int deleteBoard(String id) {
		System.out.println("deleteBoard-dao **");
		int result = 0;
		PreparedStatement psmt = null;
		String query = "delete from free_board where id = ?";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			result = psmt.executeUpdate();
			if(result == 1){
				JdbcTemplate.commit(conn);
				System.out.println(result + " row.. delete success!");
			}else{
				JdbcTemplate.rollback(conn);
				System.out.println(result + "delete fail!");
			}
		} catch (Exception e) {
			System.out.println("## deleteBoard-dao Error ##");
		} finally {
			JdbcTemplate.close(psmt);
		}
		return result;
	}

	public void writeBoard(String writer, String pwd, String content) {
		System.out.println("writeBoard-dao **");
		int result = 0;
		PreparedStatement psmt = null;
		String query = "insert into free_board values (null, ?, ?, ?, null)";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, content);
			psmt.setString(2, writer);
			psmt.setString(3, pwd);
			result = psmt.executeUpdate();
			if(result == 1){
				JdbcTemplate.commit(conn);
				System.out.println(result + " row.. insert success!");
			}else{
				JdbcTemplate.rollback(conn);
				System.out.println(result + "insert fail!");
			}
		} catch (Exception e) {
			System.out.println("## writeBoard-dao Error ##");
		} finally {
			JdbcTemplate.close(psmt);
		}
		return;
	}
}