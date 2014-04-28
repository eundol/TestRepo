package controller.memory;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.MemBiz;
import entity.SmemEntity;

public class MemGetProcesshighUsageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("MemGetProcesshighUsageServlet Start **");
		request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        String sortParam = "pss_end";
        String order = "desc";
        String option = " limit 5";
        
//        String created = new CpuBiz().getCreatedFull(id);
        
        ArrayList<SmemEntity> smemInfo = new ArrayList<SmemEntity>();
        
        if(!id.equals("null")){
        	MemBiz biz = new MemBiz();
        	biz.getSmemInfo(id, sortParam, order, smemInfo, option);
        }
        
        request.setAttribute("smemInfo", smemInfo);
//        request.setAttribute("sortParam", sortParam);
//        request.setAttribute("order", order);
//        request.setAttribute("created", created);
        request.setAttribute("id", id);
        
        RequestDispatcher view = request.getRequestDispatcher("memory/smemhighusage.jsp");
        System.out.println("go to memory/smemhighusage.jsp");
        
        view.forward(request, response);
        
	}
}
