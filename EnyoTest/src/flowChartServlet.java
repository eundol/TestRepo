import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.EnyoBiz;
import dataEntity.TestResultEntity;

public class flowChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("flowChartServlet Start **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
        
        String date = request.getParameter("date");
        String component = request.getParameter("component");
        String forwardURI = "";
        
        ArrayList<TestResultEntity> testResultList = new ArrayList<TestResultEntity>();
        if(component == null || component.equals("") || component.equals("All")){
        	new EnyoBiz().getTestResultList(testResultList, date);
        	forwardURI = "charts/flowchart.jsp";
        }else{
        	new EnyoBiz().getTestResultDetail(testResultList, date, component);
        	forwardURI = "charts/flowchartdetail.jsp";
        }
        
        request.setAttribute("testResultList", testResultList);
        
        RequestDispatcher view = request.getRequestDispatcher(forwardURI);
        System.out.println("go to " + forwardURI);
        view.forward(request, response);
		
	}
}
