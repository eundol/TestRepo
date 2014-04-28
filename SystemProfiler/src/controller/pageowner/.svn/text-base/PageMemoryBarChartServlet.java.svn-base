package controller.pageowner;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.PageMemBiz;
import entity.PageOwnerEntity;

public class PageMemoryBarChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("PageMemoryBarChartServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        int sequence = Integer.parseInt(request.getParameter("sequence"));

        ArrayList<PageOwnerEntity> memoryInfoList = new ArrayList<PageOwnerEntity>();
        
        if(!id.equals("null")){
        	PageMemBiz biz = new PageMemBiz();
        	biz.getMemoryInfoList(id, memoryInfoList, sequence);
        }
        
        if(sequence == 1){
        	System.out.println("===== Start Keyword/Memory Information =====");	
        }
        if(sequence == 2){
        	System.out.println("===== End Keyword/Memory Information =====");
        }
        for(int i = 0 ; i < memoryInfoList.size() ; i++){
        	System.out.println("Keyword : " + memoryInfoList.get(i).getKeyword() + ", memory : " + memoryInfoList.get(i).getMemory() + "KB");
        }
        
        request.setAttribute("memoryInfoList", memoryInfoList);
        request.setAttribute("sequence", sequence);
		RequestDispatcher view = request.getRequestDispatcher("pageowner/pagememorybarchart.jsp");
		System.out.println("go to pageowner/pagememorybarchart.jsp");
		
		view.forward(request, response);
	}

}
