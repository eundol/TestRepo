package controller.cpu;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.IoBiz;
import entity.IoEntity;

public class CpuPieChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuPieChartServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
//        System.out.println("id : " + id);
		
        IoEntity avgEntity = new IoEntity();
        
        if(!id.equals("null")){
        	IoBiz biz = new IoBiz();
        	biz.getCpuUsedFromIoStat(id, avgEntity);
        }
        
        request.setAttribute("avgEntity", avgEntity);
        
        RequestDispatcher view = request.getRequestDispatcher("cpu/cpupiechart.jsp");
		System.out.println("go to cpu/cpupiechart.jsp");
		view.forward(request, response);
	}
}
