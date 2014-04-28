package controller.io;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.IoBiz;
import entity.CpuSummaryEntity;
import entity.IoEntity;

/**
 * Servlet implementation class IoSummaryServlet
 */
public class IoSummaryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		System.out.println("CpuSummaryServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
        String id = request.getParameter("id"); 
//        System.out.println("id : " + id);
        
        CpuBiz biz = new CpuBiz();
        IoBiz ioBiz = new IoBiz();
        CpuSummaryEntity cpuSummary = new CpuSummaryEntity();
        ArrayList<IoEntity> cpuTraceInfo = new ArrayList<IoEntity>();
        
		String created = null;
        if(!id.equals("null")){
			created = biz.getCreated(id);
    	    biz.getCpuSummary(cpuSummary, id);
    	    ioBiz.getCpuTraceFromIoStat(id, cpuTraceInfo);
//    	    biz.getCpuSummaryTotal(cpuSummary, id);
        }
		request.setAttribute("created", created);
		request.setAttribute("cpuSummary", cpuSummary);
		request.setAttribute("cpuTraceInfo", cpuTraceInfo);
		
		RequestDispatcher view = request.getRequestDispatcher("io/summary.jsp");
//		System.out.println("go to cpu/summary.jsp");
		view.include(request, response);
	}

}
