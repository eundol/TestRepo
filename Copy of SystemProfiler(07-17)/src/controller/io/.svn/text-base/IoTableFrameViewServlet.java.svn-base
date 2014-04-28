package controller.io;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.IoBiz;
import entity.IoEntity;

/**
 * Servlet implementation class CpuTableFrameViewServlet
 */
/*
 * class name: IoTableFrameViewServlet 
 * description: iostat 결과 테이블을 화면에 뿌려주기 위한 data 가져오는 작업(controller)
 */
public class IoTableFrameViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		/*
		 * IoTableFrameViewServlet 진입 및 인코딩 처리 작업
		 */
		System.out.println("IoTableFrameViewServlet Start **");
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");

		/*
		 * ioTable 결과 data 가져오는 작업 시작 
		 */
		//선택한 id, sequence 값 전달 받기
		String id = request.getParameter("id");
		String sequence = request.getParameter("sequence");
		
		//sequence 선택하지 않았다면(io tab에 처음 진입한 경우라면), 첫번째 sequence number로 세팅
		if(sequence == null || sequence.equals("null")){
			sequence = "1";
		}

		ArrayList<IoEntity> ioTable = new ArrayList<IoEntity>();

		//id와 sequence 값이 null이 아닐 경우 ioTable 결과 가져오기
		if (id != null && !id.equals("null") && sequence != null && !sequence.equals("null")) {
			IoBiz biz = new IoBiz();
			ioTable = biz.getIoTable(ioTable, id, sequence);
		}//ioTable 결과 data 가져오는 작업 끝

		/*
		 * 테이블을 만들기 위해 추출한 ioTable data request에 담아 ioparentframe.jsp로 전송
		 */
		request.setAttribute("ioTable", ioTable);
		RequestDispatcher view = request.getRequestDispatcher("io/ioparentframe.jsp");
		System.out.println("go to io/ioparentframe.jsp");
		view.forward(request, response);
	}
}
