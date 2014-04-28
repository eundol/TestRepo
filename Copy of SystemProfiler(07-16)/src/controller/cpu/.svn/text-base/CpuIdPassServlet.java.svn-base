package controller.cpu;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CpuIdPassServlet
 */
public class CpuIdPassServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuIdPassServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id"); 
        
		request.setAttribute("id", id);
		RequestDispatcher view = request.getRequestDispatcher("cpu/cputableframeset.jsp");
		System.out.println("go to cpu/cputableframeset.jsp");
		view.forward(request, response);
		
	}
}
