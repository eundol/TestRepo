package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class Cpu
 */
public class CpuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public CpuServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        
        HttpSession session = request.getSession(true);
        session.setAttribute("id", id);
		RequestDispatcher view = request.getRequestDispatcher("cpu.jsp");
		System.out.println("go to cpu.jsp");
		view.forward(request, response);
	}
}
