import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.EnyoBiz;
import dataEntity.TestResultEntity;

public class GetSummaryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("GetSummaryServlet Start **");
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");

		String forwardURI = "summary.jsp";

		ArrayList<TestResultEntity> testResultDetail = new ArrayList<TestResultEntity>();
		new EnyoBiz().getTestResultDetail(testResultDetail, "", "");

		request.setAttribute("testResultList", testResultDetail);

		RequestDispatcher view = request.getRequestDispatcher(forwardURI);
		System.out.println("go to " + forwardURI);
		view.forward(request, response);
	}
}
