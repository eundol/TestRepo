package perf;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.PerfInfo;

public class PerfBootingTimeLineChartsServlet extends HttpServlet { 
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("PerfBootingTimeLineChartsServlet **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
		
        ArrayList<PerfInfo> list = new ArrayList<PerfInfo>();
        new biz.PerfBiz().getPerfResult(list, "booting");
        
        request.setAttribute("PerfInfo", list);
        
        RequestDispatcher view = request.getRequestDispatcher("perf/perf_booting_time_line.jsp");
        System.out.println("go to " + "perf/perf_booting_time_line.jsp");
        view.forward(request, response);
	}
	
}