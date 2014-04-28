package controller.cpu;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.IoBiz;
import entity.IoEntity;

public class CpuTraceChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		System.out.println("CpuTraceChartServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
//        System.out.println("id : " + id);

        String created = new CpuBiz().getCreatedFull(id);
        
        ArrayList<IoEntity> cpuTraceInfo = new ArrayList<IoEntity>();
        IoEntity maxEntity = new IoEntity();
        
        if(!id.equals("null")){
        	IoBiz biz = new IoBiz();
        	biz.getCpuTraceFromIoStat(id, cpuTraceInfo);
        	biz.getCpuMaxFromIoStat(id, maxEntity);
        }
        
        request.setAttribute("created", created);
        request.setAttribute("cpuTraceInfo", cpuTraceInfo);
        request.setAttribute("maxEntity", maxEntity);
        
		RequestDispatcher view = request.getRequestDispatcher("cpu/cputracechart.jsp");
		System.out.println("go to cpu/cputracechart.jsp");
		
		view.forward(request, response);
	}

}
