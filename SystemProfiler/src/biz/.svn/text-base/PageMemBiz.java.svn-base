package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.PageMemDao;
import entity.PageOwnerEntity;

public class PageMemBiz {

	public void getSimpleMemoryInfo(String id, PageOwnerEntity simpleMemoryEntity, int sequence) {
		System.out.println("getSimpleMemoryInfo-biz**");
		Connection conn = JdbcTemplate.getConnection();
		PageMemDao dao = new PageMemDao(conn);
		dao.getSimpleMemoryInfo(id, simpleMemoryEntity, sequence);
		JdbcTemplate.close(conn);
		return;
	}

	public void getMemoryInfoList(String id, ArrayList<PageOwnerEntity> memoryInfoList, int sequence) {
		System.out.println("getMemoryInfoList-biz**");
		Connection conn = JdbcTemplate.getConnection();
		PageMemDao dao = new PageMemDao(conn);
		dao.getMemoryInfoList(id, memoryInfoList, sequence);
		JdbcTemplate.close(conn);
		return;
	}

	public void getPageRowData(ArrayList<PageOwnerEntity> pageList, String id, String sequence, String type) {
		System.out.println("getPageRowData-biz**");
		Connection conn = JdbcTemplate.getConnection();
		PageMemDao dao = new PageMemDao(conn);
		dao.getPageRowData(id, pageList, sequence, type);
		JdbcTemplate.close(conn);
		return;
	}
	
	public void getPageFullData(ArrayList<PageOwnerEntity> pageList, String id,	String sequence) {
		System.out.println("getPageFullData-biz**");
		Connection conn = JdbcTemplate.getConnection();
		PageMemDao dao = new PageMemDao(conn);
		dao.getPageFullData(id, pageList, sequence);
		JdbcTemplate.close(conn);
		return;
	}
	
}
