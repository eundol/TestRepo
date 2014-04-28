package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.MemDao;
import entity.MemEntity;

public class MemBiz {
	
	public void getMemoryInfo(String id, ArrayList<MemEntity> memoryInfo) {
		System.out.println("getMemoryInfo-biz **");
		Connection conn = JdbcTemplate.getConnection();
		MemDao dao = new MemDao(conn);
		dao.getMemoryInfo(id, memoryInfo);
		JdbcTemplate.close(conn);
		return;
	}

	public void getSequenceMemoryInfo(String id, String sequence,
			MemEntity sequenceInfo) {
		System.out.println("getSequenceMemoryInfo-biz **");
		Connection conn = JdbcTemplate.getConnection();
		MemDao dao = new MemDao(conn);
		dao.getSequenceMemoryInfo(id, sequence, sequenceInfo);
		JdbcTemplate.close(conn);
		return;
	}
	
}
