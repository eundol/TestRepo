package controller.cpu;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import entity.CpuEntity;

/**
 * Servlet implementation class CpuFunctionChartServlet
 */
public class CpuFunctionChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuFunctionChartServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        
        ArrayList<CpuEntity> cpuFunction = new ArrayList<CpuEntity>();
        
        if(!id.equals("null")){
        	CpuBiz biz = new CpuBiz();
        	biz.getCpuFunction(cpuFunction, id);
        }

		request.setAttribute("cpuFunction", cpuFunction);
		RequestDispatcher view = request.getRequestDispatcher("cpu/functionchart.jsp");
		System.out.println("go to cpu/functionchart.jsp");
		
		view.forward(request, response);
	}
}
