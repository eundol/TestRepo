package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.BoardDao;
import entity.BoardEntity;

public class BoardBiz {

	public void getBoard(ArrayList<BoardEntity> board) {
		System.out.println("getBoard-biz **");
		Connection conn = JdbcTemplate.getConnection();
		BoardDao dao = new BoardDao(conn);
		dao.getBoard(board);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getBoardbyId(ArrayList<BoardEntity> board, String id) {
		System.out.println("getBoardbyId-biz **");
		Connection conn = JdbcTemplate.getConnection();
		BoardDao dao = new BoardDao(conn);
		dao.getBoardbyId(board, id);
		JdbcTemplate.close(conn);
		return;
	}

	public int deleteBoard(String id) {
		System.out.println("deleteBoard-biz **");
		Connection conn = JdbcTemplate.getConnection();
		BoardDao dao = new BoardDao(conn);
		int result = dao.deleteBoard(id);
		JdbcTemplate.close(conn);
		return result;
	}

	public void writeBoard(String writer, String pwd, String content) {
		System.out.println("writeBoard-biz **");
		Connection conn = JdbcTemplate.getConnection();
		BoardDao dao = new BoardDao(conn);
		dao.writeBoard(writer, pwd, content);
		JdbcTemplate.close(conn);
		return;
	}
	
}
