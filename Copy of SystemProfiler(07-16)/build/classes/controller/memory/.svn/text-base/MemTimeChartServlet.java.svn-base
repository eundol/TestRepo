package controller.memory;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.MemBiz;
import entity.MemEntity;

public class MemTimeChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		System.out.println("MemTimeChartServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        String created = new CpuBiz().getCreatedFull(id);
        
        ArrayList<MemEntity> memoryInfo = new ArrayList<MemEntity>();
        
        if(!id.equals("null")){
        	MemBiz biz = new MemBiz();
        	biz.getMemoryInfo(id, memoryInfo);
        }
        
        request.setAttribute("memoryInfo", memoryInfo);
        request.setAttribute("created", created);
        
		RequestDispatcher view = request.getRequestDispatcher("memory/memtimecharts.jsp");
		System.out.println("go to memory/memtimecharts.jsp");
		
		view.forward(request, response);
        
	}
}
