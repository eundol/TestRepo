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
import entity.CpuSummaryEntity;

/**
 * Servlet implementation class CpuTableFrameViewServlet
 */
public class CpuTableFrameViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuTableFrameViewServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        
		ArrayList<CpuEntity> cpuTable = new ArrayList<CpuEntity>();
		CpuSummaryEntity summaryEntity = new CpuSummaryEntity();
		String created = "";
		
        if(id!=null && !id.equals("null")){
			CpuBiz biz = new CpuBiz();
			biz.getCpuTable1000(cpuTable, id);
			created = biz.getCreated(id);
			biz.getCpuSummaryTotal(summaryEntity, id);
        }

		request.setAttribute("cpuTable", cpuTable);
		request.setAttribute("summaryEntity", summaryEntity);
		request.setAttribute("created", created);
		request.setAttribute("id", id);
		RequestDispatcher view = request.getRequestDispatcher("cpu/cpuparentframe.jsp");
		System.out.println("go to cpu/cpuparentframe.jsp");
		view.forward(request, response);
	}
}
