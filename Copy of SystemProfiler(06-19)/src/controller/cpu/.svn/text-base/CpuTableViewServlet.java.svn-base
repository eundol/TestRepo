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

/**
 * Servlet implementation class CpuTableViewServlet
 */
public class CpuTableViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuTableViewServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
		String created = "";
		
        if(!id.equals("null")){
			CpuBiz biz = new CpuBiz();
			created = biz.getCreated(id);
        }

		request.setAttribute("created", created);
		request.setAttribute("id", id);
		RequestDispatcher view = request.getRequestDispatcher("cpu/cputable.jsp");
		System.out.println("go to cpu/cputable.jsp");
		view.forward(request, response);
	}
}
