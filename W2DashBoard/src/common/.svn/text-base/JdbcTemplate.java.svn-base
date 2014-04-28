/*------------------------------------------------------------------------------
 * Name : JdbcTemplate
 * DESC : DB Connection을 얻어오고 반환하는 등의 기본적인 기능들을 모아둔 util 클래스
 * VER  : 1.0
 * PROJ : Profile Viewer
 * Copyright 2011 LG CNS All rights reserved
 *------------------------------------------------------------------------------
 *                   변        경        사        항
 *------------------------------------------------------------------------------
 *     DATE      AUTHOR                       DESCRIPTION
 *-------------  --------  ----------------------------------------------------- 
 * 2013. 05. 15.  은희성   Ver1.0 작성
 *----------------------------------------------------------------------------*/

package common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * <PRE>
 * 
 * DB Connection을 얻어오고 반환하는 등의 기본적인 기능들을 모아둔 Util 클래스
 * 
 * </PRE>
 * 
 * @author 은희성
 * @version 1.0, 2013/05/15
 */
public class JdbcTemplate {

	public static int count = 0;
	
	/**
	 * 디폴트 생성자
	 */
	public JdbcTemplate() {
	}

	/**
	 * Connection을 연결한 후 멤버 attribute 인 conn 에 Connection 객체를 세팅한 후 리턴한다.
	 * 
	 * @return Connection
	 */
	public static Connection getConnection() {
		Connection conn = null;
		
		try {
				Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e1) {
				System.out.println("[JdbcTemplate.getConnection] : "
						+ e1.getMessage());
				e1.printStackTrace();
		}
			
		try {
//			System.out.println("Driver load success!");
			conn = DriverManager.getConnection(
					"jdbc:mysql://10.177.234.48:3306/W2_Dashboard",
					"heesung", "multisqe");
			count++;
			System.out.println("getConnection Success! ::: " + count);
			conn.setAutoCommit(false);
//			System.out.println("heesung login success!");
		} catch (SQLException e) {
			System.out.println("[JdbcTemplate.getConnection] : "
					+ e.getMessage());
			e.printStackTrace();
		}
		return conn;
	}

	/**
	 * DB와 Connect되었는지 여부를 Return 한다.
	 * 
	 * @return DB와 Connect 되었는지 여부.
	 */
	public static boolean isConnected(Connection conn) {

		boolean validConnection = true;

		try {
			if (conn == null || conn.isClosed())
				validConnection = false;
		} catch (SQLException e) {
			validConnection = false;
			e.printStackTrace();
		}
		return validConnection;
	}

	/**
	 * Connection 객체를 시스템에 반환한다.
	 */
	public static void close(Connection conn) {

		if (isConnected(conn)) {
			try {
				conn.close();
				System.out.println("Connection Close!");
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * Statement를 Close 한다.
	 * 
	 * @param stmt
	 *            Statement 객체.
	 */
	public static void close(Statement stmt) {

		try {
			if (stmt != null) {
				stmt.close();
//				System.out.println("Statement Close!");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * ResultSet을 Close 한다.
	 * 
	 * @param result
	 *            ResultSet 객체.
	 */
	public static void close(ResultSet rset) {

		try {
			if (rset != null) {
				rset.close();
//				System.out.println("ResultSet Close!");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 지금까지의 트랜잭션을 Commit 처리한다.
	 */
	public static void commit(Connection conn) {

		try {
			if (isConnected(conn)) {
				conn.commit();
				System.out
						.println("[JdbcTemplate.commit] : DB Successfully Committed!");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 지금까지의 트랜잭션을 Rollback 처한다.
	 */
	public static void rollback(Connection conn) {

		try {
			if (isConnected(conn)) {
				conn.rollback();
				System.out
						.println("[JdbcTemplate.rollback] : DB Successfully Rollbacked!");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
