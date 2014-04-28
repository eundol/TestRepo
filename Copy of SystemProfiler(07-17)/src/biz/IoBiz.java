package biz;

import java.sql.Connection;
import java.util.ArrayList;

import common.JdbcTemplate;

import dao.IoDao;
import entity.IoEntity;

/*
 * class name: IoBiz
 * description: I/O관련 정보를 다루는 모듈(biz)
 */
public class IoBiz {

	/*
	 * method name: getIoTable 
	 * params: ioTable, id(not null), sequenceㄴ
	 * description: iostat 결과 테이블을 가져온다.
	 */
	public ArrayList<IoEntity> getIoTable(ArrayList<IoEntity> ioTable,
			String id, String sequence) {
		System.out.println("getIoTable-biz getIoTable**");
		Connection conn = JdbcTemplate.getConnection();
		IoDao dao = new IoDao(conn);
		ioTable = dao.getIoTable(ioTable, id, sequence);
		JdbcTemplate.close(conn);
		return ioTable;
	}

	/*
	 * method name: getIoTableDeviceCnt
	 * params: none
	 * description: iostat 결과 테이블 중 device 종류 갯수를 가져온다.
	 */
	public int getIoTableDeviceCnt(String id) {
		System.out.println("getIoTable-biz getIoTableDeviceCnt**");
		Connection conn = JdbcTemplate.getConnection();
		IoDao dao = new IoDao(conn);
		int deviceCnt = 0;
		deviceCnt = dao.getIoTableDeviceCnt(id);
		JdbcTemplate.close(conn);
		return deviceCnt;
	}

	/*
	 * method name: getIoTableSequenceCnt
	 * params: none
	 * description: iostat 결과 테이블 중 sequence 종류 갯수를 가져온다.
	 */
	public int getIoTableSequenceCnt(String id) {
		System.out.println("getIoTable-biz getIoTableSequenceCnt**");
		Connection conn = JdbcTemplate.getConnection();
		IoDao dao = new IoDao(conn);
		int sequenceCnt = 0;
		sequenceCnt = dao.getIoTableSequenceCnt(id);
		JdbcTemplate.close(conn);
		return sequenceCnt;
	}

	public void getCpuUsedFromIoStat(String id, IoEntity avgEntity) {
		System.out.println("getCpuUsedFromIoStat-biz**");
		Connection conn = JdbcTemplate.getConnection();
		IoDao dao = new IoDao(conn);
		dao.getCpuUsedFromIoStat(id, avgEntity);
		JdbcTemplate.close(conn);
		return;
	}

	public void getCpuTraceFromIoStat(String id, ArrayList<IoEntity> cpuTraceInfo) {
		System.out.println("getCpuTraceFromIoStat-biz**");
		Connection conn = JdbcTemplate.getConnection();
		IoDao dao = new IoDao(conn);
		dao.getCpuTraceFromIoStat(id, cpuTraceInfo);
		JdbcTemplate.close(conn);
		return;
	}

	public void getCpuMaxFromIoStat(String id, IoEntity maxEntity) {
		System.out.println("getCpuMaxFromIoStat-biz**");
		Connection conn = JdbcTemplate.getConnection();
		IoDao dao = new IoDao(conn);
		dao.getCpuMaxFromIoStat(id, maxEntity);
		JdbcTemplate.close(conn);
		return;
	}
}
