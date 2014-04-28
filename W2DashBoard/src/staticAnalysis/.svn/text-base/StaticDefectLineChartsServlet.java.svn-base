package staticAnalysis;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.StaticDencityInfo;

public class StaticDefectLineChartsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("StaticDefectLineChartsServlet **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
		
        ArrayList<StaticDencityInfo> list = new ArrayList<StaticDencityInfo>();
        new biz.StaticBiz().getDefectResult(list);
        request.setAttribute("DefectInfo", list);
        
        RequestDispatcher view = request.getRequestDispatcher("static-analysis/static_defect_line.jsp");
        System.out.println("go to " + "static-analysis/static_defect_line.jsp");
        view.forward(request, response);
	
	}

}
