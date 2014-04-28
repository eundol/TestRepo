package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import common.JdbcTemplate;

import entity.PageOwnerEntity;

public class PageMemDao {
	
	private Connection conn;

	public PageMemDao(Connection conn) {
		this.conn = conn;
	}

	public void getSimpleMemoryInfo(String id, PageOwnerEntity simpleMemoryEntity, int sequence) {
		System.out.println("getSimpleMemoryInfo-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = 				
			"SELECT IFNULL(om.type,'total') \"type\", SUM(om.time * POWER(2, om.order) * 4) \"memory\"\n" +
			"FROM owner_memory om\n" + 
			"WHERE om.profile_id = ? AND om.sequence = ?\n" + 
			"GROUP BY om.type WITH ROLLUP";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			psmt.setInt(2, sequence);
			rset = psmt.executeQuery();

			ArrayList<Long> temp = new ArrayList<Long>();
			while (rset.next()){
				temp.add(rset.getLong("memory"));
			}
			simpleMemoryEntity.setKernel(temp.get(0));
			simpleMemoryEntity.setUser(temp.get(1));
			simpleMemoryEntity.setTotal(temp.get(2));
			
		} catch (Exception e) {
			System.out.println("## getSimpleMemoryInfo-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getMemoryInfoList(String id, ArrayList<PageOwnerEntity> memoryInfoList, int sequence) {
		System.out.println("getMemoryInfoList-dao**");
		
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query =		
			"SELECT om.keyword, SUM(om.time * POWER(2, om.order) * 4) \"memory\"\n" +
			"FROM owner_memory om\n" + 
			"WHERE om.profile_id = ? AND om.sequence = ?\n" + 
			"GROUP BY om.keyword\n" + 
			"ORDER BY 2 DESC";
		
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			psmt.setInt(2, sequence);
			rset = psmt.executeQuery();
			while (rset.next()){
				PageOwnerEntity entity = new PageOwnerEntity();;
				entity.setKeyword(rset.getString("keyword"));
				entity.setMemory(rset.getInt("memory"));
				memoryInfoList.add(entity);
			}
			
		} catch (Exception e) {
			System.out.println("## getMemoryInfoList-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getPageRowData(String id, ArrayList<PageOwnerEntity> pageList, String sequence, String type) {
		System.out.println("getPageRowData-dao**");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query = "";

/*			"select origin.profile_id, origin.sequence, sum(origin.time) \"time\", sum(origin.memory) \"memory\", origin.pid, origin.process, origin.keyword, origin.type, origin.module\n" +
			"FROM\n" + 
			"(\n" + 
			"SELECT a.profile_id, a.sequence, a.time, a.order, a.memory, a.pid, b.process, a.type, a.keyword, a.module\n" + 
			"FROM\n" + 
			"(\n" + 
			"SELECT om.profile_id, om.sequence, om.time, om.order, (om.time * POWER(2, om.order) * 4) \"memory\", om.pid, om.type, om.keyword, om.module\n" + 
			"FROM owner_memory om\n" + 
			"WHERE om.profile_id = ? AND om.sequence = ?\n" + 
			") a\n" + 
			"LEFT JOIN\n" + 
			"(\n" + 
			"SELECT op.pid, op.process\n" + 
			"FROM owner_ps op\n" + 
			"WHERE op.profile_id = ? AND op.sequence = ?\n" + 
			") b ON (a.pid = b.pid)\n" + 
			") origin\n" + 
			"group by origin.profile_id, origin.sequence, origin.pid, origin.process, origin.keyword, origin.type, origin.module";*/
		if(type.equals("user")){
			query = 
"SELECT om.profile_id, om.sequence, SUM(om.time) \"time\", sum(om.pages) \"pages\", SUM(om.memory) \"memory\", om.pid, om.tid, om.process, om.cmd, om.keyword, om.type, om.module\n" +
"FROM\n" + 
"(\n" + 
"SELECT o.profile_id, o.sequence, o.time \"time\", o.order, (o.time * POWER(2, o.order)) \"pages\", o.time * POWER(2, o.order) * 4 \"memory\", o.pid, o.tid, o.process, o.cmd, o.keyword, o.type, o.module\n" + 
"FROM owner_memory o\n" + 
"WHERE o.profile_id = ? AND o.sequence = ? AND o.`type` = 'user') om\n" + 
"GROUP BY om.profile_id, om.sequence, om.pid, om.tid, om.process, om.cmd, om.keyword, om.type, om.module";
					/*"select origin.profile_id, origin.sequence, sum(origin.time) \"time\", sum(origin.memory) \"memory\", origin.pid, origin.process, origin.keyword, origin.type, origin.module\n" +
					"  FROM\n" + 
					"  (\n" + 
					"  SELECT a.profile_id, a.sequence, a.time, a.order, a.memory, a.pid, b.process, a.type, a.keyword, a.module\n" + 
					"  FROM\n" + 
					"  (\n" + 
					"  SELECT om.profile_id, om.sequence, om.time, om.order, (om.time * POWER(2, om.order) * 4) \"memory\", om.pid, om.type, om.keyword, om.module\n" + 
					"  FROM owner_memory om\n" + 
					"  WHERE om.profile_id = ? AND om.sequence = ?\n" + 
					"  ) a\n" + 
					"  LEFT JOIN\n" + 
					"  (\n" + 
					"  SELECT op.pid, op.process\n" + 
					"  FROM owner_ps op\n" + 
					"  WHERE op.profile_id = ? AND op.sequence = ?\n" + 
					"  ) b ON (a.pid = b.pid)\n" + 
					"  ) origin\n" + 
					"  where origin.type = 'user'\n" + 
					"  group by origin.profile_id, origin.sequence, origin.pid, origin.process, origin.keyword, origin.type, origin.module";*/
		}
		if(type.equals("kernel")){
			query = 
"SELECT om.profile_id, om.sequence, SUM(om.time) \"time\", sum(om.pages) \"pages\", SUM(om.memory) \"memory\", om.pid, om.tid, om.process, om.cmd, om.keyword, om.type, om.module\n" +
"FROM\n" + 
"(\n" + 
"SELECT o.profile_id, o.sequence, o.time \"time\", o.order, (o.time * POWER(2, o.order)) \"pages\", o.time * POWER(2, o.order) * 4 \"memory\", o.pid, o.tid, o.process, o.cmd, o.keyword, o.type, o.module\n" + 
"FROM owner_memory o\n" + 
"WHERE o.profile_id = ? AND o.sequence = ? AND o.`type` = 'kernel') om\n" + 
"GROUP BY om.profile_id, om.sequence, om.pid, om.tid, om.process, om.cmd, om.keyword, om.type, om.module";
					/*"select origin.profile_id, origin.sequence, sum(origin.time) \"time\", sum(origin.memory) \"memory\", origin.pid, origin.process, origin.keyword, origin.type, origin.module\n" +
					"\tFROM\n" + 
					"\t(\n" + 
					"\tSELECT a.profile_id, a.sequence, a.time, a.order, a.memory, a.pid, b.process, a.type, a.keyword, a.module\n" + 
					"\tFROM\n" + 
					"\t(\n" + 
					"\tSELECT om.profile_id, om.sequence, om.time, om.order, (om.time * POWER(2, om.order) * 4) \"memory\", om.pid, om.type, om.keyword, om.module\n" + 
					"\tFROM owner_memory om\n" + 
					"\tWHERE om.profile_id = ? AND om.sequence = ?\n" + 
					"\t) a\n" + 
					"\tLEFT JOIN\n" + 
					"\t(\n" + 
					"\tSELECT op.pid, op.process\n" + 
					"\tFROM owner_ps op\n" + 
					"  WHERE op.profile_id = ? AND op.sequence = ?\n" + 
					"  ) b ON (a.pid = b.pid)\n" + 
					"  ) origin\n" + 
					"  where origin.type = 'kernel'\n" + 
					"  group by origin.profile_id, origin.sequence, origin.pid, origin.process, origin.keyword, origin.type, origin.module";*/
		}
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			psmt.setInt(2, Integer.parseInt(sequence));
//			psmt.setString(3, id);
//			psmt.setInt(4, Integer.parseInt(sequence));
			rset = psmt.executeQuery();
			int num = 1;
			while (rset.next()){
				PageOwnerEntity entity = new PageOwnerEntity();;
				entity.setNum(num);
				entity.setTime(rset.getInt("time"));
				entity.setPages(rset.getInt("pages"));
//				entity.setOrder(rset.getInt("order"));
				entity.setMemory(rset.getInt("memory"));
				entity.setPid(rset.getInt("pid"));
				entity.setTid(rset.getString("tid"));
				entity.setProcess(rset.getString("process"));
				entity.setCmd(rset.getString("cmd"));
				entity.setType(rset.getString("type"));
				entity.setKeyword(rset.getString("keyword"));
				entity.setModule(rset.getString("module"));
				/*entity.setCallChain(rset.getString("call_chain"));*/
				pageList.add(entity);
				num++;
			}
			
		} catch (Exception e) {
			System.out.println("## getPageRowData-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}

	public void getPageFullData(String id, ArrayList<PageOwnerEntity> pageList, String sequence) {
		System.out.println("getPageFullData-dao**");
		PreparedStatement psmt = null;
		ResultSet rset = null;
		String query =		
			"select om.profile_id, om.sequence, om.time, om.order, (om.time * POWER(2, om.order) * 4) \"memory\", om.pid, om.tid, om.process, om.type, om.keyword, om.module, om.call_chain\n" +
			"from owner_memory om\n" + 
			"WHERE om.profile_id = ? AND om.sequence = ?;";

			/*"SELECT a.profile_id, a.sequence, a.time, a.order, a.memory, a.pid, b.process, a.type, a.keyword, a.module, a.call_chain\n" +
			"FROM\n" + 
			"(\n" + 
			"SELECT om.profile_id, om.sequence, om.time, om.order, (om.time * POWER(2, om.order) * 4) \"memory\", om.pid, om.type, om.keyword, om.module, om.call_chain\n" + 
			"FROM owner_memory om\n" + 
			"WHERE om.profile_id = ? AND om.sequence = ?\n" + 
			") a\n" + 
			"LEFT JOIN\n" + 
			"(\n" + 
			"SELECT op.pid, op.process\n" + 
			"FROM owner_ps op\n" + 
			"WHERE op.profile_id = ? AND op.sequence = ?\n" + 
			") b ON (a.pid = b.pid)";*/
		try {
			psmt = conn.prepareStatement(query);
			psmt.setString(1, id);
			psmt.setInt(2, Integer.parseInt(sequence));
//			psmt.setString(3, id);
//			psmt.setInt(4, Integer.parseInt(sequence));
			rset = psmt.executeQuery();
			int num = 1;
			while (rset.next()){
				PageOwnerEntity entity = new PageOwnerEntity();;
				entity.setNum(num);
				entity.setTime(rset.getInt("time"));
				entity.setPages(rset.getInt("pages"));
				entity.setOrder(rset.getInt("order"));
				entity.setMemory(rset.getInt("memory"));
				entity.setPid(rset.getInt("pid"));
				entity.setTid(rset.getString("tid"));
				entity.setProcess(rset.getString("process"));
				entity.setType(rset.getString("type"));
				entity.setKeyword(rset.getString("keyword"));
				entity.setModule(rset.getString("module"));
				entity.setCallChain(rset.getString("call_chain"));
				pageList.add(entity);
				num++;
			}
			
		} catch (Exception e) {
			System.out.println("## getPageFullData-dao Error ##");
		} finally {
			JdbcTemplate.close(rset);
			JdbcTemplate.close(psmt);
		}
		return;
	}
		
}
