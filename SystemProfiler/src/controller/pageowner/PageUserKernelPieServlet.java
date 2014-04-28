package controller.pageowner;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.PageMemBiz;
import entity.PageOwnerEntity;

public class PageUserKernelPieServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("PageUserKernelPieServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
//        System.out.println("id : " + id);
        int sequence = Integer.parseInt(request.getParameter("sequence"));
        PageOwnerEntity simpleMemoryEntity = new PageOwnerEntity();
        
        if(!id.equals("null")){
        	PageMemBiz biz = new PageMemBiz();
        	biz.getSimpleMemoryInfo(id, simpleMemoryEntity, sequence);
        }
        
        if(sequence == 1){
        	System.out.println("===== Start User/Kernel/Memory Information =====");	
        }
        if(sequence == 2){
        	System.out.println("===== End User/Kernel/Memory Information =====");
        }
        System.out.println("User Memory : " + simpleMemoryEntity.getUser() + "KB");
        System.out.println("Kernel Memory : " + simpleMemoryEntity.getKernel() + "KB");
        System.out.println("Total Memory : " + simpleMemoryEntity.getTotal() + "KB");
        request.setAttribute("simpleMemoryEntity", simpleMemoryEntity);
        request.setAttribute("sequence", sequence);
        
        RequestDispatcher view = request.getRequestDispatcher("pageowner/pageuserkernelpie.jsp");
		System.out.println("go to pageowner/pageuserkernelpie.jsp");
		view.forward(request, response);
	}
}