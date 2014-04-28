package controller.io;

import java.io.IOException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.IoEntity;
import entity.IoProgressEntity;

import biz.CpuBiz;
import biz.IoBiz;

/**
 * Servlet implementation class IoProgressChart
 */
/*
 * class name: IoProgressChartViewServlet description: iostat 결과 중 Disk I/O 요청
 * 작업 속도인 tps값의 변화 추이 그래프 data 처리 작업 부분(controller)
 */
public class IoProgressChartViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public IoProgressChartViewServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		/*
		 * IoProgressChartViewServlet 진입 및 인코딩 처리 작업
		 */
		System.out.println("IoProgressChartViewServlet Start **");
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");

		/*
		 * 그래프에 뿌릴 data 추출 작업 시작
		 */
		// 그래프 그리기 위해, 선택한 id값 가져오기 및 변수 초기화
		String id = request.getParameter("id");
		String created = "";
		String sequence = "0";
		String yMax = "10";
		int sequenceCnt = 0;
		int deviceCnt = 0;

		// 그래프 시작 시각(리포트 시작 시각) 가져오기
		CpuBiz cpuBiz = new CpuBiz();
		created = cpuBiz.getCreated(id);

		ArrayList<IoEntity> ioTable = new ArrayList<IoEntity>();
		ArrayList<IoProgressEntity> ioProgresslist = new ArrayList<IoProgressEntity>();

		if (id != null && !id.equals("null")) {

			// id, sequence 값을 가지고 ioTable 가져오기
			IoBiz biz = new IoBiz();
			ioTable = biz.getIoTable(ioTable, id, sequence);

			// device 종류 갯수 및 sequence 종류 갯 수 가져오기
			deviceCnt = biz.getIoTableDeviceCnt(id);
			sequenceCnt = biz.getIoTableSequenceCnt(id);

			Float currentMax = new Float(0.0);

			// sequence 별로 device들의 tps, read_s, wrtn_s 값의 총합을 구하여
			// ioProgresslist에 저장
			for (int i = 0; i < sequenceCnt; i++) {
				IoProgressEntity ioProgressEntity = new IoProgressEntity();
				for (int j = 0; j < deviceCnt; j++) {

					int index = (i * deviceCnt) + j;

					IoEntity ioEntity = new IoEntity();
					ioEntity = ioTable.get(index);

					ioProgressEntity.addTpsSequencePoint(Float
							.parseFloat(ioEntity.getTps()));
					ioProgressEntity.addReadsSequencePoint(Float
							.parseFloat(ioEntity.getRead_s()));
					ioProgressEntity.addWrtnsSequencePoint(Float
							.parseFloat(ioEntity.getWrtn_s()));
					ioProgressEntity.setSequence(ioEntity.getSequence());

					float currentTps = ioProgressEntity.getTpsSequencePoint();

					if (currentTps - currentMax > 0) {
						currentMax = currentTps;
					}
				}
				ioProgresslist.add(ioProgressEntity);
			}

			// y축 값의 최대치가 30보다 미만일 경우 y축 Max값을 30으로, 그 이상일 경우 받은
			// tpsSequencePoint 값을 최대치로 설정
			if (currentMax < 30) {
				yMax = "30";
			} else {
				yMax = currentMax.toString();
			}

		}// 그래프에 뿌릴 data 추출 작업 끝

		/*
		 * 그래프 그리기 위해 추출한 data request에 저장하여 ioprogresschart.jsp 파일로 보내기
		 */

		request.setAttribute("yMax", yMax);
		request.setAttribute("created", created);
		request.setAttribute("id", id);
		request.setAttribute("ioProgresslist", ioProgresslist);
		RequestDispatcher view = request
				.getRequestDispatcher("io/ioprogresschart.jsp");
		System.out.println("go to io/ioprogresschart.jsp");
		view.forward(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

}
