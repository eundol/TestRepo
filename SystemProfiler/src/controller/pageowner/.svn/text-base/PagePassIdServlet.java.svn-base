package controller.pageowner;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.PageMemBiz;
import entity.CpuSummaryEntity;
import entity.PageOwnerEntity;

public class PagePassIdServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("PagePassIdServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        String sequence = request.getParameter("sequence");
        String type = request.getParameter("type");
        boolean dataFlag = false;
        CpuSummaryEntity cpuSummary = new CpuSummaryEntity();
        
        PageOwnerEntity simpleMemoryEntity = new PageOwnerEntity();
        if(id!=null && !id.equals("null")){
        	PageMemBiz biz = new PageMemBiz();
        	biz.getSimpleMemoryInfo(id, simpleMemoryEntity, Integer.parseInt(sequence));
        	CpuBiz bizCpu = new CpuBiz();
			bizCpu.getCpuSummary(cpuSummary, id);
        }
        
        if(simpleMemoryEntity.getTotal() != 0){
        	dataFlag = true;
        }
        
        request.setAttribute("id", id);
        request.setAttribute("sequence", sequence);
        request.setAttribute("dataFlag", dataFlag);
        request.setAttribute("testCaseId", cpuSummary.getTestCaseId());
        
        RequestDispatcher view = null;
        if(type.equals("user")){
        	view = request.getRequestDispatcher("pageowner/pagerowdatatable.jsp");
        	System.out.println("go to pageowner/pagerowdatatable.jsp");
        }else{
        	view = request.getRequestDispatcher("pageowner/pagerowdatatablekernel.jsp");
        	System.out.println("go to pageowner/pagerowdatatablekernel.jsp");
        }
		view.forward(request, response);
	}

}
