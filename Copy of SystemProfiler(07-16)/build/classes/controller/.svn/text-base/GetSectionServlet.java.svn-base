package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.catalina.Session;

public class GetSectionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public GetSectionServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("GetSectionServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        String section = request.getParameter("section");
        System.out.println("id : " + id);
        
        HttpSession session = request.getSession(true);
        session.setAttribute("id", id);
        
        if(section.equals("cpu")){
			RequestDispatcher view = request.getRequestDispatcher("cpu.jsp");
			System.out.println("go to cpu.jsp");
			view.forward(request, response);
        }else if(section.equals("memory")){
        	RequestDispatcher view = request.getRequestDispatcher("memory.jsp");
    		System.out.println("go to memory.jsp");
    		view.forward(request, response);
        }else if(section.equals("io")){
        	RequestDispatcher view = request.getRequestDispatcher("io.jsp");
    		System.out.println("go to io.jsp");
    		view.forward(request, response);
        }else{
        	System.out.println("##ERROR#####");
        }
	}
}
