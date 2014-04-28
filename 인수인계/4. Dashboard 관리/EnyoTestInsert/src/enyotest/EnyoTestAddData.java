package enyotest;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;

import common.JdbcTemplate;

public class EnyoTestAddData {

	public boolean insertTestResult(ArrayList<EnyoTestEntity> testList, String type) {
		boolean flag = false;
		
		Connection conn = JdbcTemplate.getConnection();
//		insert into daily_report values ("test", "test", null, "test", "test","test","test","test");
		
		String query = "insert into daily_report values (?, ?, ?, null, ?, ?, ?, ?, ?)";
		
		if(type.equals("Senario Test")){
			query = "insert into daily_report_st values (?, ?, ?, null, ?, ?, ?, ?, ?)";
		}
		
		PreparedStatement psmt = null;
		int insertCount = 0;
		System.out.println("Starting insert to DB....");
		try {
			for(int i = 0 ; i < testList.size() ; i ++){
			int result = 0;
				EnyoTestEntity entity = testList.get(i);
					psmt = conn.prepareStatement(query);
					psmt.setString(1, entity.getName());
					psmt.setString(2, entity.getVersion());
					psmt.setString(3, entity.getStart_time());
					psmt.setString(4, entity.getApi());
					psmt.setString(5, entity.getTest_case());
					psmt.setString(6, entity.getResult());
					psmt.setString(7, entity.getDescription());
					psmt.setString(8, entity.getDuration());
//					System.out.println(entity.getName());
//					System.out.println(entity.getVersion());
//					System.out.println(entity.getStart_time());
//					System.out.println(entity.getApi());
//					System.out.println(entity.getTest_case());
//					System.out.println(entity.getResult());
//					System.out.println(entity.getDescription());
//					System.out.println(entity.getDuration());
					result = psmt.executeUpdate();
					if(result == 1){
	//					JdbcTemplate.commit(conn);
						System.out.print("+");
						insertCount++;
					}else{
						System.out.println();
						System.out.println("## insert fail! ##");
					}
			} 
			System.out.println();
		}
		catch (Exception e) {
			System.out.println("## insertTestResult Error ##");
		} finally {
			JdbcTemplate.close(psmt);
		}
		
		if(insertCount == testList.size()){
			JdbcTemplate.commit(conn);
			flag = true;
		}else{
			JdbcTemplate.rollback(conn);
		}
		
		JdbcTemplate.close(conn);
		System.out.println("** Inserting has done **");
		return flag;
	}

}
