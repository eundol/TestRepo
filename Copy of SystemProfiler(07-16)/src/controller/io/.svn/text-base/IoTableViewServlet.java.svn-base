package controller.io;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;

/**
 * Servlet implementation class MemoryTableViewServlet
 */
/*
 * class name: IoTableViewServlet description: 리포팅 시점 정보를 가지고 iostat 결과 테이블을 보여주는 iotable.jsp로 보내주는 작업(controller)
 */
public class IoTableViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public IoTableViewServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		/*
		 * IoTableViewServlet 진입 및 인코딩 처리 작업
		 */
		System.out.println("IoTableViewServlet Start **");
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");

		/*
		 * iotable.jsp로 created(리포팅시점 정보),id(선택한리포트id),sequence(그래프상의선택된 sequence정보) 설정 시작
		 */
		String id = request.getParameter("id");
		String sequence = request.getParameter("sequence");
		String created = "";

		if (!id.equals("null")) {
			CpuBiz biz = new CpuBiz();
			created = biz.getCreated(id);
		}// data 추출 및 설정작업 끝

		/*
		 * 테이블 그리기 위해 추출한 data request에 저장하여 iotable.jsp 파일로 보내기
		 */
		request.setAttribute("created", created);
		request.setAttribute("id", id);
		request.setAttribute("sequence", sequence);

		RequestDispatcher view = request.getRequestDispatcher("io/iotable.jsp");
		System.out.println("go to io/iotable.jsp");
		view.forward(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

}
