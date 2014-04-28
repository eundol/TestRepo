/*------------------------------------------------------------------------------
 * Name : JdbcTemplate
 * DESC : DB Connection�� ������ ��ȯ�ϴ� ���� �⺻���� ��ɵ��� ��Ƶ� util Ŭ����
 * VER  : 1.0
 * PROJ : VCC Phase I
 * Copyright 2011 LG CNS All rights reserved
 *------------------------------------------------------------------------------
 *                   ��        ��        ��        ��
 *------------------------------------------------------------------------------
 *     DATE      AUTHOR                       DESCRIPTION
 *-------------  --------  ----------------------------------------------------- 
 * 2011. 01. 01.  �濵���������   Ver1.0 �ۼ�
 *----------------------------------------------------------------------------*/

package common;

import java.sql.*;

import javax.naming.*;
import javax.sql.*;

/**
 * <PRE>
 * 
 * DB Connection�� ������ ��ȯ�ϴ� ���� �⺻���� ��ɵ��� ��Ƶ� Util Ŭ����
 * 
 * </PRE>
 * 
 * @author LG CNS �濵���������.
 * @version 1.0, 2011/01/01
 */
public class JdbcTemplate {

    /**
     * ����Ʈ ������
     */
    public JdbcTemplate() {
    }

    /**
     * Connection�� ������ �� ��� attribute �� conn �� Connection ��ü�� ������ �� �����Ѵ�.
     * 
     * @return Connection
     */
    public static Connection getConnection() {
        Connection conn = null;
        try {
        	Class.forName("com.mysql.jdbc.Driver") ; 
        	System.out.println("Driver load success!") ;
        	conn = DriverManager.getConnection("jdbc:mysql://10.177.234.48:3306/tracker_infra", "heesung", "multisqe") ;
        } catch (Exception e) {
            System.out.println("[JdbcTemplate.getConnection] : " + e.getMessage());
            e.printStackTrace();
        }
        return conn;
    }

    /**
     * DB�� Connect�Ǿ����� ���θ� Return �Ѵ�.
     * 
     * @return DB�� Connect �Ǿ����� ����.
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
     * Connection ��ü�� �ý��ۿ� ��ȯ�Ѵ�.
     */
    public static void close(Connection conn) {

        if (isConnected(conn)) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Statement�� Close �Ѵ�.
     * 
     * @param stmt
     *            Statement ��ü.
     */
    public static void close(Statement stmt) {

        try {
            if (stmt != null) {
                stmt.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * ResultSet�� Close �Ѵ�.
     * 
     * @param result
     *            ResultSet ��ü.
     */
    public static void close(ResultSet rset) {

        try {
            if (rset != null)
                rset.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * ���ݱ����� Ʈ������� Commit ó���Ѵ�.
     */
    public static void commit(Connection conn) {

        try {
            if (isConnected(conn)) {
                conn.commit();
                System.out.println("[JdbcTemplate.commit] : DB Successfully Committed!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * ���ݱ����� Ʈ������� Rollback ó�Ѵ�.
     */
    public static void rollback(Connection conn) {

        try {
            if (isConnected(conn)) {
                conn.rollback();
                System.out.println("[JdbcTemplate.rollback] : DB Successfully Rollbacked!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
