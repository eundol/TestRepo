import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.EnyoBiz;
import dataEntity.TestResultEntity;

public class PieChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("PieChartServlet Start **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
        
        String date = request.getParameter("date");
        ArrayList<TestResultEntity> testResultList = new ArrayList<TestResultEntity>();;
        new EnyoBiz().getTestResultList(testResultList, date);
        
        request.setAttribute("testResultList", testResultList);
        
        RequestDispatcher view = request.getRequestDispatcher("charts/piechart.jsp");
        System.out.println("go to charts/piechart.jsp");
        view.forward(request, response);
	}
}
