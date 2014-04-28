package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CommonBiz;
import entity.CpuSearchEntity;

/**
 * Servlet implementation class ObjectServlet
 */
public class ObjectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("ObjectServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        
        CpuSearchEntity cpuSearch = null;
        
        if(!id.equals("null")){
        	CommonBiz biz = new CommonBiz();
        	cpuSearch = biz.getObjectInfo(id);
        }
        
		request.setAttribute("cpuSearch", cpuSearch);
		RequestDispatcher view = request.getRequestDispatcher("object.jsp");
		System.out.println("go to object.jsp");
		view.include(request, response);
	}
}
