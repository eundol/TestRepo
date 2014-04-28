package system;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.SystemInfo;

public class SystemSeverityPieChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("SystemSeverityPieChartServlet **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
		
        SystemInfo info = new SystemInfo();
        new biz.SystemBiz().getSeverityInfo(info);
        
        request.setAttribute("SystemInfo", info);
        
        RequestDispatcher view = request.getRequestDispatcher("system/system_severity_pie.jsp");
        System.out.println("go to " + "system/system_severity_pie.jsp");
        view.forward(request, response);
	}

}
