import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.EnyoBiz;
import dataEntity.TestResultEntity;

public class GetSearchBarServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("GetSearchBarServlet Start **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 

        String date = request.getParameter("date");
        
        ArrayList<TestResultEntity> testResultList = new ArrayList<TestResultEntity>();;
        new EnyoBiz().getTestResultList(testResultList, date);
        ArrayList<TestResultEntity> testResultDetail = new ArrayList<TestResultEntity>();;
        new EnyoBiz().getTestResultDetail(testResultDetail, date, "");
        
        request.setAttribute("testResultList", testResultList);
        request.setAttribute("testResultDetail", testResultDetail);
        
        RequestDispatcher view = request.getRequestDispatcher("search.jsp");
        System.out.println("go to search.jsp");
        view.forward(request, response);
	}
}