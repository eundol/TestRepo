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
 * Servlet implementation class CpuCoreChartServlet
 */
public class CpuCoreChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuCoreChartServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        
        ArrayList<CpuEntity> cpuCore = new ArrayList<CpuEntity>();
        
        if(!id.equals("null")){
        	CpuBiz biz = new CpuBiz();
        	biz.getCpuCore(cpuCore, id);
        }

        int maxCpuNum = 0;
        if(!cpuCore.isEmpty() && cpuCore.get(0).getCpu() != null){
        	
            for(int i = 0 ; i < cpuCore.size() ; i ++){
            	int rowCpuNum = Integer.parseInt(cpuCore.get(i).getCpu());
            	if(maxCpuNum < rowCpuNum){
            		maxCpuNum = rowCpuNum;
            	}
            }
            System.out.println("maxCpuNum : " + maxCpuNum);
        	
			request.setAttribute("cpuCore", cpuCore);
			request.setAttribute("maxCpuNum", maxCpuNum);
			RequestDispatcher view = request.getRequestDispatcher("cpu/corechart.jsp");
			System.out.println("go to cpu/corechart.jsp");
			view.forward(request, response);
        }else{
        	if(id.equals("null")){
    			request.setAttribute("cpuCore", cpuCore);
    			request.setAttribute("maxCpuNum", maxCpuNum);
    			RequestDispatcher view = request.getRequestDispatcher("cpu/corechart.jsp");
    			System.out.println("go to cpu/corechart.jsp");
    			view.forward(request, response);
        	}else{
        		RequestDispatcher view = request.getRequestDispatcher("cpu/corechart-error.jsp");
        		System.out.println("go to cpu/corechart-error.jsp");
        		view.forward(request, response);
        	}
        }
	}
}