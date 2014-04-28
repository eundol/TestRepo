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
import entity.CpuSearchEntity;
import entity.CpuSummaryEntity;

/**
 * Servlet implementation class CpuSummaryServlet
 */
public class CpuSummaryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public CpuSummaryServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuSummaryServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
        String id = request.getParameter("id"); 
        System.out.println("id : " + id);
        
        CpuBiz biz = new CpuBiz();

        ArrayList<CpuEntity> cpuTable = new ArrayList<CpuEntity>();
		String created = null;
		
        if(!id.equals("null")){
			created = biz.getCpuTable(cpuTable, id);
        }
        
		request.setAttribute("cpuTable", cpuTable);
		request.setAttribute("created", created);
		
		CpuSummaryEntity cpuSummary = new CpuSummaryEntity();
        
		if(!id.equals("null")){
    	   biz.getCpuSummary(cpuSummary, id);
		}
		
		request.setAttribute("cpuSummary", cpuSummary);
		
		RequestDispatcher view = request.getRequestDispatcher("cpu/summary.jsp");
		System.out.println("go to cpu/summary.jsp");
		view.include(request, response);
	}
}
